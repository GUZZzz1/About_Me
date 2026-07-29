(() => {
  if (window.self !== window.top) return;

  document.body.classList.add("is-standalone");
  const activeTrack = document.body.dataset.resumeTrack;

  document.querySelectorAll("[data-resume-nav]").forEach(link => {
    const isActive = link.dataset.resumeNav === activeTrack;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });
})();
