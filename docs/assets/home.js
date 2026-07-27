const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const groupMeta = {
  dev: { title: "开发工程", code: "开发", x: 25, y: 64, color: "#efc55a" },
  test: { title: "测试质量", code: "测试", x: 75, y: 64, color: "#ff745e" },
  ai: { title: "Agent 评测", code: "AGENT", x: 50, y: 16, color: "#58d5c7" }
};

const capabilityData = [
  { id: "dev-python", group: "dev", level: "practice", x: 5, y: 45, title: "Python / Flask", short: "后端与工具", summary: "使用 Python 与 Flask 参与业务接口、自动化评测引擎和测试工具开发。", tags: ["Python", "Flask", "Automation"], bullets: ["参与量化研究平台后端执行流程与 RESTful API 开发。", "开发多用户并发记忆评测流程并输出 HTML 结果。", "能够把测试数据、执行逻辑和结果报告组织成可复用工具。"] },
  { id: "dev-ts", group: "dev", level: "practice", x: 15, y: 43, title: "TypeScript / Node", short: "工具服务", summary: "用于 Agent 工具、浏览器动作层和测试框架相关工程实现。", tags: ["TypeScript", "Node.js", "Tooling"], bullets: ["参与 Browser Agent Controller / Action 扩展。", "理解结构化动作、工具参数与执行结果的接口边界。", "可迁移到 Agent 工具服务和 E2E Runner 工程。"] },
  { id: "dev-vue", group: "dev", level: "practice", x: 6, y: 61, title: "Vue 3", short: "管理端页面", summary: "使用 Vue 3 与 Element Plus 完成管理端页面、接口联调和结果展示。", tags: ["Vue 3", "Element Plus", "Frontend"], bullets: ["参与因子申请、审批、元数据管理和计算结果展示页面。", "处理接口联调、状态展示与业务表单。", "具备组件化页面、数据展示与交互状态处理经验。"] },
  { id: "dev-rest", group: "dev", level: "practice", x: 6, y: 78, title: "REST / Swagger", short: "接口设计", summary: "参与 RESTful API、接口文档和前后端联调，能从请求、响应与状态变化定位问题。", tags: ["RESTful", "Swagger", "API"], bullets: ["维护 Swagger 接口文档并参与接口联调。", "结合接口响应、日志和数据库状态排查问题。", "在 Agent 测试中进一步延伸到 REST 控制面与 SSE 运行态联合验证。"] },
  { id: "dev-data", group: "dev", level: "practice", x: 15, y: 88, title: "SQLAlchemy / SQL", short: "数据模型", summary: "参与 PostgreSQL 数据建模与 SQLAlchemy 数据访问，理解业务状态与持久化关系。", tags: ["SQLAlchemy", "PostgreSQL", "Data Model"], bullets: ["参与核心业务数据模型与接口数据流。", "接触 DolphinDB 因子计算链路。", "测试定位时结合数据库状态验证副作用与一致性。"] },
  { id: "dev-browseruse", group: "dev", level: "practice", x: 26, y: 89, title: "Browser-Use 扩展", short: "Controller / Action", summary: "围绕直播 Web 场景扩展 Browser-Use 的动作与工具层。", tags: ["Browser-Use", "Controller", "Action"], bullets: ["补齐 hover、可见性等待点击和业务组合动作。", "处理无文字组件、弹窗交互与组件合并/漏识别。", "将模型规划结果落到结构化 Action 和可执行工具。"] },
  { id: "dev-dom", group: "dev", level: "practice", x: 36, y: 82, title: "DOM / JS / XPath", short: "页面状态", summary: "围绕页面状态提取、DOM/JS 注入、元素索引与 XPath 映射构建执行上下文。", tags: ["DOM", "JavaScript", "XPath"], bullets: ["优化任务相关组件过滤与 DOM 上下文裁剪。", "将元素索引映射到可执行定位信息。", "使用 DOM 快照支撑失败回放和根因定位。"] },
  { id: "dev-playwright", group: "dev", level: "practice", x: 39, y: 65, title: "Playwright 交付", short: "脚本生成", summary: "把验证通过的 Agent 动作序列转成可重复执行的 Playwright 脚本。", tags: ["Playwright", "E2E", "Replay"], bullets: ["生成并维护脚本化执行产物。", "归档 trace、截图/GIF 和断言结果。", "形成自然语言用例到可重复脚本的交付闭环。"] },
  { id: "dev-report", group: "dev", level: "practice", x: 38, y: 48, title: "HTML 报告", short: "结果可视化", summary: "将评测指标、趋势、错误类型和执行证据组织成可浏览报告。", tags: ["HTML", "Metrics", "Report"], bullets: ["输出记忆匹配准确率、执行效率和衰减趋势。", "整理模型服务成功率、耗时和异常返回。", "为复盘、汇报和回归提供结构化结果入口。"] },

  { id: "test-yaml", group: "test", level: "practice", x: 62, y: 45, title: "YAML E2E Runner", short: "确定性执行", summary: "采用模型生成 YAML、确定性 Runner 执行的桌面端 E2E 路线。", tags: ["YAML DSL", "Runner", "E2E"], bullets: ["串联 TestRunner / ScenarioRunner / StepExecutor。", "通过 ProductAdapter 适配产品操作。", "覆盖多任务并行、中断恢复和会话隔离等场景。"] },
  { id: "test-schema", group: "test", level: "practice", x: 73, y: 42, title: "Schema / Assertion", short: "用例约束", summary: "通过 schema、分层断言、cleanup 与 report 控制自动化用例质量。", tags: ["Schema", "Assertion", "Cleanup"], bullets: ["对结构化状态、工具事件、文件产物和 UI 不变量做确定性断言。", "对开放式结果保留语义 Judge 与人工复核。", "状态类 case 保存原状态并在 cleanup 中恢复。"] },
  { id: "test-trace", group: "test", level: "practice", x: 85, y: 42, title: "Trace / Artifact", short: "执行证据", summary: "以日志、截图、Trace、环境快照和文件产物重建失败现场。", tags: ["Trace", "Artifact", "Screenshot"], bullets: ["记录步骤状态、工具事件和最终结果。", "使用截图/GIF、日志和环境信息支撑回放。", "把失败转成可复测的用例与证据。"] },
  { id: "test-failure", group: "test", level: "practice", x: 95, y: 48, title: "失败分层归因", short: "定位与闭环", summary: "区分产品、用例/schema、框架、权限环境、服务和 flaky 问题。", tags: ["Triage", "Badcase", "Root Cause"], bullets: ["Browser Agent 中区分识别、规划、动作、时序、断言与环境失败。", "DuMate 中结合 result、日志和环境快照归因。", "阻塞问题先确认操作路径，再同步状态并切换可执行任务。"] },
  { id: "test-release", group: "test", level: "practice", x: 61, y: 58, title: "P0 / 发版回归", short: "准出质量", summary: "参与移动端 P0、发版回归、核心链路和测试文档同步。", tags: ["P0", "Release", "Regression"], bullets: ["发板日完成埋点验证和 P0 核心链路回归。", "埋点一键登录阻塞定位为 debug 包运营商签名配置问题，release 包复测通过。", "相关测试文档完成并发送。"] },
  { id: "test-mobile", group: "test", level: "practice", x: 95, y: 62, title: "鸿蒙 / ADB / Charles", short: "移动端取证", summary: "覆盖鸿蒙多设备、ADB 连接与日志、抓包和移动端兼容验证。", tags: ["HarmonyOS", "ADB", "Charles"], bullets: ["覆盖 4 台设备的安装、登录、核心任务和历史数据。", "整理 scrcpy、adb devices、adb logcat 操作链路。", "结合 Charles 与日志平台完成阻塞归因。"] },
  { id: "test-telemetry", group: "test", level: "practice", x: 60, y: 76, title: "埋点数据链路", short: "事件验证", summary: "按用户操作、客户端事件、上报链路和平台查询验证移动端埋点。", tags: ["Telemetry", "Event", "Packet"], bullets: ["先确认可测操作路径和触发条件。", "结合用户标识、抓包与日志查询核对事件。", "环境阻塞时区分测试条件与点位逻辑本身。"] },
  { id: "test-permission", group: "test", level: "practice", x: 94, y: 78, title: "权限 / 租户 / 沙箱", short: "状态矩阵", summary: "围绕账号、企业租户、席位、积分、文件与沙箱权限设计状态验证。", tags: ["Tenant", "Permission", "Sandbox"], bullets: ["验证席位撤销后的执行门禁和状态恢复。", "覆盖 Windows、Mac、沙箱/非沙箱组合。", "关注跨用户隔离、凭证生命周期和审计边界。"] },
  { id: "test-state", group: "test", level: "practice", x: 65, y: 90, title: "会话 / 状态隔离", short: "并发与恢复", summary: "验证多任务、多会话、工作区和用户状态的隔离、恢复与清理。", tags: ["Session", "Isolation", "Recovery"], bullets: ["覆盖长任务中断/恢复与多任务并行。", "验证工作区与会话隔离，避免状态污染。", "定时任务覆盖重启、登录态恢复与用户隔离。"] },
  { id: "test-context", group: "test", level: "practice", x: 76, y: 91, title: "长上下文专项", short: "压缩与边界", summary: "围绕超长输入、上下文压缩、多轮记忆和跨端表现组织专项验证。", tags: ["Long Context", "Compression", "Boundary"], bullets: ["覆盖长文本边界、长文件总结与检索。", "验证压缩隐藏性、多轮保持和 Browseruse 连续任务。", "跟进展示截断、发送失败与输入框布局问题。"] },
  { id: "test-performance", group: "test", level: "practice", x: 87, y: 90, title: "性能 / 并发", short: "稳定性指标", summary: "围绕并发、耐力、响应时间、资源曲线和尾延迟建立性能观察口径。", tags: ["Concurrency", "P95/P99", "Stability"], bullets: ["执行 60 并发、60 分钟模型服务耐力测试。", "统计成功率、响应时间和异常返回并关联 CPU/内存。", "沉淀 TTFT、TTL、P95/P99、吞吐和失败率口径。"] },
  { id: "test-api", group: "test", level: "design", x: 83, y: 76, title: "接口自动化 / 门禁", short: "分层回归", summary: "梳理接口自动化的分层覆盖、耗时治理、发布门禁与结果回写。", tags: ["API Test", "Release Gate", "CI"], bullets: ["区分单接口、链路、状态与跨端验证。", "按耗时、依赖和风险组织回归分层。", "以 Case schema、报告和准出清单承接评测结果。"] },

  { id: "ai-browser", group: "ai", level: "practice", x: 27, y: 8, title: "Browser Agent", short: "端到端链路", summary: "参与从页面状态、LLM 规划、结构化 Action 到工具执行和断言的完整链路。", tags: ["Browser Agent", "LLM Planning", "Action"], bullets: ["基于 Browser-Use 完成 WebUI Agent 二次开发。", "核心链路端到端执行成功率达到 100%。", "验证通过的动作序列可沉淀为 Playwright 脚本。"] },
  { id: "ai-context", group: "ai", level: "practice", x: 38, y: 7, title: "Context Engineering", short: "上下文治理", summary: "通过组件过滤、DOM 裁剪和 Prompt 精简降低 Browser Agent 成本与延迟。", tags: ["Context", "Prompt", "DOM"], bullets: ["固定关键组件集识别成功率达到 90%+。", "平均单步耗时由 20s+ 降至约 9s。", "system prompt token 约 5000 降至 2000，部分 DOM token 约 900 降至 300。"] },
  { id: "ai-loop", group: "ai", level: "practice", x: 50, y: 6, title: "Agent Loop", short: "Retry / Stop", summary: "通过有限重试、最大步数、等待条件、动作约束和人工兜底治理执行循环。", tags: ["Loop", "Retry", "Stop"], bullets: ["模型判断偏差或执行异常时触发有限重试。", "最大步数与动作约束避免死循环。", "保留人工出口处理高风险或不可确定任务。"] },
  { id: "ai-memory", group: "ai", level: "practice", x: 62, y: 7, title: "长期记忆评测", short: "写入与召回", summary: "构建记忆注入、干扰对话、回溯验证的自动评估链路。", tags: ["Memory", "Recall", "Evaluation"], bullets: ["覆盖直接记忆、更新、语义歧义和推理类回忆。", "输出匹配准确率、效率与记忆衰减趋势。", "复杂语义结果结合 Judge 与人工抽检，补充规则匹配。"] },
  { id: "ai-multimodal", group: "ai", level: "practice", x: 73, y: 8, title: "多模态问答评测", short: "OCR 到输出", summary: "分层验证 OCR、模型推理、业务编排、输出格式与用户可用性。", tags: ["Multimodal", "OCR", "QA"], bullets: ["覆盖初中数学/英语问答场景。", "结合 JSON 预期答案半自动校验客观题。", "人工复核复杂 Badcase 并定位符号识别与模型输出问题。"] },
  { id: "ai-judge", group: "ai", level: "design", x: 31, y: 22, title: "LLM Judge / Rubric", short: "开放结果裁决", summary: "设计 Rule / Parser / State Diff 与 LLM Judge 分层判分及人工 Gold 校准。", tags: ["LLM Judge", "Rubric", "Gold Set"], bullets: ["客观字段和状态优先使用确定性检查。", "开放质量采用分维度 0/1/2 Rubric。", "Judge 需检查位置交换、重复判分和假阳性/假阴性。"] },
  { id: "ai-benchmark", group: "ai", level: "design", x: 69, y: 22, title: "Agent Benchmark", short: "离线到线上", summary: "梳理 GAIA、TAU-Bench、AgentRewardBench 与业务评测迁移方式。", tags: ["GAIA", "TAU-Bench", "Trajectory"], bullets: ["统一 Conversation、Trajectory、Artifact、State Diff 与 Usage 证据。", "关注任务成功率、规则违反、副作用、Loop 与恢复。", "生产分层覆盖离线集、影子运行、A/B 和持续监控。"] },
  { id: "ai-harness", group: "ai", level: "design", x: 32, y: 36, title: "Agent Harness / Runtime", short: "状态与治理", summary: "从 Task、State、Tool、Trace、Artifact、Evaluator 和 Runtime 理解 Agent 行为级验证。", tags: ["Harness", "Runtime", "Checkpoint"], bullets: ["区分模型能力、Harness、Loop 与 Runtime。", "关注状态持久化、权限、checkpoint、并发与恢复。", "以独立 Evaluator 和人工门禁处理高风险结果。"] },
  { id: "ai-rag", group: "ai", level: "design", x: 43, y: 38, title: "RAG / 知识生命周期", short: "知识治理", summary: "围绕混合检索、知识状态、来源、可信度、有效期与反馈闭环梳理治理方法。", tags: ["RAG", "Knowledge", "Lifecycle"], bullets: ["区分知识缺失、检索失败、权限过滤、上下文组装与模型推理问题。", "AI 生成内容需经来源记录和人工验证后进入正式知识库。", "反馈应覆盖采纳、修改、拒绝、上线和回滚。"] },
  { id: "ai-skill", group: "ai", level: "design", x: 57, y: 38, title: "Skill / MCP / Plugin", short: "工具生态治理", summary: "梳理 Skill 生命周期、触发边界、MCP/插件权限、兼容与发布门禁。", tags: ["Skill", "MCP", "Plugin"], bullets: ["区分设计通过、测试通过、发布就绪与阻塞。", "关注元数据、工作流、输入输出、资源利用和范围聚焦。", "设计触发/不触发用例、兼容门和回归门。"] },
  { id: "ai-infra", group: "ai", level: "study", x: 68, y: 36, title: "推理 Infra / Multi-Agent", short: "系统理解", summary: "围绕 KV Cache、vLLM、SGLang、Dynamo、模型路由与多 Agent 治理建立系统测试视角。", tags: ["KV Cache", "vLLM", "Multi-Agent"], bullets: ["理解 PagedAttention、Prefix Caching、TTFT/TTL 与容量指标。", "梳理 Dynamo、AttentionStore 与推理链路测试视角。", "关注 EveAgent、TradingAgents、模型 LeaderBoard 与 Dispatch 的系统边界。"] }
];

const atlasLayout = {
  "dev-python": [5, 45], "dev-ts": [16, 45], "dev-vue": [5, 63],
  "dev-rest": [5, 81], "dev-data": [15, 93], "dev-browseruse": [27, 93],
  "dev-dom": [38, 82], "dev-playwright": [38, 65], "dev-report": [32, 49],
  "test-yaml": [67, 48], "test-schema": [79, 48], "test-trace": [88, 40],
  "test-failure": [96, 50], "test-release": [62, 63], "test-mobile": [96, 65],
  "test-telemetry": [61, 79], "test-permission": [96, 80], "test-state": [66, 94],
  "test-context": [77, 92], "test-performance": [88, 92], "test-api": [82, 77],
  "ai-browser": [5, 7], "ai-context": [16, 7], "ai-loop": [27, 7],
  "ai-memory": [73, 7], "ai-multimodal": [84, 7], "ai-judge": [95, 7],
  "ai-benchmark": [10, 28], "ai-harness": [27, 29], "ai-rag": [50, 32],
  "ai-skill": [73, 29], "ai-infra": [90, 28]
};

const experienceData = {
  fengtao: {
    kicker: "2025.06 — 2025.09 / 全栈开发",
    title: "锋滔资产 · 全栈开发实习生",
    summary: "参与量化因子管理平台建设，负责把因子申请、审批、计算与结果展示串成可交付的前后端业务链路。",
    tags: ["Vue 3", "Flask", "SQLAlchemy", "PostgreSQL", "Swagger"],
    metrics: [{ value: "前后端", label: "业务链路" }, { value: "4 类", label: "核心业务模块" }],
    sections: [
      { title: "项目背景", text: "平台服务于量化研究流程，需要统一承接因子申请与审批、元数据维护、计算任务提交以及结果展示。难点不在单个页面，而在于业务状态、接口契约和数据持久化必须保持一致。" },
      { title: "我的工作", bullets: ["参与因子申请、审批、元数据管理和计算结果展示页面开发。", "基于 Flask 与 SQLAlchemy 参与 RESTful API、后端执行流程和数据模型实现。", "维护 Swagger 接口契约，配合前后端联调并处理状态展示、表单与异常返回。"] },
      { title: "技术链路", flow: "Vue 3 / Element Plus → RESTful API / Swagger → Flask / SQLAlchemy → PostgreSQL / DolphinDB 计算链路" },
      { title: "验证与交付", bullets: ["通过接口响应、服务日志与数据库状态交叉确认业务结果。", "针对慢响应和联调异常，从前端请求、后端执行到数据状态逐层排查。", "使用 Git/Gogs、Jira 与日常同步推进需求交付。"] },
      { title: "工程方法", text: "这段经历建立了我的工程底座：先理解业务状态，再设计接口和数据模型，最后用日志与数据库验证真实结果。后续做自动化测试和 Agent 质量时，这套思路继续用于状态构造、接口联调和副作用检查。" }
    ]
  },
  aiq: {
    kicker: "2025.09 — 2025.11 / 大模型应用评测",
    title: "艾麒信息 · AI 服务质量 / 大模型应用评测",
    summary: "围绕 AI 语聊长期记忆、多模态教育问答和模型服务稳定性，把开放式模型行为拆成可执行的评测流程、指标与 Badcase。",
    tags: ["长期记忆", "多模态评测", "并发与长稳", "Badcase", "结果报告"],
    metrics: [{ value: "8 类", label: "记忆内容" }, { value: "4 级", label: "写入意图" }, { value: "60", label: "并发用户" }, { value: "60 分钟", label: "耐力测试" }],
    sections: [
      { title: "项目背景", text: "AI 语聊产品既要记住用户长期信息，也要在合适场景主动使用，同时避免错误召回和隐私越界；教育问答还需要区分 OCR、推理、业务编排与输出格式问题。" },
      { title: "记忆评测设计", bullets: ["将用户画像、偏好、经历技能、价值观、目标规划、多记忆混合、临时信息和敏感隐私拆成 8 类内容。", "按强、中、弱指示与纯陈述 4 级写入意图构造中文版样例。", "围绕精确召回、场景化间接召回、多记忆组合推理和抗幻觉/负向召回组织唤醒用例。"] },
      { title: "评测链路", flow: "记忆注入 → 干扰对话 → 回溯提问 → 结果匹配 → 人工复核 → Badcase 分类与报告" },
      { title: "性能与稳定性", bullets: ["参与模型服务 60 并发、60 分钟耐力测试，记录成功率、响应耗时和异常返回。", "结合 CPU 与内存资源曲线观察延迟抖动、超时和资源瓶颈。", "开发多用户并发评测流程并输出记忆匹配、执行效率与衰减趋势报告。"] },
      { title: "多模态质量分层", bullets: ["将教育问答拆为输入与 OCR、模型推理、业务编排、答案正确性、输出格式和用户可用性。", "客观题结合 JSON 预期答案进行半自动校验，复杂语义问题保留人工复核。"] },
      { title: "工程方法", text: "开放结果不能只判断字符串是否一致。更稳妥的方案是让客观字段走规则校验，让复杂语义走分维度评价与人工抽检，并把错误定位到输入、推理、编排或输出环节。" }
    ],
    scope: "性能数据对应一次 60 并发、60 分钟的模型服务耐力测试；复杂语义结果采用规则校验与人工复核结合。"
  },
  bilibili: {
    kicker: "2025.11 — 2026.03 / Browser Agent",
    title: "哔哩哔哩 · AI WebUI / Browser Agent 测试开发",
    summary: "基于 Browser-Use 做直播 Web 场景二次开发，把自然语言测试文档转成页面感知、模型规划、结构化动作、执行断言与可回放脚本。",
    tags: ["Browser-Use", "上下文工程", "执行循环", "Playwright", "Trace"],
    metrics: [{ value: "90%+", label: "关键组件识别" }, { value: "78%", label: "总体用例执行" }, { value: "20s+ → 9s", label: "平均单步耗时" }, { value: "5000 → 2000", label: "系统提示词 Token" }],
    sections: [
      { title: "项目背景", text: "直播 Web 页面包含动态组件、无文字按钮、悬浮操作、弹窗和异步加载。传统脚本维护成本高，因此项目尝试让模型理解测试文档并在受控动作空间内完成操作，再将成功路径沉淀为可重复脚本。" },
      { title: "执行架构", flow: "测试文档 → DOM / 页面状态 → LLM 规划 → 结构化 Action → Controller / Tool → 断言 → Playwright 脚本与运行产物" },
      { title: "我的工作", bullets: ["参与 Controller / Action 扩展、DOM 与 JS 注入、元素索引和 XPath 映射。", "补齐 hover、等待元素可见后点击以及业务组合动作，处理无文字组件、组件合并与漏识别。", "将验证通过的动作序列生成 Playwright 脚本，保存截图、GIF、日志和断言结果。"] },
      { title: "上下文与性能优化", bullets: ["按任务筛选关键组件，裁剪无关 DOM，并精简系统提示词与动作输出。", "系统提示词 Token 约从 5000 降至 2000，部分 DOM Token 约从 900 降至 300。", "平均单步耗时由 20 秒以上降至约 9 秒。"] },
      { title: "稳定性与归因", bullets: ["通过有限重试、最大步数、等待条件、动作约束和人工兜底控制执行循环。", "将失败拆分为识别、规划、动作、时序、断言和环境六类。", "结合 DOM 快照、模型决策、Action 参数、工具结果和截图进行失败回放。"] },
      { title: "工程方法", text: "运行时由模型逐步决策适合处理页面变化，但必须用动作 Schema、步数上限、确定性断言和完整 Trace 控制风险。成功动作可以再转成 Playwright 脚本，把探索性执行变成稳定回归资产。" }
    ],
    scope: "90%+ 对应固定关键组件集识别率，78% 对应直播 Web 端总体用例执行成功率，性能数据来自同一业务场景下的优化对比。"
  },
  baidu: {
    kicker: "2026.03 — 至今 / Agent 质量工程",
    title: "百度 · DuMate AI 测试开发",
    summary: "围绕通用 Agent 的账号、上下文、工具、权限、异步任务和多端状态，组织端到端验证、自动化执行与发版质量闭环。",
    tags: ["Agent 质量", "YAML E2E", "执行证据", "HarmonyOS", "发版回归"],
    metrics: [{ value: "7 条", label: "移动端核心链路" }, { value: "4 台", label: "鸿蒙回归设备" }, { value: "78", label: "单轮测试点" }, { value: "6 组", label: "定时任务组合场景" }],
    sections: [
      { title: "产品与质量对象", text: "DuMate 不只是聊天界面，而是由账号与权限、Agent 引擎、Skill/工具、文件与浏览器执行、异步任务、设备协同、自动化任务和历史状态共同组成的执行型产品。测试需要同时关注最终答案、执行过程和真实副作用。" },
      { title: "端到端验证模型", flow: "前置状态 → Agent / 工具执行 → 状态变化 → 结果与副作用 → 恢复清理 → 报告与问题复测" },
      { title: "桌面端 E2E", bullets: ["参与 E2E case 与执行流程建设，采用模型前置规划、YAML 描述步骤、确定性 Runner 执行的路线。", "串联 Schema 校验、ScenarioRunner、StepExecutor、ProductAdapter、断言、清理和报告。", "覆盖并行任务、中断恢复、工作区与会话隔离、权限变化和定时任务等状态型场景。"] },
      { title: "断言与证据", bullets: ["客观结果优先检查结构化状态、工具事件、文件产物和 UI 不变量。", "开放式结果保留语义评价与人工复核，避免把自然语言整句相等当作成功标准。", "通过日志、截图、环境快照、执行结果和问题单重建失败现场，并区分产品、用例、框架与环境问题。"] },
      { title: "移动端与发版", bullets: ["按账号鉴权、输入与主对话、Agent 执行、Skill、自动化任务、状态历史、设备通知七条链路组织移动端回归。", "参与 Mate 80、Nova 7 Pro、P50 Pro 和荣耀 X10 四台鸿蒙设备的执行与结果汇总。", "参与 P0/发版回归和埋点验证，结合 ADB、Charles、端侧日志与服务信息定位安装、登录、上传、通知和数据链路问题。"] },
      { title: "代表性问题处理", bullets: ["一键登录阻塞先区分操作路径与测试条件，最终定位为 debug 包缺少运营商签名；切换正确配置的 release 包后完成埋点复测。", "对文件预览、自动化调度、上传与通知类异常按客户端、服务、权限、系统限制和产品事件逐层排查。", "发板日完成对应埋点验证、P0 核心链路回归及测试文档同步。"] },
      { title: "工程方法", text: "Agent 测试的重点不是多写页面步骤，而是构造状态、约束工具、验证副作用并保留可回放证据。模型适合做前置规划和语义判断，Runner、Schema、断言与清理负责把执行变成稳定回归。" }
    ],
    scope: "78 个测试点及 67 通过、3 失败、8 待确认来自 Mate 80 的指定回归轮次；多设备结果按设备、系统、安装方式、账号、权限与网络分别记录。"
  }
};

const dialog = document.querySelector("#detail-dialog");
const dialogClose = dialog.querySelector(".dialog-close");

function openDetail(detail) {
  dialog.querySelector(".dialog-kicker").textContent = detail.kicker;
  dialog.querySelector("#dialog-title").textContent = detail.title;
  dialog.querySelector(".dialog-summary").textContent = detail.summary;
  dialog.querySelector(".dialog-tags").innerHTML = (detail.tags || []).map(tag => `<span>${tag}</span>`).join("");
  dialog.querySelector(".dialog-metrics").innerHTML = (detail.metrics || []).map(metric => `<div><strong>${metric.value}</strong><span>${metric.label}</span></div>`).join("");
  dialog.querySelector(".dialog-metrics").hidden = !(detail.metrics || []).length;
  const content = detail.sections
    ? detail.sections.map((section, index) => `<section class="report-section"><span>${String(index + 1).padStart(2, "0")}</span><h3>${section.title}</h3>${section.text ? `<p>${section.text}</p>` : ""}${section.flow ? `<div class="report-flow">${section.flow}</div>` : ""}${section.bullets ? `<ul>${section.bullets.map(item => `<li>${item}</li>`).join("")}</ul>` : ""}</section>`).join("")
    : `<section class="report-section"><span>01</span><h3>核心内容</h3><ul>${detail.bullets.map(item => `<li>${item}</li>`).join("")}</ul></section>`;
  dialog.querySelector(".dialog-content").innerHTML = content;
  const scope = dialog.querySelector(".dialog-boundary");
  scope.textContent = detail.scope ? `指标口径：${detail.scope}` : "";
  scope.hidden = !detail.scope;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDetail() {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

dialogClose.addEventListener("click", closeDetail);
dialog.addEventListener("click", event => { if (event.target === dialog) closeDetail(); });
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

function capabilityDetail(item) {
  return {
    kicker: `${groupMeta[item.group].title} / ${item.level === "practice" ? "项目经验" : item.level === "design" ? "工程方法" : "技术拓展"}`,
    title: item.title,
    summary: item.summary,
    tags: item.tags,
    metrics: [],
    bullets: item.bullets
  };
}

const atlas = document.querySelector("#knowledge-atlas");
const atlasNodes = atlas.querySelector(".atlas-nodes");
const atlasLinks = atlas.querySelector(".atlas-links");
const atlasRoot = atlas.querySelector(".atlas-root");

Object.entries(groupMeta).forEach(([group, meta], index) => {
  const hub = document.createElement("button");
  hub.type = "button";
  hub.className = "atlas-node is-hub";
  hub.dataset.group = group;
  hub.dataset.hub = "true";
  hub.style.setProperty("--x", `${meta.x}%`);
  hub.style.setProperty("--y", `${meta.y}%`);
  hub.style.setProperty("--float-duration", `${6.8 + index * .7}s`);
  hub.style.setProperty("--float-delay", `${-index * 1.3}s`);
  hub.innerHTML = `<span class="node-code">${meta.code}</span><strong>${meta.title}</strong><small>${capabilityData.filter(item => item.group === group).length} 项</small>`;
  hub.addEventListener("click", () => toggleAtlasSelection(hub));
  atlasNodes.appendChild(hub);
});

capabilityData.forEach((item, index) => {
  const [x, y] = atlasLayout[item.id] || [item.x, item.y];
  const node = document.createElement("button");
  node.type = "button";
  node.className = "atlas-node";
  node.dataset.group = item.group;
  node.dataset.level = item.level;
  node.dataset.id = item.id;
  node.style.setProperty("--x", `${x}%`);
  node.style.setProperty("--y", `${y}%`);
  const levelSize = { practice: 112, design: 86, study: 64 };
  node.style.setProperty("--size", `${levelSize[item.level] || 92}px`);
  node.style.setProperty("--float-duration", `${5.8 + index % 5 * .55}s`);
  node.style.setProperty("--float-delay", `${-(index % 9) * .42}s`);
  node.innerHTML = `<span class="node-code">${groupMeta[item.group].code} · ${String(index + 1).padStart(2, "0")}</span><strong>${item.title}</strong><small>${item.short}</small>`;
  node.addEventListener("click", () => {
    if (toggleAtlasSelection(node)) openDetail(capabilityDetail(item));
  });
  atlasNodes.appendChild(node);
});

atlasRoot.addEventListener("click", () => openDetail({
  kicker: "个人能力 / 核心方向",
  title: "顾树昊 · AI 质量工程",
  summary: "个人能力主线由业务开发、自动化测试与 AI / Agent 质量工程三部分组成，重点是把非确定性系统变成可执行、可归因、可回归的证据链。",
  tags: ["开发工程", "测试质量", "AI / Agent"],
  metrics: [{ value: "4", label: "实习阶段" }, { value: "32", label: "能力节点" }],
  bullets: ["开发：能够参与前后端业务、工具服务、接口、数据模型和报告交付。", "测试：覆盖 E2E、移动端、发版、性能、权限、状态和 Trace/Artifact。", "AI：覆盖 Browser Agent、长期记忆、多模态评测，并持续拓展 Judge、Harness、RAG 与推理 Infra 方法。"],
  scope: "4 段实习经历与 32 个能力节点按项目经验、工程方法与技术拓展三类组织。"
}));

let previewAtlasNode = null;
let selectedAtlasNode = null;

function drawAtlasLinks() {
  const atlasRect = atlas.getBoundingClientRect();
  const rootRect = atlasRoot.getBoundingClientRect();
  const rootX = rootRect.left - atlasRect.left + rootRect.width / 2;
  const rootY = rootRect.top - atlasRect.top + rootRect.height / 2;
  const hubs = [...atlas.querySelectorAll(".is-hub")];
  const lines = [];

  hubs.forEach(hub => {
    const hubRect = hub.getBoundingClientRect();
    const hubX = hubRect.left - atlasRect.left + hubRect.width / 2;
    const hubY = hubRect.top - atlasRect.top + hubRect.height / 2;
    const group = hub.dataset.group;
    lines.push(`<line class="group-${group}" data-group="${group}" data-role="trunk" style="--line-index:${lines.length}" x1="${rootX}" y1="${rootY}" x2="${hubX}" y2="${hubY}"></line>`);
    atlas.querySelectorAll(`.atlas-node[data-group="${group}"]:not(.is-hub)`).forEach(node => {
      const rect = node.getBoundingClientRect();
      const x = rect.left - atlasRect.left + rect.width / 2;
      const y = rect.top - atlasRect.top + rect.height / 2;
      lines.push(`<line class="group-${group}" data-group="${group}" data-target="${node.dataset.id}" style="--line-index:${lines.length}" x1="${hubX}" y1="${hubY}" x2="${x}" y2="${y}"></line>`);
    });
  });

  atlasLinks.setAttribute("viewBox", `0 0 ${atlasRect.width} ${atlasRect.height}`);
  atlasLinks.innerHTML = lines.join("");
  const relationNode = previewAtlasNode || selectedAtlasNode;
  if (relationNode) updateAtlasRelation(relationNode);
}

function updateAtlasRelation(node) {
  const group = node.dataset.group;
  const nodeId = node.dataset.id;
  const isHub = node.dataset.hub === "true";

  atlas.classList.add("is-relating");
  atlasRoot.classList.add("is-related");
  atlas.querySelectorAll(".atlas-node").forEach(item => {
    const related = item === node || (item.dataset.group === group && (isHub || item.dataset.hub === "true"));
    item.classList.toggle("is-related", related);
    item.classList.toggle("is-dimmed", !related);
    item.classList.toggle("is-selected", item === selectedAtlasNode);
  });
  atlas.querySelectorAll(".atlas-links line").forEach(line => {
    const related = line.dataset.group === group && (isHub || line.dataset.role === "trunk" || line.dataset.target === nodeId);
    line.classList.toggle("is-related", related);
    line.classList.toggle("is-dimmed", !related);
  });
}

function focusAtlasRelation(node) {
  previewAtlasNode = node;
  updateAtlasRelation(node);
}

function clearAtlasClasses() {
  atlas.classList.remove("is-relating");
  atlasRoot.classList.remove("is-related");
  atlas.querySelectorAll(".atlas-node, .atlas-links line").forEach(item => item.classList.remove("is-related", "is-dimmed", "is-selected"));
}

function clearAtlasPreview() {
  previewAtlasNode = null;
  if (selectedAtlasNode) {
    updateAtlasRelation(selectedAtlasNode);
  } else {
    clearAtlasClasses();
  }
}

function toggleAtlasSelection(node) {
  previewAtlasNode = null;
  if (selectedAtlasNode === node) {
    selectedAtlasNode = null;
    clearAtlasClasses();
    return false;
  }
  selectedAtlasNode = node;
  updateAtlasRelation(node);
  return true;
}

atlas.querySelectorAll(".atlas-node").forEach(node => {
  node.addEventListener("pointerenter", () => focusAtlasRelation(node));
  node.addEventListener("pointerleave", clearAtlasPreview);
  node.addEventListener("focus", () => focusAtlasRelation(node));
  node.addEventListener("blur", clearAtlasPreview);
});

const filterButtons = [...document.querySelectorAll(".atlas-toolbar button")];
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    selectedAtlasNode = null;
    previewAtlasNode = null;
    clearAtlasClasses();
    filterButtons.forEach(item => item.classList.toggle("is-active", item === button));
    atlas.querySelectorAll(".atlas-node").forEach(node => {
      const muted = filter !== "all" && node.dataset.group !== filter;
      node.classList.toggle("is-muted", muted);
      node.classList.toggle("is-focused", filter !== "all" && node.dataset.group === filter);
    });
    atlas.querySelectorAll(".atlas-links line").forEach(line => line.classList.toggle("is-muted", filter !== "all" && line.dataset.group !== filter));
  });
});

const atlasViewport = document.querySelector(".atlas-viewport");

function prepareAtlasViewport() {
  drawAtlasLinks();
  if (window.innerWidth <= 700 && !atlasViewport.dataset.centered) {
    atlasViewport.scrollLeft = Math.max(0, (atlasViewport.scrollWidth - atlasViewport.clientWidth) / 2);
    atlasViewport.dataset.centered = "true";
  }
}

new ResizeObserver(() => requestAnimationFrame(prepareAtlasViewport)).observe(atlas);
requestAnimationFrame(prepareAtlasViewport);

if (!reducedMotion && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    atlas.classList.toggle("is-motion-active", entry.isIntersecting);
  }, { rootMargin: "140px 0px" }).observe(atlas);
} else {
  atlas.classList.add("is-motion-active");
}

const revealTargets = [...document.querySelectorAll([
  ".hero-copy",
  ".head-scene",
  ".photo-prism",
  ".hero-route",
  ".capability-section .section-heading",
  ".capability-overview",
  ".atlas-toolbar",
  ".atlas-viewport",
  ".why-section .section-heading",
  ".why-content",
  ".experience-heading",
  ".experience-track",
  ".life-heading",
  ".life-toolbar",
  ".life-card",
  ".resume-band",
  ".site-footer > *"
].join(","))];

if (!reducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  let revealScrollY = window.scrollY;
  let revealDirection = "down";
  const revealFrameIds = new WeakMap();

  window.addEventListener("scroll", () => {
    const nextScrollY = window.scrollY;
    const distance = nextScrollY - revealScrollY;
    if (Math.abs(distance) >= 3) revealDirection = distance > 0 ? "down" : "up";
    revealScrollY = nextScrollY;
  }, { passive: true });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = entry.target;
      const pendingFrame = revealFrameIds.get(target);
      if (pendingFrame) window.cancelAnimationFrame(pendingFrame);

      if (entry.isIntersecting && entry.intersectionRatio >= .12) {
        target.dataset.revealDirection = revealDirection;
        revealFrameIds.set(target, window.requestAnimationFrame(() => {
          target.classList.add("is-in-view");
          revealFrameIds.delete(target);
        }));
      } else if (!entry.isIntersecting) {
        target.classList.remove("is-in-view");
        revealFrameIds.delete(target);
      }
    });
  }, { threshold: [0, .12], rootMargin: "-4% 0px" });

  revealTargets.forEach((target, index) => {
    target.classList.add("motion-reveal");
    target.dataset.revealDirection = "down";
    target.style.setProperty("--reveal-delay", `${index % 4 * 90}ms`);
    revealObserver.observe(target);
  });
}

const photoPrism = document.querySelector("#photo-prism");
const photoPrismTrack = photoPrism.querySelector(".photo-prism-track");
const photoSources = [...document.querySelectorAll(".life-card img")].map(image => {
  const card = image.closest(".life-card");
  return {
    src: image.getAttribute("src"),
    alt: image.alt,
    category: card?.querySelector("span")?.textContent || "影像记录",
    title: card?.querySelector("strong")?.textContent || image.alt
  };
});

function createPhotoGroup(hidden = false) {
  const group = document.createElement("div");
  group.className = "photo-prism-group";
  if (hidden) group.setAttribute("aria-hidden", "true");
  photoSources.forEach(photo => {
    const frame = document.createElement("span");
    frame.className = "photo-prism-card";
    frame.tabIndex = 0;
    frame.setAttribute("role", "button");
    frame.setAttribute("aria-label", `放大预览：${photo.title}`);
    const image = new Image();
    image.src = photo.src;
    image.alt = hidden ? "" : photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    frame.append(image);
    group.append(frame);
  });
  return group;
}

if (photoSources.length) {
  photoPrismTrack.append(createPhotoGroup(), createPhotoGroup(true));
  photoPrism.style.setProperty("--photo-duration", `${Math.max(40, photoSources.length * 2.4)}s`);
  photoPrism.querySelector("[data-photo-total]").textContent = String(photoSources.length).padStart(2, "0");
}

function bindHoverPause(container, itemSelector) {
  const findItem = target => target instanceof Element ? target.closest(itemSelector) : null;

  container.addEventListener("pointerover", event => {
    const item = findItem(event.target);
    if (item && container.contains(item)) container.classList.add("is-paused");
  });

  container.addEventListener("pointerout", event => {
    const fromItem = findItem(event.target);
    const toItem = findItem(event.relatedTarget);
    if (fromItem && (!toItem || !container.contains(toItem))) container.classList.remove("is-paused");
  });

  container.addEventListener("focusin", event => {
    if (findItem(event.target)) container.classList.add("is-paused");
  });

  container.addEventListener("focusout", event => {
    if (!findItem(event.relatedTarget)) container.classList.remove("is-paused");
  });
}

bindHoverPause(photoPrism, ".photo-prism-card");

const lifeGallery = document.querySelector(".life-gallery");
const lifeGalleryTrack = lifeGallery.querySelector(".life-gallery-track");
const lifeGrid = lifeGallery.querySelector(".life-grid");
const lifeCards = [...lifeGrid.children].filter(card => card.classList.contains("life-card"));
lifeCards.forEach(card => {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `放大预览：${card.querySelector("strong")?.textContent || "照片"}`);
});
const lifeGridClone = lifeGrid.cloneNode(true);
lifeGridClone.classList.add("life-grid--clone");
lifeGridClone.setAttribute("aria-hidden", "true");
lifeGridClone.querySelectorAll(".life-card").forEach(card => {
  card.tabIndex = -1;
  card.classList.remove("motion-reveal", "is-in-view");
  card.removeAttribute("data-reveal-direction");
  card.style.removeProperty("--reveal-delay");
});
lifeGalleryTrack.append(lifeGridClone);
const clonedLifeCards = [...lifeGridClone.querySelectorAll(".life-card")];
const renderedLifeCards = [...lifeCards, ...clonedLifeCards];
bindHoverPause(lifeGallery, ".life-card");

const lifeFilterButtons = [...document.querySelectorAll("[data-life-filter]")];
const lifeThemeCounts = lifeCards.reduce((counts, card) => {
  const theme = card.dataset.lifeTheme;
  counts[theme] = (counts[theme] || 0) + 1;
  counts.all += 1;
  return counts;
}, { all: 0 });

lifeFilterButtons.forEach(button => {
  const filter = button.dataset.lifeFilter;
  const count = lifeThemeCounts[filter] || 0;
  const countLabel = button.querySelector("[data-life-count]");
  if (countLabel) countLabel.textContent = String(count);
  if (filter !== "all" && count === 0) button.disabled = true;
});

lifeFilterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.lifeFilter;
    lifeFilterButtons.forEach(item => item.classList.toggle("is-active", item === button));
    renderedLifeCards.forEach(card => {
      const visible = filter === "all" || card.dataset.lifeTheme === filter;
      card.hidden = !visible;
    });
    lifeGallery.classList.add("is-resetting");
    lifeGallery.style.setProperty("--life-duration", `${Math.max(32, (lifeThemeCounts[filter] || 1) * 3.1)}s`);
    window.requestAnimationFrame(() => lifeGallery.classList.remove("is-resetting"));
  });
});

lifeGallery.style.setProperty("--life-duration", `${Math.max(32, lifeThemeCounts.all * 3.1)}s`);

const lifeSpeedControls = [...lifeGallery.querySelectorAll("[data-life-speed]")];
let lifeBoostTimer = null;
let lifeBoostControl = null;

function setLifePlaybackRate(rate) {
  lifeGallery.dataset.playbackRate = String(rate);
  const animation = lifeGalleryTrack.getAnimations()[0];
  if (!animation) return;
  if (typeof animation.updatePlaybackRate === "function") animation.updatePlaybackRate(rate);
  else animation.playbackRate = rate;
}

function applyLifePlaybackRate() {
  const engagedControl = lifeBoostControl
    || lifeSpeedControls.find(button => button.matches(":hover"))
    || lifeSpeedControls.find(button => button.matches(":focus-visible"));
  if (!engagedControl) {
    setLifePlaybackRate(1);
    return;
  }
  const direction = Number(engagedControl.dataset.lifeSpeed) || 1;
  setLifePlaybackRate(direction * (engagedControl === lifeBoostControl ? 5 : 2.4));
}

lifeSpeedControls.forEach(button => {
  button.addEventListener("pointerenter", applyLifePlaybackRate);
  button.addEventListener("pointerleave", applyLifePlaybackRate);
  button.addEventListener("focus", applyLifePlaybackRate);
  button.addEventListener("blur", applyLifePlaybackRate);
  button.addEventListener("click", () => {
    window.clearTimeout(lifeBoostTimer);
    lifeBoostControl?.classList.remove("is-boosting");
    lifeBoostControl = button;
    button.classList.add("is-boosting");
    applyLifePlaybackRate();
    lifeBoostTimer = window.setTimeout(() => {
      button.classList.remove("is-boosting");
      if (lifeBoostControl === button) lifeBoostControl = null;
      applyLifePlaybackRate();
    }, 900);
  });
});

const photoLightbox = document.querySelector("#photo-lightbox");
const photoLightboxImage = photoLightbox.querySelector("img");
const photoLightboxCategory = photoLightbox.querySelector("figcaption span");
const photoLightboxTitle = photoLightbox.querySelector("figcaption strong");
const photoLightboxClose = photoLightbox.querySelector(".photo-lightbox-close");
const photoLightboxPrevious = photoLightbox.querySelector(".photo-lightbox-nav--previous");
const photoLightboxNext = photoLightbox.querySelector(".photo-lightbox-nav--next");
let activePhotoIndex = 0;

function renderPhotoPreview(index) {
  activePhotoIndex = (index + photoSources.length) % photoSources.length;
  const photo = photoSources[activePhotoIndex];
  photoLightboxImage.src = photo.src;
  photoLightboxImage.alt = photo.alt;
  photoLightboxCategory.textContent = photo.category;
  photoLightboxTitle.textContent = photo.title;
}

function openPhotoPreview(target) {
  const image = target.querySelector("img");
  if (!image) return;
  const index = photoSources.findIndex(photo => photo.src === image.getAttribute("src"));
  renderPhotoPreview(index >= 0 ? index : 0);
  document.body.classList.add("photo-preview-open");
  if (!photoLightbox.open) photoLightbox.showModal();
}

function bindPhotoPreview(container, itemSelector) {
  container.addEventListener("click", event => {
    const item = event.target instanceof Element ? event.target.closest(itemSelector) : null;
    if (item && container.contains(item)) openPhotoPreview(item);
  });
  container.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const item = event.target instanceof Element ? event.target.closest(itemSelector) : null;
    if (!item || !container.contains(item)) return;
    event.preventDefault();
    openPhotoPreview(item);
  });
}

bindPhotoPreview(photoPrism, ".photo-prism-card");
bindPhotoPreview(lifeGallery, ".life-card");

photoLightboxClose.addEventListener("click", () => photoLightbox.close());
photoLightboxPrevious.addEventListener("click", () => renderPhotoPreview(activePhotoIndex - 1));
photoLightboxNext.addEventListener("click", () => renderPhotoPreview(activePhotoIndex + 1));
photoLightbox.addEventListener("click", event => {
  if (event.target === photoLightbox) photoLightbox.close();
});
photoLightbox.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft") renderPhotoPreview(activePhotoIndex - 1);
  if (event.key === "ArrowRight") renderPhotoPreview(activePhotoIndex + 1);
});
photoLightbox.addEventListener("close", () => {
  document.body.classList.remove("photo-preview-open");
  window.requestAnimationFrame(() => {
    photoPrism.classList.remove("is-paused");
    lifeGallery.classList.remove("is-paused");
  });
});

document.querySelectorAll(".experience-node").forEach(card => {
  const showReport = () => openDetail(experienceData[card.dataset.experience]);
  card.addEventListener("click", showReport);
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showReport();
    }
  });
});

const routeLinks = [...document.querySelectorAll(".hero-route a")];
const routeProgress = document.querySelector(".route-progress");
let targetYaw = THREE.MathUtils.degToRad(-16);
let targetPitch = 0;
let restingYaw = targetYaw;
let routeInteracting = false;
const routeLookDownPitch = THREE.MathUtils.degToRad(11);

routeLinks.forEach((link, index) => {
  let dwellTimer = null;

  const cancelDwell = () => {
    if (dwellTimer !== null) {
      window.clearTimeout(dwellTimer);
      dwellTimer = null;
    }
    link.classList.remove("is-dwelling");
    if (routeInteracting) {
      routeInteracting = false;
      targetYaw = restingYaw;
      targetPitch = 0;
    }
  };

  const startDwell = event => {
    if (event.pointerType === "touch") return;
    cancelDwell();
    routeInteracting = true;
    targetYaw = THREE.MathUtils.degToRad(Number(link.dataset.view));
    targetPitch = routeLookDownPitch;
    link.classList.add("is-dwelling");
    dwellTimer = window.setTimeout(() => {
      dwellTimer = null;
      link.classList.remove("is-dwelling");
      link.click();
    }, 2400);
  };

  link.addEventListener("pointerenter", startDwell);
  link.addEventListener("pointerleave", cancelDwell);
  link.addEventListener("pointercancel", cancelDwell);

  link.addEventListener("click", event => {
    event.preventDefault();
    cancelDwell();
    restingYaw = THREE.MathUtils.degToRad(Number(link.dataset.view));
    targetYaw = restingYaw;
    targetPitch = 0;
    routeLinks.forEach(item => item.classList.toggle("is-active", item === link));
    routeProgress.style.strokeDashoffset = String(1 - index / (routeLinks.length - 1));
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      window.setTimeout(() => target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }), reducedMotion ? 0 : 560);
    } else {
      window.setTimeout(() => { window.location.href = href; }, reducedMotion ? 0 : 620);
    }
  });
});
routeLinks[0].classList.add("is-active");

function createFaceGeometry() {
  const columns = 56;
  const rows = 60;
  const positions = [];
  const uvs = [];
  const indices = [];
  const headCenterY = .52;
  const radiusX = 1.2;
  const radiusY = 1.43;
  const radiusZ = 1.14;

  for (let row = 0; row <= rows; row += 1) {
    const v = row / rows;
    const latitude = THREE.MathUtils.lerp(1.2, -1.12, v);
    const latitudeRadius = Math.cos(latitude);
    for (let column = 0; column <= columns; column += 1) {
      const u = column / columns;
      const longitude = (u - .5) * 1.92;
      const x = Math.sin(longitude) * latitudeRadius * radiusX;
      const y = headCenterY + Math.sin(latitude) * radiusY;
      const z = Math.cos(longitude) * latitudeRadius * radiusZ + .045;
      positions.push(x, y, z);
      uvs.push(u, 1 - v);
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const a = row * (columns + 1) + column;
      const b = a + columns + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createPortraitTexture(image) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 600;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D context is unavailable");
  const scaleX = image.naturalWidth / 450;
  const scaleY = image.naturalHeight / 600;
  context.drawImage(image, 52 * scaleX, 16 * scaleY, 346 * scaleX, 432 * scaleY, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let index = 0; index < pixels.data.length; index += 4) {
    const red = pixels.data[index];
    const green = pixels.data[index + 1];
    const blue = pixels.data[index + 2];
    const distanceFromWhite = Math.sqrt((255 - red) ** 2 + (255 - green) ** 2 + (255 - blue) ** 2);
    const column = index / 4 % canvas.width;
    const row = Math.floor(index / 4 / canvas.width);
    const horizontalDistance = Math.abs(column / canvas.width - .5) * 2;
    const sideFade = horizontalDistance > .82 ? Math.max(0, 1 - (horizontalDistance - .82) / .18) : 1;
    const topFade = row < canvas.height * .02 ? row / (canvas.height * .02) : 1;
    const bottomFade = row > canvas.height * .86 ? Math.max(0, 1 - (row / canvas.height - .86) / .14) : 1;
    const backgroundAlpha = Math.max(0, Math.min(255, (distanceFromWhite - 10) * 5.6));
    pixels.data[index + 3] = backgroundAlpha * sideFade * topFade * bottomFade;
  }

  context.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function initPortraitScene() {
  const canvas = document.querySelector("#portrait-scene");
  const container = document.querySelector(".head-scene");
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (error) {
    document.documentElement.classList.add("scene-unavailable");
    console.warn("3D portrait unavailable", error);
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  camera.position.set(0, .1, 11);

  const model = new THREE.Group();
  model.position.set(1.15, .44, 0);
  scene.add(model);

  const skin = new THREE.MeshStandardMaterial({ color: 0xd5a78f, roughness: .88, metalness: 0 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x161713, roughness: .82, metalness: 0 });
  const jacket = new THREE.MeshStandardMaterial({ color: 0x181c18, roughness: .76, metalness: .03 });
  const lapel = new THREE.MeshStandardMaterial({ color: 0x252b25, roughness: .7, metalness: .02, side: THREE.DoubleSide });

  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 36), skin);
  head.scale.set(1.2, 1.43, 1.14);
  head.position.y = .52;
  model.add(head);

  const topHair = new THREE.Mesh(new THREE.SphereGeometry(1, 36, 24), hair);
  topHair.scale.set(1.14, .52, 1.08);
  topHair.position.set(0, 1.52, -.08);
  model.add(topHair);

  [-1, 1].forEach(direction => {
    const sideHair = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), hair);
    sideHair.scale.set(.38, .72, .82);
    sideHair.position.set(direction * .9, 1.15, -.12);
    model.add(sideHair);
  });

  [-1, 1].forEach(direction => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(.25, 24, 16), skin);
    ear.scale.set(.5, 1, .34);
    ear.position.set(direction * 1.18, .48, 0);
    model.add(ear);
  });

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.64, .78, .9, 32), skin);
  neck.position.y = -1.25;
  model.add(neck);

  const shoulders = new THREE.Mesh(new THREE.SphereGeometry(1, 42, 22), jacket);
  shoulders.scale.set(2.5, .65, .88);
  shoulders.position.y = -2.35;
  model.add(shoulders);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 1.9, 2.25, 48), jacket);
  torso.scale.z = .56;
  torso.position.set(0, -3.25, -.18);
  model.add(torso);

  const leftLapelShape = new THREE.Shape();
  leftLapelShape.moveTo(-1, -1.54);
  leftLapelShape.lineTo(-.14, -1.9);
  leftLapelShape.lineTo(-.5, -2.22);
  leftLapelShape.lineTo(-1.18, -1.84);
  leftLapelShape.closePath();
  const leftLapel = new THREE.Mesh(new THREE.ShapeGeometry(leftLapelShape), lapel);
  leftLapel.position.z = 1.02;
  model.add(leftLapel);

  const rightLapel = leftLapel.clone();
  rightLapel.scale.x = -1;
  model.add(rightLapel);

  const portraitImage = new Image();
  portraitImage.onload = () => {
    try {
      const faceTexture = createPortraitTexture(portraitImage);
      const faceMaterial = new THREE.MeshStandardMaterial({
        map: faceTexture,
        emissive: 0xffffff,
        emissiveMap: faceTexture,
        emissiveIntensity: .14,
        transparent: true,
        alphaTest: .05,
        roughness: .74,
        metalness: 0,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
        side: THREE.DoubleSide
      });
      const face = new THREE.Mesh(createFaceGeometry(), faceMaterial);
      face.renderOrder = 2;
      model.add(face);
      document.documentElement.classList.add("scene-face-ready");
      renderer.render(scene, camera);
    } catch (error) {
      document.documentElement.classList.add("scene-unavailable");
      console.warn("3D portrait texture unavailable", error);
    }
  };
  portraitImage.onerror = () => document.documentElement.classList.add("scene-unavailable");
  portraitImage.decoding = "async";
  portraitImage.fetchPriority = "high";
  portraitImage.src = document.querySelector(".head-fallback").currentSrc;

  scene.add(new THREE.HemisphereLight(0xf7fff0, 0x182019, 2.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
  keyLight.position.set(-4, 5, 7);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x58d5c7, 3.4);
  rimLight.position.set(5, 2, -3);
  scene.add(rimLight);
  const accentLight = new THREE.PointLight(0xff745e, 18, 16);
  accentLight.position.set(-4, -2, 4);
  scene.add(accentLight);

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = width < 700 ? 12.4 : 11.8;
    model.position.x = width < 700 ? 0 : 1.45;
    model.scale.setScalar(width < 700 ? .78 : .82);
    camera.updateProjectionMatrix();
  }

  new ResizeObserver(resize).observe(container);
  resize();

  const yawLimit = THREE.MathUtils.degToRad(22);
  const pitchLimit = THREE.MathUtils.degToRad(10);
  let pointerFollowing = false;

  const followPortraitPointer = event => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const rect = canvas.getBoundingClientRect();
    const positionX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const positionY = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    pointerFollowing = true;
    targetYaw = THREE.MathUtils.lerp(-yawLimit, yawLimit, positionX);
    targetPitch = THREE.MathUtils.lerp(pitchLimit, -pitchLimit, positionY);
    canvas.classList.add("is-following");
  };
  canvas.addEventListener("pointermove", followPortraitPointer);
  if (!window.PointerEvent) canvas.addEventListener("mousemove", followPortraitPointer);

  const resetPortraitPointer = () => {
    pointerFollowing = false;
    targetYaw = restingYaw;
    targetPitch = 0;
    canvas.classList.remove("is-following");
  };
  canvas.addEventListener("pointerleave", resetPortraitPointer);
  if (!window.PointerEvent) canvas.addEventListener("mouseleave", resetPortraitPointer);
  container.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") {
      targetYaw = 0;
      targetPitch = 0;
      restingYaw = 0;
      return;
    }
    if (event.key === "ArrowLeft") targetYaw = Math.max(-yawLimit, targetYaw - .05);
    if (event.key === "ArrowRight") targetYaw = Math.min(yawLimit, targetYaw + .05);
    if (event.key === "ArrowUp") targetPitch = Math.max(-pitchLimit, targetPitch - .025);
    if (event.key === "ArrowDown") targetPitch = Math.min(pitchLimit, targetPitch + .025);
    restingYaw = targetYaw;
  });

  const clock = new THREE.Clock();
  let currentYaw = targetYaw;
  let currentPitch = 0;
  let lastRenderTime = 0;

  const renderFrame = time => {
    if (time - lastRenderTime < 1000 / 30) return;
    lastRenderTime = time;
    const delta = Math.min(clock.getDelta(), .05);
    const elapsed = clock.elapsedTime;
    const ambientYaw = reducedMotion || pointerFollowing || routeInteracting ? 0 : Math.sin(elapsed * .34) * .018;
    currentYaw = THREE.MathUtils.damp(currentYaw, targetYaw + ambientYaw, 8.4, delta);
    currentPitch = THREE.MathUtils.damp(currentPitch, targetPitch + (reducedMotion || pointerFollowing || routeInteracting ? 0 : Math.sin(elapsed * .42) * .012), 7.2, delta);
    model.rotation.y = currentYaw;
    model.rotation.x = currentPitch;
    canvas.dataset.yaw = currentYaw.toFixed(3);
    canvas.dataset.pitch = currentPitch.toFixed(3);
    renderer.render(scene, camera);
  };

  renderer.setAnimationLoop(renderFrame);
  new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? renderFrame : null);
  }, { rootMargin: "120px" }).observe(container);
}

initPortraitScene();
