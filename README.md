# About Me

顾树昊的个人主页与公开简历仓库。首页以鼠标跟随的三维头像、三主线能力图谱和交互式实习时间轴展示个人方向，每段经历均可展开为微型技术报告；正式简历保持独立、克制的投递页面。

## 在线入口

- 个人主页：<https://guzzzz1.github.io/About_Me/>
- AI 测试开发简历（默认）：<https://guzzzz1.github.io/About_Me/resume/versions/ai-test.html>
- Agent 应用开发简历：<https://guzzzz1.github.io/About_Me/resume/versions/agent.html>
- 央国企数字化简历：<https://guzzzz1.github.io/About_Me/resume/versions/digital.html>
- 完整经历简历：<https://guzzzz1.github.io/About_Me/resume/overview.html>

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
- AI 测试开发简历（默认）：`docs/resume/versions/ai-test.html`
- Agent 应用开发简历：`docs/resume/versions/agent.html`
- 央国企数字化简历：`docs/resume/versions/digital.html`
- 完整经历简历：`docs/resume/overview.html`

当前公开简历中的百度实习时间统一为 `2026.05 - 2026.08`，三个岗位版 HTML/PDF 与完整经历保持同步。

## 目录结构

```text
src/
  index.html             # 主页源文件
  resume/
    overview.html        # 完整经历简历源文件
    versions/            # 三个岗位版一页简历
  assets/
    home.css             # 主页样式源码
    home.js              # 交互、图谱与 Three.js 场景源码
public/
  assets/                # 照片、Logo 与本地 Three.js 运行时
  resume/versions/       # 三个岗位版 PDF
scripts/
  build.mjs              # 生成 GitHub Pages 目录
docs/
  ...                    # 构建后的 GitHub Pages 成品
resume/
  20260721/              # 历史简历归档
```

日常修改以 `src/` 与 `public/` 为准，执行 `npm run build` 后同步 `docs/`。`docs/` 只承担在线展示，历史版本继续按日期归档在 `resume/`；当公开事实发生更正时，同步修正归档中的对应信息。
