# About Me

顾树昊的个人主页与公开简历仓库。首页以鼠标跟随的三维头像、三主线能力图谱和交互式实习时间轴展示个人方向，每段经历均可展开为微型技术报告；正式简历保持独立、克制的投递页面。

## 在线入口

- 个人主页：<https://guzzzz1.github.io/About_Me/>
- AI 测试开发简历（默认）：<https://guzzzz1.github.io/About_Me/resume/versions/ai-test.html>
- Agent 应用开发简历：<https://guzzzz1.github.io/About_Me/resume/versions/agent.html>
- 央国企数字化简历：<https://guzzzz1.github.io/About_Me/resume/versions/digital.html>
- English AI Test Development resume：<https://guzzzz1.github.io/About_Me/resume/versions/ai-test-en.html>
- English Agent Application Development resume：<https://guzzzz1.github.io/About_Me/resume/versions/agent-en.html>
- English Digital Transformation resume：<https://guzzzz1.github.io/About_Me/resume/versions/digital-en.html>
- 完整经历简历：<https://guzzzz1.github.io/About_Me/resume/overview.html>

机器可读简历事实索引：<https://guzzzz1.github.io/About_Me/resume/ats-profile.json>

英文版机器可读简历事实索引：<https://guzzzz1.github.io/About_Me/resume/ats-profile-en.json>

中文简历的学校、学历、专业、排名、经历和技能等结构化事实维护在 `src/resume/ats-profile.json`，英文对应事实维护在 `src/resume/ats-profile-en.json`。执行 `npm run build` 时，构建脚本会按语言把对应索引注入岗位版和完整经历页的 JSON-LD；页面不显示该数据，但招聘系统或网页解析器可以读取。后续新增经历先补可验证事实，再同步两份索引与可见简历。

GitHub Pages 发布源使用 `main` 分支下的 `/docs` 目录。

## 本地预览

```bash
npm run build
npm run preview
```

打开 <http://127.0.0.1:4174/>。

页面包含 Canvas 与 WebGL 纹理处理，开发预览请使用本地 HTTP 服务。直接双击打开 `file://` 页面时，不同浏览器的安全策略可能导致显示差异；GitHub Pages 不受这一限制。

## 页面入口

- 个人主页：`docs/index.html`
- AI 测试开发简历（默认）：`docs/resume/versions/ai-test.html` / `docs/resume/versions/ai-test-en.html`
- Agent 应用开发简历：`docs/resume/versions/agent.html` / `docs/resume/versions/agent-en.html`
- 央国企数字化简历：`docs/resume/versions/digital.html` / `docs/resume/versions/digital-en.html`
- 完整经历简历：`docs/resume/overview.html`

主页与完整经历页按时间线显示百度实习至 `2026.08`；三份岗位版 HTML/PDF 按最新投递口径统一标注为 `2026.05 - 2026.09`。

## 目录结构

```text
src/
  index.html             # 主页源文件
  resume/
    ats-profile.json     # 中文机器可读简历事实索引
    ats-profile-en.json  # 英文机器可读简历事实索引
    overview.html        # 完整经历简历源文件
    versions/            # 三个岗位版一页简历（中文与英文）
  assets/
    home.css             # 主页样式源码
    home.js              # 交互、图谱与 Three.js 场景源码
public/
  assets/                # 照片、Logo 与本地 Three.js 运行时
  resume/versions/       # 三个岗位版 PDF（中文与英文）
scripts/
  build.mjs              # 生成 GitHub Pages 目录
docs/
  ...                    # 构建后的 GitHub Pages 成品
resume/
  20260721/              # 历史简历归档
```

日常修改以 `src/` 与 `public/` 为准，执行 `npm run build` 后同步 `docs/`。`docs/` 只承担在线展示，历史版本继续按日期归档在 `resume/`；当公开事实发生更正时，同步修正归档中的对应信息。
