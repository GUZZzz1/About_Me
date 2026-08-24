import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "docs");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "src"), output, { recursive: true, force: true });
await cp(resolve(root, "public"), output, { recursive: true, force: true });

const profileFiles = {
  zh: resolve(root, "src/resume/ats-profile.json"),
  en: resolve(root, "src/resume/ats-profile-en.json")
};
const profileObjects = {};
for (const [language, profilePath] of Object.entries(profileFiles)) {
  profileObjects[language] = JSON.parse(await readFile(profilePath, "utf8"));
}
const machineReadableJsonByLanguage = Object.fromEntries(Object.entries(profileObjects).map(([language, atsProfileObject]) => {
  const machineProfile = {
    ...atsProfileObject,
    "@context": "https://schema.org",
    "@type": "Person",
    alumniOf: (atsProfileObject.education || []).map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.institution,
      department: item.department,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: item.degree,
        educationalLevel: item.degree,
        about: item.fieldOfStudy
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "startDate", value: item.startDate },
        { "@type": "PropertyValue", name: "endDate", value: item.endDate },
        { "@type": "PropertyValue", name: "academicStanding", value: item.academicStanding },
        { "@type": "PropertyValue", name: "researchLabExperience", value: item.researchLabExperience }
      ]
    })),
    knowsAbout: atsProfileObject.skills
  };
  return [language, JSON.stringify(machineProfile, null, 2)];
}));
const resumeOutputs = [
  "resume/overview.html",
  "resume/versions/ai-test.html",
  "resume/versions/agent.html",
  "resume/versions/digital.html",
  "resume/versions/ai-test-en.html",
  "resume/versions/agent-en.html",
  "resume/versions/digital-en.html"
];
const marker = /<!-- ATS_PROFILE_START -->[\s\S]*?<!-- ATS_PROFILE_END -->\n?/;

for (const relativePath of resumeOutputs) {
  const outputPath = resolve(output, relativePath);
  const html = await readFile(outputPath, "utf8");
  const profileHref = relativePath.includes("/versions/") ? "../ats-profile.json" : "ats-profile.json";
  const language = relativePath.endsWith("-en.html") ? "en" : "zh";
  const profileFile = language === "en" ? "../ats-profile-en.json" : profileHref;
  const machineReadableBlock = [
    "<!-- ATS_PROFILE_START -->",
    `<link rel="alternate" type="application/json" href="${profileFile}" title="Machine-readable resume profile" />`,
    `<script type="application/ld+json" data-ats-profile>${machineReadableJsonByLanguage[language]}</script>`,
    "<!-- ATS_PROFILE_END -->",
    ""
  ].join("\n");
  const withProfile = html.replace(marker, "").replace("</head>", `${machineReadableBlock}</head>`);
  await writeFile(outputPath, withProfile, "utf8");
}

console.log("Built GitHub Pages output in docs/");
