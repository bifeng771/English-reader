const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const els = {
  fileInput: $("#fileInput"),
  coverInput: $("#coverInput"),
  dropZone: $("#dropZone"),
  docList: $("#docList"),
  sampleBtn: $("#sampleBtn"),
  clearLibraryBtn: $("#clearLibraryBtn"),
  supportStatus: $("#supportStatus"),
  libraryPane: $("#libraryPane"),
  toggleSidebarBtn: $("#toggleSidebarBtn"),
  closeSidebarBtn: $("#closeSidebarBtn"),
  hideSidebarBtn: $("#hideSidebarBtn"),
  topbarHideBtn: $("#topbarHideBtn"),
  topbarShowBtn: $("#topbarShowBtn"),
  topbarResizer: $("#topbarResizer"),
  immersiveToggleBtn: $("#immersiveToggleBtn"),
  readerTopbar: $(".reader-topbar"),
  docFormat: $("#docFormat"),
  docTitle: $("#docTitle"),
  docStats: $("#docStats"),
  readerContent: $("#readerContent"),
  tocToggleBtn: $("#tocToggleBtn"),
  readerToc: $("#readerToc"),
  tocList: $("#tocList"),
  pageStatus: $("#pageStatus"),
  readingWidthRange: $("#readingWidthRange"),
  readingZoomRange: $("#readingZoomRange"),
  readingZoomValue: $("#readingZoomValue"),
  mobileImportBtn: $("#mobileImportBtn"),
  toolbarHideBtn: $("#toolbarHideBtn"),
  sidebarResizer: $("#sidebarResizer"),
  tocResizer: $("#tocResizer"),
  hideTocBtn: $("#hideTocBtn"),
  asideResizer: $("#asideResizer"),
  readerAside: $("#readerAside"),
  hideAsideBtn: $("#hideAsideBtn"),
  readerAsideBookmarks: $("#readerAsideBookmarks"),
  readingMemory: $("#readingMemory"),
  readingDock: $("#readingDock"),
  dockSidebarBtn: $("#dockSidebarBtn"),
  dockTopbarBtn: $("#dockTopbarBtn"),
  dockToolbarBtn: $("#dockToolbarBtn"),
  dockTocBtn: $("#dockTocBtn"),
  dockAsideBtn: $("#dockAsideBtn"),
  dockExitBtn: $("#dockExitBtn"),
  dockCollapseBtn: $("#dockCollapseBtn"),
  dockShowBtn: $("#dockShowBtn"),
  accentSelect: $("#accentSelect"),
  voiceSelect: $("#voiceSelect"),
  voiceStyleSelect: $("#voiceStyleSelect"),
  fontFamilySelect: $("#fontFamilySelect"),
  formatSelect: $("#formatSelect"),
  fontSizeRange: $("#fontSizeRange"),
  fontSizeValue: $("#fontSizeValue"),
  pageModeSelect: $("#pageModeSelect"),
  playUsVoiceBtn: $("#playUsVoiceBtn"),
  playUkVoiceBtn: $("#playUkVoiceBtn"),
  rateRange: $("#rateRange"),
  rateValue: $("#rateValue"),
  speakArticleBtn: $("#speakArticleBtn"),
  pauseBtn: $("#pauseBtn"),
  stopBtn: $("#stopBtn"),
  bookmarkToggleBtn: $("#bookmarkToggleBtn"),
  bookmarkDrawer: $("#bookmarkDrawer"),
  bookmarkList: $("#bookmarkList"),
  clearBookmarksBtn: $("#clearBookmarksBtn"),
  hideBookmarksBtn: $("#hideBookmarksBtn"),
  cursorTranslateToggleBtn: $("#cursorTranslateToggleBtn"),
  cursorTooltip: $("#cursorTooltip"),
  voiceSampleInput: $("#voiceSampleInput"),
  voiceProfile: $("#voiceProfile"),
  selectionPopover: $("#selectionPopover"),
  popoverDragHandle: $("#popoverDragHandle"),
  selectionKind: $("#selectionKind"),
  popoverHint: $("#popoverHint"),
  translatorSelect: $("#translatorSelect"),
  dockPopoverBtn: $("#dockPopoverBtn"),
  collapsePopoverBtn: $("#collapsePopoverBtn"),
  pinPopoverBtn: $("#pinPopoverBtn"),
  closePopoverBtn: $("#closePopoverBtn"),
  wordCard: $("#wordCard"),
  phoneticList: $("#phoneticList"),
  selectionPreview: $("#selectionPreview"),
  translationOutput: $("#translationOutput"),
  translateSelectionBtn: $("#translateSelectionBtn"),
  readSelectionBtn: $("#readSelectionBtn"),
  bookmarkSelectionBtn: $("#bookmarkSelectionBtn"),
  boldSelectionBtn: $("#boldSelectionBtn"),
  recordBtn: $("#popoverRecordBtn") || $("#recordBtn"),
  recordStopBtn: $("#popoverRecordStopBtn") || $("#recordStopBtn"),
  practiceTargetText: $("#popoverPracticeTargetText") || $("#practiceTargetText"),
  transcriptInput: $("#popoverTranscriptInput") || $("#transcriptInput"),
  scoreTypedBtn: $("#popoverScoreTypedBtn") || $("#scoreTypedBtn"),
  stopScoreBtn: $("#popoverStopScoreBtn") || $("#stopScoreBtn"),
  scoreOutput: $("#popoverScoreOutput") || $("#scoreOutput"),
  readPracticeBtn: $("#popoverReadPracticeBtn") || $("#readPracticeBtn"),
  resetScoreBtn: $("#popoverResetScoreBtn") || $("#resetScoreBtn"),
  chatMessages: $("#chatMessages"),
  chatForm: $("#chatForm"),
  chatInput: $("#chatInput"),
  quickPrompts: $("#quickPrompts"),
  clearChatBtn: $("#clearChatBtn"),
  toast: $("#toast"),
};

const STORAGE_KEY = "lingua-reader-docs-v2";
const OLD_STORAGE_KEY = "lingua-reader-docs-v1";
const PREF_KEY = "lingua-reader-prefs-v2";
const MAX_STORED_TEXT = 1_400_000;

const sampleText = `The Hidden Value of Slow Reading

Most people learn a language by collecting words, but real confidence grows when those words are met inside a living sentence. Slow reading gives the learner enough time to notice rhythm, grammar, and emotion at the same time.

When you read a paragraph aloud, your mouth discovers patterns that your eyes may miss. A phrase like "on the other hand" becomes easier to remember because it has a shape, a pause, and a purpose. Good pronunciation is not only about isolated sounds; it is also about stress, linking, and the movement of meaning.

Technology can make this practice more personal. A reader can listen to a sentence in different voices, repeat it at a comfortable speed, and compare the spoken result with the original text. The best feedback is specific: which words were missed, which sounds need attention, and which sentence should be repeated slowly.

The goal is not to sound perfect after one attempt. The goal is to build a small daily loop: read, listen, imitate, receive feedback, and talk about the ideas in the text. Over time, that loop turns reading into conversation and conversation into memory.`;

const stopWords = new Set(
  "a an and are as at be been being but by can could did do does for from had has have he her his i if in into is it its may more most not of on or our she should than that the their them then there these they this those to was we were what when where which who will with would you your".split(
    " ",
  ),
);

const wordDictionary = new Map(
  Object.entries({
    hidden: "隐藏的；不易察觉的",
    value: "价值",
    slow: "慢的；放慢的",
    reading: "阅读",
    people: "人们",
    learn: "学习",
    language: "语言",
    collecting: "收集",
    words: "词汇；单词",
    confidence: "信心",
    grows: "增长",
    living: "鲜活的；有生命力的",
    sentence: "句子",
    learner: "学习者",
    enough: "足够的",
    notice: "注意到",
    rhythm: "节奏",
    grammar: "语法",
    emotion: "情绪；情感",
    paragraph: "段落",
    aloud: "出声地",
    mouth: "嘴；口腔",
    discovers: "发现",
    patterns: "模式；规律",
    phrase: "短语；词组",
    easier: "更容易的",
    remember: "记住",
    shape: "形状；结构",
    pause: "停顿",
    purpose: "目的；用途",
    pronunciation: "发音",
    isolated: "孤立的",
    sounds: "音；声音",
    stress: "重音；压力",
    linking: "连读",
    movement: "移动；推进",
    meaning: "意义",
    technology: "技术",
    personal: "个人化的",
    listen: "听",
    different: "不同的",
    voices: "声音；音色",
    repeat: "重复；跟读",
    comfortable: "舒适的",
    speed: "速度",
    compare: "比较",
    spoken: "口语的；说出的",
    result: "结果",
    original: "原文的；最初的",
    feedback: "反馈",
    specific: "具体的",
    missed: "漏掉的；错过的",
    attention: "注意",
    repeated: "重复的",
    perfectly: "完美地",
    attempt: "尝试",
    build: "建立",
    daily: "每日的",
    loop: "循环",
    imitate: "模仿",
    receive: "收到",
    talk: "谈论",
    ideas: "想法",
    conversation: "对话",
    memory: "记忆",
  }),
);

const supplementalDictionary = {
  ability: "能力；才能",
  able: "能够的",
  about: "关于；大约",
  above: "在……上方",
  accept: "接受；认可",
  according: "根据；按照",
  achieve: "实现；达到",
  across: "横过；遍及",
  action: "行动；动作",
  activity: "活动",
  actually: "实际上",
  add: "增加；添加",
  address: "处理；地址",
  advanced: "高级的；先进的",
  advantage: "优势",
  affect: "影响",
  almost: "几乎",
  already: "已经",
  although: "虽然",
  always: "总是",
  amount: "数量",
  analysis: "分析",
  answer: "回答；答案",
  appear: "出现；显得",
  application: "应用；申请",
  approach: "方法；接近",
  article: "文章",
  aspect: "方面",
  available: "可用的；可获得的",
  avoid: "避免",
  basic: "基础的",
  behavior: "行为",
  benefit: "好处；受益",
  between: "在……之间",
  beyond: "超出",
  chapter: "章节",
  choice: "选择",
  clear: "清楚的",
  common: "常见的；共同的",
  complete: "完整的；完成",
  complex: "复杂的",
  concept: "概念",
  connect: "连接；联系",
  consider: "考虑",
  contain: "包含",
  context: "上下文；语境",
  continue: "继续",
  create: "创造；创建",
  current: "当前的",
  data: "数据",
  decide: "决定",
  detail: "细节",
  develop: "发展；开发",
  difference: "差异",
  difficult: "困难的",
  display: "显示；展示",
  document: "文档；文件",
  effect: "影响；效果",
  effective: "有效的",
  example: "例子",
  explain: "解释",
  expression: "表达；词组",
  feature: "功能；特点",
  focus: "关注；焦点",
  follow: "跟随；遵循",
  form: "形式；表格",
  function: "功能；函数",
  general: "一般的；总体的",
  guide: "指导；指南",
  important: "重要的",
  improve: "提高；改善",
  include: "包括",
  information: "信息",
  instead: "代替；反而",
  knowledge: "知识",
  level: "水平；层级",
  likely: "可能的",
  main: "主要的",
  manage: "管理",
  method: "方法",
  minute: "分钟",
  natural: "自然的",
  necessary: "必要的",
  note: "笔记；注意",
  object: "对象；物体",
  option: "选项",
  order: "顺序；命令",
  organization: "组织；结构",
  page: "页面；页码",
  passage: "文章片段；段落",
  point: "要点；分数",
  position: "位置",
  practice: "练习",
  process: "过程；处理",
  provide: "提供",
  question: "问题",
  recognize: "识别；认出",
  record: "记录；录音",
  reference: "参考",
  relationship: "关系",
  require: "需要；要求",
  research: "研究",
  respond: "回应",
  review: "复习；评论",
  section: "部分；章节",
  selection: "选择；选中文本",
  simple: "简单的",
  source: "来源；源文件",
  structure: "结构",
  support: "支持",
  system: "系统",
  table: "表格",
  task: "任务",
  topic: "主题",
  translate: "翻译",
  translation: "翻译；译文",
  understand: "理解",
  useful: "有用的",
  usually: "通常",
  version: "版本",
  view: "视图；查看",
  vocabulary: "词汇",
  whole: "整个的",
  within: "在……内部",
  without: "没有",
  real: "真实的；真正的",
  enough: "足够的",
  time: "时间；次数",
  same: "相同的",
  other: "其他的；另一个",
  hand: "手；方面",
  become: "变成；成为",
  becomes: "变得；成为（第三人称单数）",
  remember: "记住",
  because: "因为",
  only: "仅仅；只",
  also: "也；而且",
  good: "好的",
  best: "最好的",
  not: "不；没有",
  one: "一；一个",
  attempt: "尝试",
  over: "在……期间；超过",
  turn: "转变；轮到",
  sound: "听起来；声音",
  perfect: "完美的",
  idea: "想法；主意",
  text: "文本；正文",
  original: "原始的；原文",
  result: "结果",
  comfortable: "舒适的",
  personal: "个人的；个性化的",
  technology: "技术",
  feedback: "反馈",
  specific: "具体的",
  attention: "注意力",
  receive: "收到",
  imitate: "模仿",
  conversation: "对话",
  memory: "记忆",
};

for (const [word, meaning] of Object.entries(supplementalDictionary)) {
  if (!wordDictionary.has(word)) wordDictionary.set(word, meaning);
}

const phoneticDictionary = new Map(
  Object.entries({
    hidden: { us: "/ˈhɪdn/", uk: "/ˈhɪdn/" },
    value: { us: "/ˈvæljuː/", uk: "/ˈvæljuː/" },
    slow: { us: "/sloʊ/", uk: "/sləʊ/" },
    reading: { us: "/ˈriːdɪŋ/", uk: "/ˈriːdɪŋ/" },
    most: { us: "/moʊst/", uk: "/məʊst/" },
    people: { us: "/ˈpiːpl/", uk: "/ˈpiːpl/" },
    learn: { us: "/lɝːn/", uk: "/lɜːn/" },
    language: { us: "/ˈlæŋɡwɪdʒ/", uk: "/ˈlæŋɡwɪdʒ/" },
    collecting: { us: "/kəˈlektɪŋ/", uk: "/kəˈlektɪŋ/" },
    words: { us: "/wɝːdz/", uk: "/wɜːdz/" },
    confidence: { us: "/ˈkɑːnfɪdəns/", uk: "/ˈkɒnfɪdəns/" },
    grows: { us: "/ɡroʊz/", uk: "/ɡrəʊz/" },
    sentence: { us: "/ˈsentəns/", uk: "/ˈsentəns/" },
    learner: { us: "/ˈlɝːnər/", uk: "/ˈlɜːnə/" },
    enough: { us: "/ɪˈnʌf/", uk: "/ɪˈnʌf/" },
    notice: { us: "/ˈnoʊtɪs/", uk: "/ˈnəʊtɪs/" },
    rhythm: { us: "/ˈrɪðəm/", uk: "/ˈrɪðəm/" },
    grammar: { us: "/ˈɡræmər/", uk: "/ˈɡræmə/" },
    emotion: { us: "/ɪˈmoʊʃn/", uk: "/ɪˈməʊʃn/" },
    paragraph: { us: "/ˈpærəɡræf/", uk: "/ˈpærəɡrɑːf/" },
    aloud: { us: "/əˈlaʊd/", uk: "/əˈlaʊd/" },
    mouth: { us: "/maʊθ/", uk: "/maʊθ/" },
    discovers: { us: "/dɪˈskʌvərz/", uk: "/dɪˈskʌvəz/" },
    patterns: { us: "/ˈpætərnz/", uk: "/ˈpætənz/" },
    phrase: { us: "/freɪz/", uk: "/freɪz/" },
    easier: { us: "/ˈiːziər/", uk: "/ˈiːziə/" },
    remember: { us: "/rɪˈmembər/", uk: "/rɪˈmembə/" },
    shape: { us: "/ʃeɪp/", uk: "/ʃeɪp/" },
    pause: { us: "/pɔːz/", uk: "/pɔːz/" },
    purpose: { us: "/ˈpɝːpəs/", uk: "/ˈpɜːpəs/" },
    pronunciation: { us: "/prəˌnʌnsiˈeɪʃn/", uk: "/prəˌnʌnsiˈeɪʃn/" },
    isolated: { us: "/ˈaɪsəleɪtɪd/", uk: "/ˈaɪsəleɪtɪd/" },
    sounds: { us: "/saʊndz/", uk: "/saʊndz/" },
    stress: { us: "/stres/", uk: "/stres/" },
    linking: { us: "/ˈlɪŋkɪŋ/", uk: "/ˈlɪŋkɪŋ/" },
    movement: { us: "/ˈmuːvmənt/", uk: "/ˈmuːvmənt/" },
    meaning: { us: "/ˈmiːnɪŋ/", uk: "/ˈmiːnɪŋ/" },
    technology: { us: "/tekˈnɑːlədʒi/", uk: "/tekˈnɒlədʒi/" },
    personal: { us: "/ˈpɝːsənl/", uk: "/ˈpɜːsənl/" },
    listen: { us: "/ˈlɪsn/", uk: "/ˈlɪsn/" },
    different: { us: "/ˈdɪfrənt/", uk: "/ˈdɪfrənt/" },
    voices: { us: "/ˈvɔɪsɪz/", uk: "/ˈvɔɪsɪz/" },
    repeat: { us: "/rɪˈpiːt/", uk: "/rɪˈpiːt/" },
    comfortable: { us: "/ˈkʌmftəbl/", uk: "/ˈkʌmftəbl/" },
    speed: { us: "/spiːd/", uk: "/spiːd/" },
    compare: { us: "/kəmˈper/", uk: "/kəmˈpeə/" },
    spoken: { us: "/ˈspoʊkən/", uk: "/ˈspəʊkən/" },
    result: { us: "/rɪˈzʌlt/", uk: "/rɪˈzʌlt/" },
    original: { us: "/əˈrɪdʒənl/", uk: "/əˈrɪdʒənl/" },
    feedback: { us: "/ˈfiːdbæk/", uk: "/ˈfiːdbæk/" },
    specific: { us: "/spəˈsɪfɪk/", uk: "/spəˈsɪfɪk/" },
    missed: { us: "/mɪst/", uk: "/mɪst/" },
    attention: { us: "/əˈtenʃn/", uk: "/əˈtenʃn/" },
    repeated: { us: "/rɪˈpiːtɪd/", uk: "/rɪˈpiːtɪd/" },
    goal: { us: "/ɡoʊl/", uk: "/ɡəʊl/" },
    perfect: { us: "/ˈpɝːfɪkt/", uk: "/ˈpɜːfɪkt/" },
    attempt: { us: "/əˈtempt/", uk: "/əˈtempt/" },
    build: { us: "/bɪld/", uk: "/bɪld/" },
    daily: { us: "/ˈdeɪli/", uk: "/ˈdeɪli/" },
    loop: { us: "/luːp/", uk: "/luːp/" },
    imitate: { us: "/ˈɪmɪteɪt/", uk: "/ˈɪmɪteɪt/" },
    receive: { us: "/rɪˈsiːv/", uk: "/rɪˈsiːv/" },
    ideas: { us: "/aɪˈdiːəz/", uk: "/aɪˈdɪəz/" },
    conversation: { us: "/ˌkɑːnvərˈseɪʃn/", uk: "/ˌkɒnvəˈseɪʃn/" },
    memory: { us: "/ˈmeməri/", uk: "/ˈmeməri/" },
  }),
);

const supplementalPhonetics = {
  the: "/ðə/",
  a: "/ə/",
  an: "/ən/",
  and: "/ænd/",
  are: "/ɑːr/",
  as: "/æz/",
  at: "/æt/",
  be: "/biː/",
  by: "/baɪ/",
  for: "/fɔːr/",
  from: "/frəm/",
  has: "/hæz/",
  have: "/hæv/",
  in: "/ɪn/",
  is: "/ɪz/",
  it: "/ɪt/",
  its: "/ɪts/",
  of: "/əv/",
  on: "/ɑːn/",
  or: "/ɔːr/",
  that: "/ðæt/",
  their: "/ðer/",
  this: "/ðɪs/",
  to: "/tuː/",
  was: "/wɑːz/",
  when: "/wen/",
  which: "/wɪtʃ/",
  with: "/wɪð/",
  without: "/wɪˈðaʊt/",
  ability: "/əˈbɪləti/",
  able: "/ˈeɪbl/",
  about: "/əˈbaʊt/",
  above: "/əˈbʌv/",
  accept: "/əkˈsept/",
  according: "/əˈkɔːrdɪŋ/",
  achieve: "/əˈtʃiːv/",
  across: "/əˈkrɔːs/",
  action: "/ˈækʃn/",
  activity: "/ækˈtɪvəti/",
  actually: "/ˈæktʃuəli/",
  address: "/əˈdres/",
  advanced: "/ədˈvænst/",
  advantage: "/ədˈvæntɪdʒ/",
  affect: "/əˈfekt/",
  almost: "/ˈɔːlmoʊst/",
  already: "/ɔːlˈredi/",
  although: "/ɔːlˈðoʊ/",
  always: "/ˈɔːlweɪz/",
  amount: "/əˈmaʊnt/",
  analysis: "/əˈnæləsɪs/",
  answer: "/ˈænsər/",
  appear: "/əˈpɪr/",
  application: "/ˌæplɪˈkeɪʃn/",
  approach: "/əˈproʊtʃ/",
  article: "/ˈɑːrtɪkl/",
  aspect: "/ˈæspekt/",
  available: "/əˈveɪləbl/",
  avoid: "/əˈvɔɪd/",
  basic: "/ˈbeɪsɪk/",
  behavior: "/bɪˈheɪvjər/",
  benefit: "/ˈbenɪfɪt/",
  between: "/bɪˈtwiːn/",
  beyond: "/bɪˈjɑːnd/",
  chapter: "/ˈtʃæptər/",
  choice: "/tʃɔɪs/",
  clear: "/klɪr/",
  common: "/ˈkɑːmən/",
  complete: "/kəmˈpliːt/",
  complex: "/ˈkɑːmpleks/",
  concept: "/ˈkɑːnsept/",
  connect: "/kəˈnekt/",
  consider: "/kənˈsɪdər/",
  contain: "/kənˈteɪn/",
  context: "/ˈkɑːntekst/",
  continue: "/kənˈtɪnjuː/",
  create: "/kriˈeɪt/",
  current: "/ˈkɜːrənt/",
  data: "/ˈdeɪtə/",
  decide: "/dɪˈsaɪd/",
  detail: "/dɪˈteɪl/",
  develop: "/dɪˈveləp/",
  document: "/ˈdɑːkjumənt/",
  effective: "/ɪˈfektɪv/",
  example: "/ɪɡˈzæmpl/",
  explain: "/ɪkˈspleɪn/",
  expression: "/ɪkˈspreʃn/",
  feature: "/ˈfiːtʃər/",
  focus: "/ˈfoʊkəs/",
  follow: "/ˈfɑːloʊ/",
  function: "/ˈfʌŋkʃn/",
  guide: "/ɡaɪd/",
  important: "/ɪmˈpɔːrtnt/",
  improve: "/ɪmˈpruːv/",
  include: "/ɪnˈkluːd/",
  information: "/ˌɪnfərˈmeɪʃn/",
  instead: "/ɪnˈsted/",
  knowledge: "/ˈnɑːlɪdʒ/",
  level: "/ˈlevl/",
  likely: "/ˈlaɪkli/",
  manage: "/ˈmænɪdʒ/",
  method: "/ˈmeθəd/",
  minute: "/ˈmɪnɪt/",
  natural: "/ˈnætʃrəl/",
  necessary: "/ˈnesəseri/",
  object: "/ˈɑːbdʒekt/",
  option: "/ˈɑːpʃn/",
  organization: "/ˌɔːrɡənəˈzeɪʃn/",
  passage: "/ˈpæsɪdʒ/",
  position: "/pəˈzɪʃn/",
  practice: "/ˈpræktɪs/",
  process: "/ˈprɑːses/",
  provide: "/prəˈvaɪd/",
  question: "/ˈkwestʃən/",
  recognize: "/ˈrekəɡnaɪz/",
  reference: "/ˈrefrəns/",
  relationship: "/rɪˈleɪʃnʃɪp/",
  require: "/rɪˈkwaɪər/",
  research: "/rɪˈsɜːrtʃ/",
  respond: "/rɪˈspɑːnd/",
  review: "/rɪˈvjuː/",
  section: "/ˈsekʃn/",
  selection: "/sɪˈlekʃn/",
  simple: "/ˈsɪmpl/",
  source: "/sɔːrs/",
  structure: "/ˈstrʌktʃər/",
  support: "/səˈpɔːrt/",
  system: "/ˈsɪstəm/",
  table: "/ˈteɪbl/",
  topic: "/ˈtɑːpɪk/",
  translate: "/trænzˈleɪt/",
  translation: "/trænzˈleɪʃn/",
  understand: "/ˌʌndərˈstænd/",
  useful: "/ˈjuːsfl/",
  usually: "/ˈjuːʒuəli/",
  version: "/ˈvɜːrʒn/",
  view: "/vjuː/",
  vocabulary: "/voʊˈkæbjəleri/",
  whole: "/hoʊl/",
  within: "/wɪˈðɪn/",
  real: "/ˈriːəl/",
  time: "/taɪm/",
  same: "/seɪm/",
  other: "/ˈʌðər/",
  hand: "/hænd/",
  become: "/bɪˈkʌm/",
  becomes: "/bɪˈkʌmz/",
  because: "/bɪˈkɔːz/",
  only: "/ˈoʊnli/",
  also: "/ˈɔːlsoʊ/",
  good: "/ɡʊd/",
  best: "/best/",
  not: "/nɑːt/",
  one: "/wʌn/",
  over: "/ˈoʊvər/",
  turn: "/tɜːrn/",
  sound: "/saʊnd/",
  text: "/tekst/",
};

for (const [word, ipa] of Object.entries(supplementalPhonetics)) {
  if (!phoneticDictionary.has(word)) phoneticDictionary.set(word, { us: ipa, uk: ipa });
}

const state = {
  docs: [],
  currentId: null,
  currentDoc: null,
  paragraphs: [],
  articleText: "",
  selectedText: "",
  selectionRange: null,
  voices: [],
  pdfjs: null,
  recognition: null,
  speechQueue: [],
  speechTimer: 0,
  isPaused: false,
  isPopoverPinned: false,
  isPopoverDocked: false,
  isPopoverCollapsed: false,
  isResizingPopover: false,
  popoverPosition: null,
  popoverDockTop: null,
  popoverDockSize: null,
  popoverResize: null,
  isDraggingPopover: false,
  dragOffset: { x: 0, y: 0 },
  isResizingSidebar: false,
  isResizingTopbar: false,
  workspaceResizeTarget: "",
  readingProgressTimer: 0,
  voiceProfile: null,
  cursorTranslateEnabled: true,
  mobileChromeHidden: false,
  dockCollapsed: false,
  shelfMode: true,
  coverDocId: "",
  hiddenPanels: {
    sidebar: false,
    topbar: false,
    toolbar: false,
    toc: true,
    aside: false,
  },
  suppressNextReaderClick: false,
  wordDrag: {
    active: false,
    pointerId: null,
    pointerTarget: null,
    anchor: null,
    current: null,
    startX: 0,
    startY: 0,
    moved: false,
    direction: "",
    range: null,
    text: "",
    previewWords: [],
  },
};

init();

function init() {
  loadPrefs();
  bindEvents();
  loadDocs();

  if (state.docs.length === 0) {
    const sampleDoc = makeDoc("示例文章", "DEMO", sampleText);
    state.docs.push(sampleDoc);
    state.currentId = sampleDoc.id;
    saveDocs();
  }

  renderDocList();
  enterShelfMode();
  loadVoices();
  updateSupportStatus();
  updateRangeLabel();
  refreshIcons();
  registerServiceWorker();
}

function bindEvents() {
  els.fileInput.addEventListener("change", async (event) => {
    await importFiles(event.target.files);
    event.target.value = "";
  });
  els.coverInput?.addEventListener("change", async (event) => {
    await applySelectedCover(event.target.files?.[0]);
    event.target.value = "";
  });

  ["dragenter", "dragover"].forEach((type) => {
    els.dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      els.dropZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((type) => {
    els.dropZone.addEventListener(type, (event) => {
      event.preventDefault();
      els.dropZone.classList.remove("dragging");
    });
  });

  els.dropZone.addEventListener("drop", async (event) => {
    await importFiles(event.dataTransfer.files);
  });

  els.sampleBtn.addEventListener("click", () => {
    const doc = makeDoc("示例文章", "DEMO", sampleText);
    state.docs.unshift(doc);
    state.currentId = doc.id;
    saveDocs();
    renderDocList();
    enterShelfMode();
    showToast("已加入示例文章");
  });

  els.clearLibraryBtn.addEventListener("click", () => {
    if (!confirm("清空当前书架？")) return;
    state.docs = [];
    state.currentId = null;
    state.currentDoc = null;
    state.paragraphs = [];
    state.articleText = "";
    state.selectedText = "";
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(OLD_STORAGE_KEY);
    hidePopover(true);
    renderDocList();
    renderEmptyReader();
    updateDocHeader();
    renderBookmarks();
    enterShelfMode();
  });

  els.toggleSidebarBtn.addEventListener("click", () => {
    els.libraryPane.classList.toggle("open");
  });
  els.closeSidebarBtn.addEventListener("click", () => {
    els.libraryPane.classList.remove("open");
  });
  els.hideSidebarBtn.addEventListener("click", () => setPanelHidden("sidebar", true, { announce: true }));
  els.topbarHideBtn.addEventListener("click", () => setPanelHidden("topbar", true, { announce: true }));
  els.topbarShowBtn.addEventListener("click", () => setMobileChromeHidden(false, { announce: true }));
  els.immersiveToggleBtn.addEventListener("click", enterImmersiveMode);
  els.toolbarHideBtn.addEventListener("click", () => setPanelHidden("toolbar", true, { announce: true }));
  els.hideTocBtn.addEventListener("click", () => setPanelHidden("toc", true, { announce: true }));
  els.hideAsideBtn.addEventListener("click", () => setPanelHidden("aside", true, { announce: true }));
  els.dockSidebarBtn.addEventListener("click", () => setPanelHidden("sidebar", false, { announce: true }));
  els.dockTopbarBtn.addEventListener("click", () => setPanelHidden("topbar", false, { announce: true }));
  els.dockToolbarBtn.addEventListener("click", () => setPanelHidden("toolbar", false, { announce: true }));
  els.dockTocBtn.addEventListener("click", () => setPanelHidden("toc", false, { announce: true }));
  els.dockAsideBtn.addEventListener("click", () => setPanelHidden("aside", false, { announce: true }));
  els.dockExitBtn.addEventListener("click", exitImmersiveMode);
  els.dockCollapseBtn?.addEventListener("click", () => {
    state.dockCollapsed = true;
    syncPanelVisibility();
    savePrefs();
  });
  els.dockShowBtn?.addEventListener("click", () => {
    state.dockCollapsed = false;
    syncPanelVisibility();
    savePrefs();
  });
  window.addEventListener("resize", () => {
    syncMobileChromeVisibility();
    if (state.isPopoverDocked && !els.selectionPopover.hidden) positionDockedPopover();
  });
  els.sidebarResizer.addEventListener("pointerdown", startSidebarResize);
  els.topbarResizer.addEventListener("pointerdown", startTopbarResize);
  els.tocResizer.addEventListener("pointerdown", (event) => startWorkspaceResize(event, "toc"));
  els.asideResizer.addEventListener("pointerdown", (event) => startWorkspaceResize(event, "aside"));
  document.addEventListener("pointermove", resizeSidebar);
  document.addEventListener("pointermove", resizeTopbar);
  document.addEventListener("pointermove", resizeWorkspacePane);
  document.addEventListener("pointermove", resizePopover);
  document.addEventListener("pointerup", stopSidebarResize);
  document.addEventListener("pointerup", stopTopbarResize);
  document.addEventListener("pointerup", stopWorkspaceResize);
  document.addEventListener("pointerup", stopPopoverResize);
  els.tocToggleBtn.addEventListener("click", () => {
    els.readerToc.hidden = !els.readerToc.hidden;
    els.tocToggleBtn.classList.toggle("active", !els.readerToc.hidden);
    state.hiddenPanels.toc = els.readerToc.hidden;
    syncPanelVisibility();
    savePrefs();
  });
  els.mobileImportBtn.addEventListener("click", () => els.fileInput.click());
  els.readingWidthRange.addEventListener("input", () => {
    setReaderWidth(els.readingWidthRange.value);
    savePrefs();
  });
  els.readingZoomRange.addEventListener("input", () => {
    setReadingZoom(els.readingZoomRange.value);
    savePrefs();
  });
  els.fontFamilySelect?.addEventListener("change", () => {
    setReaderFont(els.fontFamilySelect.value);
    savePrefs();
  });
  els.formatSelect?.addEventListener("change", () => {
    setReaderFormat(els.formatSelect.value);
    savePrefs();
  });
  els.fontSizeRange?.addEventListener("input", () => {
    setReadingZoom(els.fontSizeRange.value);
    savePrefs();
  });
  els.pageModeSelect?.addEventListener("change", () => {
    setPageMode(els.pageModeSelect.value);
    savePrefs();
  });

  els.readerContent.addEventListener("mouseup", () => {
    if (state.wordDrag.active || state.wordDrag.moved) return;
    window.setTimeout(captureSelection, 0);
  });
  els.readerContent.addEventListener("keyup", captureSelection);
  els.readerContent.addEventListener("pointerdown", startWordDrag);
  els.readerContent.addEventListener("pointermove", updateWordDrag);
  els.readerContent.addEventListener("click", handleReaderClick);
  els.readerContent.addEventListener("dblclick", handleReaderDoubleClick);
  els.readerContent.addEventListener("mousemove", handleCursorTranslate);
  els.readerContent.addEventListener("mouseleave", hideCursorTooltip);
  els.readerContent.addEventListener("scroll", () => {
    if (!state.isPopoverPinned && !state.isPopoverDocked) hidePopover();
    hideCursorTooltip();
    updateReadingProgress();
  });

  document.addEventListener("mousedown", (event) => {
    if (els.selectionPopover.contains(event.target) || els.readerContent.contains(event.target)) return;
    if (state.isPopoverPinned) return;
    hidePopover();
  });

  els.popoverDragHandle.addEventListener("pointerdown", startPopoverDrag);
  els.selectionPopover.addEventListener("pointerdown", startPopoverResize);
  document.addEventListener("pointermove", dragPopover);
  document.addEventListener("pointerup", stopPopoverDrag);
  document.addEventListener("pointerup", stopWordDrag);
  document.addEventListener("pointercancel", cancelWordDrag);
  els.dockPopoverBtn?.addEventListener("click", togglePopoverDock);
  els.collapsePopoverBtn?.addEventListener("click", togglePopoverCollapse);
  els.pinPopoverBtn.addEventListener("click", togglePopoverPin);
  els.closePopoverBtn.addEventListener("click", () => hidePopover(true));
  els.translatorSelect.addEventListener("change", () => {
    savePrefs();
    renderSelectionDetails({ autoTranslate: true });
  });
  els.translateSelectionBtn.addEventListener("click", translateSelectedText);
  els.readSelectionBtn.addEventListener("click", () => speakNatural(state.selectedText));
  els.bookmarkSelectionBtn.addEventListener("click", bookmarkSelectedText);
  els.boldSelectionBtn.addEventListener("click", boldSelectedText);
  document.addEventListener("click", handlePhoneticClick);

  els.speakArticleBtn.addEventListener("click", () => speakNatural(state.articleText));
  els.playUsVoiceBtn.addEventListener("click", () => playAccentSample("en-US"));
  els.playUkVoiceBtn.addEventListener("click", () => playAccentSample("en-GB"));
  els.pauseBtn.addEventListener("click", togglePause);
  els.stopBtn.addEventListener("click", stopSpeech);

  els.accentSelect.addEventListener("change", () => {
    populateVoiceSelect();
    savePrefs();
  });

  els.voiceSelect.addEventListener("change", savePrefs);
  els.voiceStyleSelect.addEventListener("change", savePrefs);
  els.rateRange.addEventListener("input", () => {
    updateRangeLabel();
    savePrefs();
  });

  els.bookmarkToggleBtn.addEventListener("click", () => {
    els.bookmarkDrawer.hidden = !els.bookmarkDrawer.hidden;
  });
  els.hideBookmarksBtn.addEventListener("click", () => {
    els.bookmarkDrawer.hidden = true;
  });
  els.cursorTranslateToggleBtn.addEventListener("click", () => {
    state.cursorTranslateEnabled = !state.cursorTranslateEnabled;
    updateCursorTranslateState();
    hideCursorTooltip();
    savePrefs();
  });

  els.clearBookmarksBtn.addEventListener("click", () => {
    if (!state.currentDoc) return;
    state.currentDoc.bookmarks = [];
    saveDocs();
    renderBookmarks();
    showToast("书签已清空");
  });

  els.voiceSampleInput.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await analyzeVoiceSample(file);
    event.target.value = "";
  });

  els.recordBtn.addEventListener("click", startRecording);
  els.recordStopBtn.addEventListener("click", stopRecording);
  els.scoreTypedBtn.addEventListener("click", () => scoreTranscript(els.transcriptInput.value));
  els.stopScoreBtn.addEventListener("click", () => {
    stopRecording();
    stopSpeech();
  });
  els.readPracticeBtn.addEventListener("click", readPracticeTarget);
  els.resetScoreBtn.addEventListener("click", () => {
    els.transcriptInput.value = "";
    els.scoreOutput.textContent = "";
  });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      if (!els.selectionPopover.hidden) savePrefs();
    });
    resizeObserver.observe(els.selectionPopover);
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }

  window.addEventListener("beforeunload", persistReadingProgressNow);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persistReadingProgressNow();
  });
}

async function importFiles(fileList) {
  const files = Array.from(fileList || []);
  if (files.length === 0) return;

  let imported = 0;
  for (const file of files) {
    try {
      showToast(`正在解析 ${file.name}`);
      const extracted = await extractTextFromFile(file);
      const ext = getExtension(file.name).toUpperCase() || "TEXT";
      const doc = makeDoc(stripExtension(file.name), ext, extracted);
      doc.size = file.size;
      state.docs.unshift(doc);
      state.currentId = doc.id;
      imported += 1;
    } catch (error) {
      console.error(error);
      showToast(`${file.name} 解析失败：${error.message}`);
    }
  }

  if (imported > 0) {
    saveDocs();
    renderDocList();
    enterShelfMode();
    showToast(`已导入 ${imported} 个文件`);
  }
}

function makeDoc(title, format, source) {
  const payload = typeof source === "string" ? { text: source } : source || { text: "" };
  const normalizedText = normalizeDocumentText(payload.text);
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    format,
    text: normalizedText,
    coverSrc: payload.coverSrc || "",
    images: Array.isArray(payload.images) ? payload.images.slice(0, 80) : [],
    pages: Array.isArray(payload.pages) ? payload.pages.slice(0, 160) : [],
    html: payload.html || "",
    pageCount: Number.isFinite(payload.pageCount) ? payload.pageCount : null,
    bookmarks: [],
    progress: null,
    addedAt: new Date().toISOString(),
    lastReadAt: "",
  };
}

function loadDocs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY) || "{}");
    state.docs = Array.isArray(saved.docs)
      ? saved.docs
          .filter((doc) => doc.text)
          .map((doc) => ({
            ...doc,
            bookmarks: Array.isArray(doc.bookmarks) ? doc.bookmarks : [],
            progress: doc.progress && typeof doc.progress === "object" ? doc.progress : null,
            coverSrc: doc.coverSrc || "",
            lastReadAt: doc.lastReadAt || doc.progress?.updatedAt || "",
          }))
      : [];
    state.currentId = saved.currentId || state.docs[0]?.id || null;
  } catch {
    state.docs = [];
    state.currentId = null;
  }
}

function saveDocs() {
  const docs = state.docs.map((doc) => ({
    ...doc,
    bookmarks: Array.isArray(doc.bookmarks) ? doc.bookmarks.slice(0, 200) : [],
    text: doc.text.length > MAX_STORED_TEXT ? doc.text.slice(0, MAX_STORED_TEXT) : doc.text,
    storedPreview: doc.text.length > MAX_STORED_TEXT,
    pages: Array.isArray(doc.pages) ? doc.pages.slice(0, 160) : [],
    images: Array.isArray(doc.images) ? doc.images.slice(0, 120) : [],
  }));

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ docs, currentId: state.currentId }));
  } catch {
    showToast("书架内容较大，本次可用，刷新后可能需要重新导入。");
  }
}

function loadPrefs() {
  try {
    const prefs = JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
    if (prefs.accent) els.accentSelect.value = prefs.accent;
    if (prefs.voiceStyle) els.voiceStyleSelect.value = prefs.voiceStyle;
    if (prefs.rate) els.rateRange.value = prefs.rate;
    if (prefs.voiceURI) els.voiceSelect.dataset.preferred = prefs.voiceURI;
    if (prefs.translator && prefs.translator !== "local") els.translatorSelect.value = prefs.translator;
    else els.translatorSelect.value = "google";
    if (prefs.readerWidth) {
      els.readingWidthRange.value = prefs.readerWidth;
      setReaderWidth(prefs.readerWidth);
    }
    if (prefs.readingZoom) {
      els.readingZoomRange.value = prefs.readingZoom;
      setReadingZoom(prefs.readingZoom);
    }
    if (prefs.readerFont) {
      els.fontFamilySelect.value = prefs.readerFont;
      setReaderFont(prefs.readerFont);
    }
    if (prefs.readerFormat) {
      els.formatSelect.value = prefs.readerFormat;
      setReaderFormat(prefs.readerFormat);
    }
    if (prefs.pageMode) {
      els.pageModeSelect.value = prefs.pageMode;
      setPageMode(prefs.pageMode);
    }
    if (prefs.sidebarWidth) setSidebarWidth(prefs.sidebarWidth);
    if (prefs.topbarHeight) setTopbarHeight(prefs.topbarHeight);
    if (prefs.tocWidth) setTocWidth(prefs.tocWidth);
    if (prefs.asideWidth) setAsideWidth(prefs.asideWidth);
    if (typeof prefs.popoverPinned === "boolean") state.isPopoverPinned = prefs.popoverPinned;
    if (typeof prefs.popoverDocked === "boolean") state.isPopoverDocked = prefs.popoverDocked;
    if (typeof prefs.popoverCollapsed === "boolean") state.isPopoverCollapsed = prefs.popoverCollapsed;
    if (typeof prefs.popoverDockTop === "number") state.popoverDockTop = prefs.popoverDockTop;
    if (prefs.popoverDockSize) state.popoverDockSize = prefs.popoverDockSize;
    if (state.isPopoverDocked) state.isPopoverPinned = true;
    if (typeof prefs.cursorTranslateEnabled === "boolean") state.cursorTranslateEnabled = prefs.cursorTranslateEnabled;
    if (typeof prefs.dockCollapsed === "boolean") state.dockCollapsed = prefs.dockCollapsed;
    if (prefs.hiddenPanels) {
      state.hiddenPanels = { ...state.hiddenPanels, ...prefs.hiddenPanels };
      syncPanelVisibility();
    }
    if (typeof prefs.mobileChromeHidden === "boolean") {
      setMobileChromeHidden(prefs.mobileChromeHidden, { persist: false });
    }
    if (prefs.popoverPosition) state.popoverPosition = prefs.popoverPosition;
    if (prefs.popoverSize) {
      els.selectionPopover.style.width = `${prefs.popoverSize.width}px`;
      els.selectionPopover.style.height = `${prefs.popoverSize.height}px`;
    }
    if (prefs.voiceProfile) {
      state.voiceProfile = prefs.voiceProfile;
      showVoiceProfile(prefs.voiceProfile, prefs.voiceProfileSummary || "已加载上次参考音频风格。");
    }
    updatePopoverModeState();
    updatePopoverPinState();
    updateCursorTranslateState();
  } catch {
    // Preferences are optional.
  }
}

function savePrefs() {
  localStorage.setItem(
    PREF_KEY,
    JSON.stringify({
      accent: els.accentSelect.value,
      voiceStyle: els.voiceStyleSelect.value,
      rate: els.rateRange.value,
      voiceURI: els.voiceSelect.value || els.voiceSelect.dataset.preferred || "",
      translator: els.translatorSelect.value,
      readerWidth: els.readingWidthRange.value,
      readingZoom: els.readingZoomRange.value,
      readerFont: els.fontFamilySelect?.value || "serif",
      readerFormat: els.formatSelect?.value || "comfortable",
      pageMode: els.pageModeSelect?.value || "scroll",
      sidebarWidth: getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width").trim(),
      topbarHeight: getComputedStyle(document.documentElement).getPropertyValue("--topbar-max-height").trim(),
      tocWidth: getComputedStyle(document.documentElement).getPropertyValue("--toc-width").trim(),
      asideWidth: getComputedStyle(document.documentElement).getPropertyValue("--aside-width").trim(),
      popoverPinned: state.isPopoverPinned,
      popoverDocked: state.isPopoverDocked,
      popoverCollapsed: state.isPopoverCollapsed,
      popoverDockTop: state.popoverDockTop,
      popoverDockSize: state.popoverDockSize,
      popoverPosition: state.popoverPosition,
      popoverSize: currentPopoverSize(),
      cursorTranslateEnabled: state.cursorTranslateEnabled,
      mobileChromeHidden: state.mobileChromeHidden,
      dockCollapsed: state.dockCollapsed,
      hiddenPanels: state.hiddenPanels,
      voiceProfile: state.voiceProfile,
      voiceProfileSummary: els.voiceProfile.hidden ? "" : els.voiceProfile.textContent,
    }),
  );
}

function setMobileChromeHidden(hidden, options = {}) {
  const { announce = false, persist = true } = options;
  state.mobileChromeHidden = Boolean(hidden);
  document.body.classList.toggle("mobile-reader-mode", state.mobileChromeHidden);
  state.hiddenPanels.topbar = state.mobileChromeHidden;
  state.hiddenPanels.toolbar = state.mobileChromeHidden;
  syncPanelVisibility();
  syncMobileChromeVisibility();
  if (announce) showToast(state.mobileChromeHidden ? "已隐藏顶部功能栏" : "已显示顶部功能栏");
  if (persist) savePrefs();
  window.setTimeout(updateReadingProgress, 80);
}

function syncMobileChromeVisibility() {
  const isMobile = window.matchMedia("(max-width: 820px)").matches;
  els.topbarShowBtn.hidden = !(isMobile && state.hiddenPanels.topbar);
}

function setPanelHidden(panel, hidden, options = {}) {
  const { announce = false, persist = true } = options;
  if (!(panel in state.hiddenPanels)) return;
  state.hiddenPanels[panel] = Boolean(hidden);
  if (panel === "topbar" || panel === "toolbar") {
    state.mobileChromeHidden = state.hiddenPanels.topbar && state.hiddenPanels.toolbar;
    document.body.classList.toggle("mobile-reader-mode", state.mobileChromeHidden);
  }
  syncPanelVisibility();
  if (announce) showToast(`${hidden ? "已隐藏" : "已显示"}${panelLabel(panel)}`);
  if (persist) savePrefs();
  window.setTimeout(updateReadingProgress, 80);
}

function enterImmersiveMode() {
  state.hiddenPanels = {
    sidebar: true,
    topbar: true,
    toolbar: true,
    toc: true,
    aside: true,
  };
  state.mobileChromeHidden = true;
  document.body.classList.add("mobile-reader-mode");
  syncPanelVisibility();
  savePrefs();
  showToast("已进入沉浸阅读");
  window.setTimeout(updateReadingProgress, 80);
}

function exitImmersiveMode() {
  state.hiddenPanels = {
    sidebar: false,
    topbar: false,
    toolbar: false,
    toc: true,
    aside: false,
  };
  state.mobileChromeHidden = false;
  document.body.classList.remove("mobile-reader-mode");
  syncPanelVisibility();
  savePrefs();
  showToast("已退出沉浸阅读");
  window.setTimeout(updateReadingProgress, 80);
}

function syncPanelVisibility() {
  const panels = state.hiddenPanels;
  document.body.classList.toggle("sidebar-hidden", panels.sidebar);
  document.body.classList.toggle("topbar-hidden", panels.topbar);
  document.body.classList.toggle("toolbar-hidden", panels.toolbar);
  document.body.classList.toggle("aside-hidden", panels.aside);
  els.readerToc.hidden = panels.toc;
  els.tocToggleBtn.classList.toggle("active", !els.readerToc.hidden);
  els.topbarHideBtn.setAttribute("aria-pressed", String(panels.topbar));
  els.immersiveToggleBtn.setAttribute("aria-pressed", String(Object.values(panels).every(Boolean)));
  els.topbarShowBtn.hidden = !panels.topbar;
  const dockNeeded = panels.sidebar || panels.topbar || panels.toolbar || panels.aside;
  els.readingDock.hidden = !dockNeeded || state.dockCollapsed;
  if (els.dockShowBtn) els.dockShowBtn.hidden = !dockNeeded || !state.dockCollapsed;
  syncMobileChromeVisibility();
}

function panelLabel(panel) {
  return {
    sidebar: "书架",
    topbar: "顶部功能栏",
    toolbar: "文章工具栏",
    toc: "目录",
    aside: "右侧记忆区",
  }[panel];
}

function enterShelfMode() {
  state.shelfMode = true;
  document.body.classList.add("shelf-mode");
  els.libraryPane.classList.remove("open");
  renderEmptyReader("从书架选择一本文章开始阅读。");
  updateDocHeader();
  hidePopover(true);
  stopSpeech();
}

function exitShelfMode() {
  state.shelfMode = false;
  document.body.classList.remove("shelf-mode");
}

function renderDocList() {
  els.docList.textContent = "";

  if (state.docs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "doc-card";
    empty.innerHTML = "<strong>暂无文件</strong><span>导入或打开示例文章</span>";
    els.docList.append(empty);
    return;
  }

  for (const doc of state.docs) {
    const card = document.createElement("article");
    card.className = `doc-card${doc.id === state.currentId ? " active" : ""}${doc.coverSrc ? " has-cover" : ""}`;
    if (doc.coverSrc) {
      card.style.backgroundImage = `linear-gradient(180deg, rgba(10, 18, 14, 0.16), rgba(10, 18, 14, 0.72)), url("${doc.coverSrc}")`;
    }

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "doc-open";
    openButton.innerHTML = `<strong>${escapeHtml(doc.title)}</strong><span>${escapeHtml(docListMeta(doc))}</span>`;
    openButton.addEventListener("click", () => {
      exitShelfMode();
      selectDoc(doc.id);
      els.libraryPane.classList.remove("open");
    });

    const actions = document.createElement("div");
    actions.className = "doc-card-actions";
    const renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.title = "重命名";
    renameButton.setAttribute("aria-label", "重命名文章");
    renameButton.innerHTML = `<i data-lucide="pencil"></i><span>重命名</span>`;
    renameButton.addEventListener("click", () => renameDoc(doc.id));

    const coverButton = document.createElement("button");
    coverButton.type = "button";
    coverButton.title = "选择封面";
    coverButton.setAttribute("aria-label", "选择封面");
    coverButton.innerHTML = `<i data-lucide="image"></i><span>封面</span>`;
    coverButton.addEventListener("click", () => {
      state.coverDocId = doc.id;
      els.coverInput?.click();
    });

    actions.append(renameButton, coverButton);
    card.append(openButton, actions);
    els.docList.append(card);
  }
  refreshIcons();
}

function renameDoc(id) {
  const doc = state.docs.find((item) => item.id === id);
  if (!doc) return;
  const nextTitle = prompt("输入新的文章名称", doc.title);
  const normalized = normalizeInlineText(nextTitle || "");
  if (!normalized || normalized === doc.title) return;
  doc.title = normalized.slice(0, 120);
  if (state.currentDoc?.id === doc.id) updateDocHeader();
  saveDocs();
  renderDocList();
  showToast("文章已重命名");
}

async function applySelectedCover(file) {
  const doc = state.docs.find((item) => item.id === state.coverDocId);
  state.coverDocId = "";
  if (!doc || !file) return;
  if (!file.type.startsWith("image/")) {
    showToast("请选择图片作为封面");
    return;
  }

  try {
    doc.coverSrc = await imageFileToDataUrl(file, 520, 760);
    saveDocs();
    renderDocList();
    showToast("封面已更新");
  } catch {
    showToast("封面读取失败，请换一张图片");
  }
}

function imageFileToDataUrl(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const width = Math.max(1, Math.round(image.width * ratio));
        const height = Math.max(1, Math.round(image.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function selectDoc(id) {
  exitShelfMode();
  if (state.currentDoc && state.currentId !== id) persistReadingProgressNow();
  const doc = state.docs.find((item) => item.id === id);
  if (!doc) {
    renderEmptyReader();
    updateDocHeader();
    renderBookmarks();
    return;
  }

  state.currentId = id;
  state.currentDoc = doc;
  state.paragraphs = splitParagraphs(doc.text);
  state.articleText = state.paragraphs.join("\n\n");
  state.selectedText = "";
  state.selectionRange = null;
  hidePopover(true);
  stopSpeech();
  saveDocs();
  renderDocList();
  renderReader();
  renderToc();
  updateDocHeader();
  renderBookmarks();
  restoreReadingProgress();
  updatePageStatus();
}

function docListMeta(doc) {
  const parts = [`${doc.format || "TEXT"}`, `${countWords(doc.text)} words`];
  const progress = doc.progress;
  if (progress) {
    const total = estimatedPageCountForDoc(doc);
    const page = clamp(Number(progress.page) || 1, 1, total);
    const percent = Number.isFinite(progress.percent) ? progress.percent : Math.round((Number(progress.scrollRatio) || 0) * 100);
    parts.push(`记忆 第 ${page}/${total} 页`);
    parts.push(`${clamp(percent, 0, 100)}%`);
  }
  return parts.join(" · ");
}

function estimatedPageCountForDoc(doc) {
  if (Number.isFinite(doc?.pageCount) && doc.pageCount > 0) return doc.pageCount;
  return Math.max(1, Math.ceil(splitParagraphs(doc?.text || "").length / 4));
}

function updateDocHeader() {
  if (!state.currentDoc) {
    els.docFormat.textContent = "APP";
    els.docTitle.textContent = "LinguaReader";
    els.docStats.textContent = "0 words";
    return;
  }

  els.docFormat.textContent = state.currentDoc.format || "TEXT";
  els.docTitle.textContent = state.currentDoc.title;
  els.docStats.textContent = `${countWords(state.articleText)} words · ${state.paragraphs.length} paragraphs · ${estimatedPageCount()} pages`;
}

function renderEmptyReader(message = "导入文件后开始阅读。") {
  els.readerContent.textContent = "";
  const empty = document.createElement("div");
  empty.className = "empty-reader";
  empty.textContent = message;
  els.readerContent.append(empty);
}

function renderReader() {
  els.readerContent.textContent = "";
  els.readerContent.classList.remove("original-layout", "html-layout");

  if (state.currentDoc?.pages?.length) {
    renderOriginalPages();
    return;
  }

  if (state.currentDoc?.html) {
    renderHtmlLayout();
    return;
  }

  if (state.paragraphs.length === 0) {
    renderEmptyReader();
    return;
  }

  const fragment = document.createDocumentFragment();
  appendDocumentImages(fragment);
  state.paragraphs.forEach((paragraph, paragraphIndex) => {
    const pageNumber = pageForParagraph(paragraphIndex);
    const previousPage = paragraphIndex > 0 ? pageForParagraph(paragraphIndex - 1) : 0;
    if (pageNumber !== previousPage) {
      const marker = document.createElement("div");
      marker.className = "page-marker";
      marker.textContent = `第 ${pageNumber} 页`;
      marker.dataset.page = String(pageNumber);
      fragment.append(marker);
    }

    const p = document.createElement("p");
    p.className = `paragraph${isLikelyHeading(paragraph) ? " paragraph-heading" : ""}`;
    p.dataset.index = String(paragraphIndex);
    p.dataset.page = String(pageNumber);

    for (const sentence of splitSentences(paragraph)) {
      const sentenceSpan = document.createElement("span");
      sentenceSpan.className = "sentence";
      appendWordNodes(sentenceSpan, sentence);
      p.append(sentenceSpan, document.createTextNode(" "));
    }

    fragment.append(p);
  });

  els.readerContent.append(fragment);
}

function renderOriginalPages() {
  els.readerContent.classList.add("original-layout");
  const fragment = document.createDocumentFragment();

  for (const page of state.currentDoc.pages) {
    const pageEl = document.createElement("section");
    pageEl.className = "original-page";
    pageEl.dataset.page = String(page.number);
    pageEl.style.aspectRatio = `${page.width || 1} / ${page.height || 1}`;

    const marker = document.createElement("div");
    marker.className = "page-marker";
    marker.textContent = `第 ${page.number} 页`;
    marker.dataset.page = String(page.number);
    fragment.append(marker);

    if (page.imageSrc) {
      const image = document.createElement("img");
      image.className = "original-page-image";
      image.src = page.imageSrc;
      image.alt = `第 ${page.number} 页原始版面`;
      image.loading = "lazy";
      pageEl.append(image);
    }

    const textLayer = document.createElement("div");
    textLayer.className = "pdf-text-layer";
    textLayer.setAttribute("aria-label", `第 ${page.number} 页文字层`);
    for (const item of page.items || []) {
      if (!normalizeInlineText(item.text)) continue;
      const span = document.createElement("span");
      span.className = "pdf-text-item";
      span.style.left = `${item.left}%`;
      span.style.top = `${item.top}%`;
      span.style.fontSize = `${item.fontSize}%`;
      span.style.width = `${item.width}%`;
      appendWordNodes(span, item.text);
      textLayer.append(span);
    }
    pageEl.append(textLayer);
    fragment.append(pageEl);
  }

  els.readerContent.append(fragment);
}

function renderHtmlLayout() {
  els.readerContent.classList.add("html-layout");
  const container = document.createElement("article");
  container.className = "original-html";
  container.innerHTML = state.currentDoc.html;
  container.querySelectorAll("script, iframe, object, embed").forEach((node) => node.remove());
  container.querySelectorAll("img").forEach((img) => {
    img.loading = "lazy";
    img.alt = img.alt || "文档图片";
  });
  els.readerContent.append(container);
}

function appendDocumentImages(fragment) {
  const images = state.currentDoc?.images || [];
  if (images.length === 0) return;

  const strip = document.createElement("section");
  strip.className = "document-images";
  for (const image of images) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt || "文档图片";
    img.loading = "lazy";
    figure.append(img);
    if (image.alt) {
      const caption = document.createElement("figcaption");
      caption.textContent = image.alt;
      figure.append(caption);
    }
    strip.append(figure);
  }
  fragment.append(strip);
}

function renderToc() {
  els.tocList.textContent = "";
  const entries = tocEntries();
  if (entries.length === 0) {
    const empty = document.createElement("div");
    empty.className = "toc-empty";
    empty.textContent = "当前文件没有可识别目录。";
    els.tocList.append(empty);
    return;
  }

  for (const entry of entries) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "toc-item";
    button.innerHTML = `<span>${escapeHtml(entry.label)}</span><small>第 ${entry.page} 页</small>`;
    button.addEventListener("click", () => scrollToParagraph(entry.index));
    els.tocList.append(button);
  }
}

function tocEntries() {
  if (state.currentDoc?.pages?.length) {
    return state.currentDoc.pages.map((page, index) => ({
      index,
      page: page.number,
      label: `第 ${page.number} 页 ${shorten(page.text || "", 42)}`,
    }));
  }
  const headings = state.paragraphs
    .map((paragraph, index) => ({ index, text: normalizeInlineText(paragraph), page: pageForParagraph(index) }))
    .filter((item, index) => index === 0 || isLikelyHeading(item.text))
    .slice(0, 80);

  if (headings.length > 1) return headings.map((item) => ({ ...item, label: shorten(item.text, 60) }));

  return state.paragraphs
    .map((paragraph, index) => ({ index, text: normalizeInlineText(paragraph), page: pageForParagraph(index) }))
    .filter((_, index) => index % 4 === 0)
    .slice(0, 80)
    .map((item) => ({ ...item, label: shorten(item.text, 60) || `位置 ${item.index + 1}` }));
}

function scrollToParagraph(index) {
  const page = state.currentDoc?.pages?.[index];
  if (page) {
    const pageEl = $(`.original-page[data-page="${page.number}"]`, els.readerContent);
    if (!pageEl) return;
    pageEl.scrollIntoView({ behavior: "smooth", block: "start" });
    pageEl.classList.add("jump-highlight");
    window.setTimeout(() => pageEl.classList.remove("jump-highlight"), 1200);
    updateReadingProgress();
    return;
  }
  const paragraph = $(`.paragraph[data-index="${index}"]`, els.readerContent);
  if (!paragraph) return;
  paragraph.scrollIntoView({ behavior: "smooth", block: "start" });
  paragraph.classList.add("jump-highlight");
  window.setTimeout(() => paragraph.classList.remove("jump-highlight"), 1200);
  updateReadingProgress();
}

function estimatedPageCount() {
  if (Number.isFinite(state.currentDoc?.pageCount) && state.currentDoc.pageCount > 0) return state.currentDoc.pageCount;
  return Math.max(1, Math.ceil(state.paragraphs.length / 4));
}

function pageForParagraph(index) {
  return Math.min(estimatedPageCount(), Math.floor(index / 4) + 1);
}

function updatePageStatus() {
  const page = currentPageNumber();
  const total = estimatedPageCount();
  const percent = readingPercent();
  els.pageStatus.textContent = `第 ${page} / ${total} 页`;
  els.readingMemory.textContent = `第 ${page} / ${total} 页 · ${percent}%`;
}

function currentPageNumber() {
  const contentRect = els.readerContent.getBoundingClientRect();
  const originalPages = $$(".original-page", els.readerContent);
  if (originalPages.length) {
    const currentPage = originalPages.find((page) => page.getBoundingClientRect().bottom > contentRect.top + 120);
    return Number(currentPage?.dataset.page || 1);
  }
  const paragraphs = $$(".paragraph", els.readerContent);
  const current = paragraphs.find((paragraph) => paragraph.getBoundingClientRect().bottom > contentRect.top + 80);
  return Number(current?.dataset.page || 1);
}

function updateReadingProgress() {
  updatePageStatus();
  if (!state.currentDoc) return;
  window.clearTimeout(state.readingProgressTimer);
  state.readingProgressTimer = window.setTimeout(persistReadingProgressNow, 220);
}

function persistReadingProgressNow() {
  if (!state.currentDoc || !els.readerContent) return;
  window.clearTimeout(state.readingProgressTimer);
  const maxScroll = Math.max(1, els.readerContent.scrollHeight - els.readerContent.clientHeight);
  const scrollTop = Math.round(els.readerContent.scrollTop);
  const scrollRatio = clamp(scrollTop / maxScroll, 0, 1);
  const firstVisible = firstVisibleParagraphIndex();
  const updatedAt = new Date().toISOString();
  state.currentDoc.progress = {
    scrollTop,
    scrollRatio: Number(scrollRatio.toFixed(4)),
    paragraphIndex: firstVisible,
    page: currentPageNumber(),
    percent: readingPercent(),
    updatedAt,
  };
  state.currentDoc.lastReadAt = updatedAt;
  saveDocs();
  renderDocList();
}

function readingPercent() {
  const maxScroll = Math.max(1, els.readerContent.scrollHeight - els.readerContent.clientHeight);
  return clamp(Math.round((els.readerContent.scrollTop / maxScroll) * 100), 0, 100);
}

function firstVisibleParagraphIndex() {
  const contentRect = els.readerContent.getBoundingClientRect();
  const originalPage = $$(".original-page", els.readerContent).find((item) => item.getBoundingClientRect().bottom > contentRect.top + 120);
  if (originalPage) return Number(originalPage.dataset.page || 1) - 1;
  const paragraph = $$(".paragraph", els.readerContent).find((item) => item.getBoundingClientRect().bottom > contentRect.top + 80);
  return Number(paragraph?.dataset.index || 0);
}

function restoreReadingProgress() {
  const progress = state.currentDoc?.progress;
  if (!progress) return;
  window.requestAnimationFrame(() => {
    const paragraph = Number.isFinite(progress.paragraphIndex)
      ? $(`.paragraph[data-index="${progress.paragraphIndex}"]`, els.readerContent)
      : null;
    const originalPage = Number.isFinite(progress.page) ? $(`.original-page[data-page="${progress.page}"]`, els.readerContent) : null;
    if (originalPage) originalPage.scrollIntoView({ block: "start" });
    else if (paragraph) paragraph.scrollIntoView({ block: "start" });
    else if (Number.isFinite(progress.scrollTop)) els.readerContent.scrollTop = progress.scrollTop;
    window.requestAnimationFrame(() => {
      if (!originalPage && !paragraph && Number.isFinite(progress.scrollRatio)) {
        const maxScroll = Math.max(1, els.readerContent.scrollHeight - els.readerContent.clientHeight);
        els.readerContent.scrollTop = Math.round(maxScroll * progress.scrollRatio);
      }
      updatePageStatus();
    });
  });
}

function appendWordNodes(parent, text) {
  const parts = text.split(/([A-Za-z]+(?:[-'][A-Za-z]+)?|\d+(?:[.,]\d+)?)/g);
  for (const part of parts) {
    if (!part) continue;
    if (/^(?:[A-Za-z]+(?:[-'][A-Za-z]+)?|\d+(?:[.,]\d+)?)$/.test(part)) {
      const word = document.createElement("span");
      word.className = "word";
      word.textContent = part;
      parent.append(word);
    } else {
      parent.append(document.createTextNode(part));
    }
  }
}

function startWordDrag(event) {
  if (event.pointerType === "mouse" && event.button !== 0) return;
  if (state.isDraggingPopover || state.isResizingSidebar || state.workspaceResizeTarget) return;
  const word = event.target.closest(".word");
  if (!word || !els.readerContent.contains(word)) return;

  state.wordDrag = {
    active: true,
    pointerId: event.pointerId,
    pointerTarget: word,
    anchor: word,
    current: word,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
    direction: "",
    range: null,
    text: "",
    previewWords: [],
  };
  els.readerContent.classList.add("word-dragging");
  word.setPointerCapture?.(event.pointerId);
  applyWordDragSelection(word, word);
  event.preventDefault();
}

function updateWordDrag(event) {
  const drag = state.wordDrag;
  if (!drag.active || event.pointerId !== drag.pointerId) return;
  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.moved && distance < 5) return;

  drag.moved = true;
  const word = wordFromPoint(event.clientX, event.clientY);
  if (!word || word === drag.current) return;

  drag.current = word;
  applyWordDragSelection(drag.anchor, word);
  event.preventDefault();
}

function stopWordDrag(event) {
  const drag = state.wordDrag;
  if (!drag.active || event.pointerId !== drag.pointerId) return;

  drag.pointerTarget?.releasePointerCapture?.(drag.pointerId);
  const range = drag.range?.cloneRange();
  const text = drag.text;
  resetWordDrag();
  state.suppressNextReaderClick = true;
  window.setTimeout(() => {
    state.suppressNextReaderClick = false;
  }, 250);

  if (range && text) {
    setSelection(range, text);
    showPopoverForRange(range);
  }
}

function cancelWordDrag(event) {
  const drag = state.wordDrag;
  if (!drag.active || event.pointerId !== drag.pointerId) return;
  drag.pointerTarget?.releasePointerCapture?.(drag.pointerId);
  resetWordDrag();
}

function resetWordDrag() {
  clearWordDragPreview();
  state.wordDrag = {
    active: false,
    pointerId: null,
    pointerTarget: null,
    anchor: null,
    current: null,
    startX: 0,
    startY: 0,
    moved: false,
    direction: "",
    range: null,
    text: "",
    previewWords: [],
  };
  els.readerContent.classList.remove("word-dragging");
}

function wordFromPoint(x, y) {
  const element = document.elementFromPoint(x, y);
  const word = element?.closest?.(".word");
  return word && els.readerContent.contains(word) ? word : null;
}

function applyWordDragSelection(anchor, current) {
  const range = buildWordDragRange(anchor, current);
  if (!range) return;
  const text = normalizeInlineText(range.toString());
  if (!text) return;

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  state.selectionRange = range.cloneRange();
  state.selectedText = text;
  state.wordDrag.range = range.cloneRange();
  state.wordDrag.text = text;
  paintWordDragPreview(range);
}

function paintWordDragPreview(range) {
  clearWordDragPreview();
  const previewWords = $$(".word", els.readerContent).filter((word) => {
    try {
      return range.intersectsNode(word);
    } catch {
      return false;
    }
  });
  previewWords.forEach((word) => word.classList.add("drag-preview"));
  state.wordDrag.previewWords = previewWords;
}

function clearWordDragPreview() {
  for (const word of state.wordDrag.previewWords || []) {
    word.classList.remove("drag-preview");
  }
}

function buildWordDragRange(anchor, current) {
  if (!anchor || !current || !els.readerContent.contains(anchor) || !els.readerContent.contains(current)) {
    return null;
  }

  const container = getSharedWordContainer(anchor, current);
  const words = $$(".word", container);
  const anchorIndex = words.indexOf(anchor);
  const currentIndex = words.indexOf(current);
  if (anchorIndex === -1 || currentIndex === -1) return null;

  const drag = state.wordDrag;
  if (!drag.direction && currentIndex !== anchorIndex) {
    drag.direction = currentIndex > anchorIndex ? "forward" : "backward";
  }

  let startIndex = anchorIndex;
  let endIndex = anchorIndex;
  if (drag.direction === "backward") {
    startIndex = Math.min(anchorIndex, currentIndex);
    endIndex = anchorIndex;
  } else {
    startIndex = anchorIndex;
    endIndex = Math.max(anchorIndex, currentIndex);
  }

  const range = document.createRange();
  range.setStartBefore(words[startIndex]);
  range.setEndAfter(words[endIndex]);
  return range;
}

function getSharedWordContainer(anchor, current) {
  const sentence = anchor.closest(".sentence");
  if (sentence?.contains(current)) return sentence;

  const paragraph = anchor.closest(".paragraph");
  if (paragraph?.contains(current)) return paragraph;

  const page = anchor.closest(".original-page");
  if (page?.contains(current)) return page;

  const html = anchor.closest(".original-html");
  if (html?.contains(current)) return html;

  return els.readerContent;
}

function handleReaderClick(event) {
  if (state.suppressNextReaderClick) {
    state.suppressNextReaderClick = false;
    return;
  }
  const currentSelection = getSelectionInsideReader();
  const word = event.target.closest(".word");
  if (!word || !els.readerContent.contains(word)) return;
  const wordText = normalizeInlineText(word.textContent);
  if (currentSelection && currentSelection.length > wordText.length) return;

  selectWordElement(word);
}

function selectWordElement(word) {
  const range = document.createRange();
  range.selectNodeContents(word);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  setSelection(range, word.textContent);
  showPopoverForRange(range);
}

function handleReaderDoubleClick(event) {
  const word = event.target.closest(".word");
  if (!word || !els.readerContent.contains(word)) return;
  event.preventDefault();

  const range = document.createRange();
  range.selectNodeContents(word);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  setSelection(range, word.textContent);
  showPopoverForRange(range);
  speakNatural(word.textContent);
}

function handleCursorTranslate(event) {
  if (!state.cursorTranslateEnabled) return;
  const word = event.target.closest(".word");
  if (!word || !els.readerContent.contains(word)) {
    hideCursorTooltip();
    return;
  }

  const text = normalizeInlineText(word.textContent);
  const token = tokenizeWords(text)[0];
  if (!token) {
    hideCursorTooltip();
    return;
  }

  const phonetic = getPhonetic(token);
  const meaning = getWordMeaning(token) || "本地词典暂未收录";
  els.cursorTooltip.hidden = false;
  els.cursorTooltip.innerHTML = `<strong>${escapeHtml(token)}</strong> ${escapeHtml(preferredPhonetic(phonetic))}<br>${escapeHtml(meaning)}`;
  const rect = els.cursorTooltip.getBoundingClientRect();
  const left = clamp(event.clientX + 14, 10, window.innerWidth - rect.width - 10);
  const top = clamp(event.clientY + 16, 10, window.innerHeight - rect.height - 10);
  els.cursorTooltip.style.left = `${left}px`;
  els.cursorTooltip.style.top = `${top}px`;
}

function hideCursorTooltip() {
  els.cursorTooltip.hidden = true;
}

function updateCursorTranslateState() {
  els.cursorTranslateToggleBtn.classList.toggle("active", state.cursorTranslateEnabled);
  els.cursorTranslateToggleBtn.setAttribute("aria-pressed", String(state.cursorTranslateEnabled));
}

function captureSelection() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return;
  }

  const text = getSelectionInsideReader();
  if (!text) return;

  const range = selection.getRangeAt(0).cloneRange();
  snapRangeToWordBoundaries(range);
  const snappedText = normalizeInlineText(range.toString());
  if (!snappedText) return;
  selection.removeAllRanges();
  selection.addRange(range);
  setSelection(range, snappedText);
  showPopoverForRange(range);
}

function getSelectionInsideReader() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return "";
  const anchorInside = els.readerContent.contains(selection.anchorNode);
  const focusInside = els.readerContent.contains(selection.focusNode);
  if (!anchorInside || !focusInside) return "";
  return normalizeInlineText(selection.toString());
}

function setSelection(range, text) {
  state.selectionRange = range.cloneRange();
  state.selectedText = normalizeInlineText(text);
  renderSelectionDetails({ autoTranslate: isSingleWord(state.selectedText) });
}

function snapRangeToWordBoundaries(range) {
  const startWord = closestWordNode(range.startContainer);
  const endWord = closestWordNode(range.endContainer);
  if (startWord && els.readerContent.contains(startWord)) {
    range.setStartBefore(startWord);
  }
  if (endWord && els.readerContent.contains(endWord)) {
    range.setEndAfter(endWord);
  }

  trimRangeToSelectedWords(range);
}

function trimRangeToSelectedWords(range) {
  const words = $$(".word", els.readerContent).filter((word) => {
    try {
      return range.intersectsNode(word);
    } catch {
      return false;
    }
  });
  if (words.length === 0) return;
  range.setStartBefore(words[0]);
  range.setEndAfter(words[words.length - 1]);
}

function closestWordNode(node) {
  if (!node) return null;
  const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  return element?.closest?.(".word") || null;
}

function showPopoverForRange(range) {
  if (!state.selectedText) return;
  els.selectionPopover.hidden = false;
  updatePopoverModeState();
  if (state.isPopoverDocked) {
    positionDockedPopover();
    return;
  }
  const popoverRect = els.selectionPopover.getBoundingClientRect();
  const margin = 12;

  if (state.isPopoverPinned) {
    const fallback = {
      x: window.innerWidth - popoverRect.width - 18,
      y: 92,
    };
    const position = state.popoverPosition || fallback;
    movePopoverTo(position.x, position.y);
    return;
  }

  const rect = range.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return;
  const left = clamp(rect.left + rect.width / 2 - popoverRect.width / 2, margin, window.innerWidth - popoverRect.width - margin);
  let top = rect.bottom + 12;
  const availableBelow = window.innerHeight - rect.bottom;
  if (availableBelow < popoverRect.height + 24) {
    top = rect.top - popoverRect.height - 12;
  }

  movePopoverTo(left, top);
}

function hidePopover(force = false) {
  if (state.isPopoverDocked && !force) return;
  if (state.isPopoverPinned && !force) return;
  els.selectionPopover.hidden = true;
}

function positionDockedPopover() {
  const bounds = dockedPopoverBounds();
  const availableHeight = Math.max(180, bounds.bottom - bounds.top);
  const maxWidth = Math.min(620, window.innerWidth - 24);
  const savedSize = state.popoverDockSize || {};
  const rect = els.selectionPopover.getBoundingClientRect();
  const width = clamp(savedSize.width || rect.width || 420, 300, maxWidth);
  const height = state.isPopoverCollapsed ? 220 : clamp(savedSize.height || rect.height || availableHeight, 260, availableHeight);
  const top = clamp(state.popoverDockTop ?? bounds.top, bounds.top, Math.max(bounds.top, bounds.bottom - height));

  els.selectionPopover.style.left = "";
  els.selectionPopover.style.right = "0px";
  els.selectionPopover.style.top = `${top}px`;
  els.selectionPopover.style.width = `${width}px`;
  els.selectionPopover.style.height = `${height}px`;
  state.popoverDockTop = top;
  state.popoverDockSize = { width: Math.round(width), height: Math.round(height) };
  state.popoverPosition = null;
}

function renderSelectionDetails({ autoTranslate = false } = {}) {
  const text = state.selectedText;
  const singleWord = isSingleWord(text);
  els.selectionKind.textContent = classifySelection(text);
  els.selectionPreview.textContent = shorten(text, 220);
  els.practiceTargetText.textContent = text || "选中文章中的一句或一段开始跟读。";
  els.translationOutput.classList.remove("show");
  els.translationOutput.textContent = "";
  els.transcriptInput.value = "";
  els.scoreOutput.textContent = "";

  if (singleWord) {
    const word = tokenizeWords(text)[0];
    const phonetic = getPhonetic(word);
    const meaning = getWordMeaning(word) || "本地词典暂未收录，可切换 Google 或百度查看在线释义。";
    els.wordCard.classList.add("show");
    els.wordCard.innerHTML = `
      <h4>${escapeHtml(word)}</h4>
      <button class="phonetic phonetic-sound" type="button" data-word="${escapeHtml(word)}" title="点击朗读 ${escapeHtml(word)}">
        US ${escapeHtml(phonetic.us)} · UK ${escapeHtml(phonetic.uk)}
      </button>
      <div class="meaning">${escapeHtml(meaning)}</div>
    `;
    els.phoneticList.classList.remove("show");
    els.phoneticList.textContent = "";
  } else {
    els.wordCard.classList.remove("show");
    els.wordCard.textContent = "";
    if (shouldShowSentencePhonetics(text)) {
      renderPhoneticList(text);
    } else {
      els.phoneticList.classList.remove("show");
      els.phoneticList.textContent = "";
    }
  }

  if ((autoTranslate || !singleWord) && text) {
    void translateSelectedText();
  }
}

function renderPhoneticList(text) {
  const words = unique(tokenizeWords(text)).slice(0, 18);
  if (words.length === 0) {
    els.phoneticList.classList.remove("show");
    els.phoneticList.textContent = "";
    return;
  }

  els.phoneticList.classList.add("show");
  els.phoneticList.innerHTML = `<strong>音标拆解</strong><br>${words
    .map((word) => {
      const phonetic = getPhonetic(word);
      return `<button class="phonetic-sound" type="button" data-word="${escapeHtml(word)}" title="点击朗读 ${escapeHtml(word)}">${escapeHtml(
        preferredPhonetic(phonetic),
      )}</button>`;
    })
    .join("")}`;
}

function shouldShowSentencePhonetics(text) {
  const normalized = normalizeInlineText(text);
  if (!normalized) return false;
  const words = countWords(normalized);
  if (words < 4 || words > 34) return false;
  return splitSentences(normalized).length === 1 && /[.!?]"?$/.test(normalized);
}

function handlePhoneticClick(event) {
  const target = event.target.closest(".phonetic-sound");
  if (!target) return;
  const word = target.dataset.word || normalizeInlineText(target.textContent);
  if (!word) return;
  event.preventDefault();
  event.stopPropagation();
  speakNatural(word);
}

function readPracticeTarget() {
  const text = normalizeInlineText(state.selectedText || els.practiceTargetText.textContent || "");
  if (!text || !/[A-Za-z]/.test(text)) {
    showToast("先选中一句或一段跟读内容。");
    return;
  }
  speakNatural(text);
}

function classifySelection(text) {
  const words = countWords(text);
  if (words <= 1) return "单词";
  if (words <= 5 && !/[.!?]"?$/.test(text)) return "词组";
  if (words >= 35) return "段落";
  return "句子";
}

function isSingleWord(text) {
  return tokenizeWords(text).length === 1 && /^[A-Za-z]+(?:[-'][A-Za-z]+)?$/.test(text.trim());
}

function getPhonetic(word) {
  const lower = word.toLowerCase();
  const known = phoneticDictionary.get(lower);
  if (known) return known;
  const lemma = candidateLemmas(lower).find((item) => phoneticDictionary.has(item));
  if (lemma) return phoneticDictionary.get(lemma);
  const fallback = `/${lower.replace(/[^a-z'-]/g, "")}/`;
  return { us: fallback, uk: fallback };
}

function getWordMeaning(word) {
  const lower = String(word || "").toLowerCase();
  if (!lower) return "";
  const direct = wordDictionary.get(lower);
  if (direct) return direct;

  for (const lemma of candidateLemmas(lower)) {
    const meaning = wordDictionary.get(lemma);
    if (meaning) return `${meaning}（原形 ${lemma}）`;
  }
  return "";
}

function candidateLemmas(word) {
  const candidates = new Set();
  if (word.endsWith("ies") && word.length > 4) candidates.add(`${word.slice(0, -3)}y`);
  if (word.endsWith("ves") && word.length > 4) candidates.add(`${word.slice(0, -3)}f`);
  if (word.endsWith("ing") && word.length > 5) {
    candidates.add(word.slice(0, -3));
    candidates.add(`${word.slice(0, -3)}e`);
  }
  if (word.endsWith("ed") && word.length > 4) {
    candidates.add(word.slice(0, -2));
    candidates.add(`${word.slice(0, -1)}`);
  }
  if (word.endsWith("ly") && word.length > 4) candidates.add(word.slice(0, -2));
  if (word.endsWith("es") && word.length > 4) candidates.add(word.slice(0, -2));
  if (word.endsWith("s") && word.length > 3) candidates.add(word.slice(0, -1));
  if (word.endsWith("er") && word.length > 4) candidates.add(word.slice(0, -2));
  if (word.endsWith("est") && word.length > 5) candidates.add(word.slice(0, -3));
  return Array.from(candidates).filter((item) => item && item !== word);
}

function preferredPhonetic(phonetic) {
  return els.accentSelect.value === "en-GB" ? phonetic.uk : phonetic.us;
}

async function makeExternalTranslation(provider, text) {
  const encoded = encodeURIComponent(text);
  const url =
    provider === "baidu"
      ? `https://fanyi.baidu.com/#en/zh/${encoded}`
      : `https://translate.google.com/?sl=en&tl=zh-CN&text=${encoded}&op=translate`;
  const label = provider === "baidu" ? "百度翻译" : "Google 翻译";
  if (provider === "google") {
    const direct = await tryGoogleTranslate(text);
    if (direct) {
      return `
        <div class="external-translation">
          <strong>Google 翻译</strong>
          <p>${escapeHtml(direct)}</p>
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">在官方页面核对</a>
        </div>
      `;
    }
  }

  return `
    <div class="external-translation">
      <strong>${escapeHtml(label)} 内嵌预览</strong>
      <p>已在浮标内打开官方翻译页。若浏览器拦截内嵌页面，可使用下方核对链接。</p>
      <iframe title="${escapeHtml(label)}" src="${escapeHtml(url)}" loading="lazy" referrerpolicy="no-referrer"></iframe>
      <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">在官方页面核对</a>
    </div>
  `;
}

async function tryGoogleTranslate(text) {
  try {
    const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    if (!response.ok) return "";
    const data = await response.json();
    return (data?.[0] || []).map((part) => part?.[0]).filter(Boolean).join("");
  } catch {
    return "";
  }
}

function startSidebarResize(event) {
  event.preventDefault();
  state.isResizingSidebar = true;
  els.sidebarResizer.setPointerCapture?.(event.pointerId);
  document.body.classList.add("resizing-sidebar");
}

function resizeSidebar(event) {
  if (!state.isResizingSidebar) return;
  const width = clamp(event.clientX, 236, 480);
  setSidebarWidth(`${width}px`);
}

function stopSidebarResize() {
  if (!state.isResizingSidebar) return;
  state.isResizingSidebar = false;
  document.body.classList.remove("resizing-sidebar");
  savePrefs();
}

function startTopbarResize(event) {
  event.preventDefault();
  state.isResizingTopbar = true;
  els.topbarResizer.setPointerCapture?.(event.pointerId);
  document.body.classList.add("resizing-topbar");
}

function resizeTopbar(event) {
  if (!state.isResizingTopbar) return;
  const top = els.readerTopbar?.getBoundingClientRect?.().top ?? 0;
  setTopbarHeight(`${clamp(event.clientY - top, 58, 260)}px`);
}

function stopTopbarResize() {
  if (!state.isResizingTopbar) return;
  state.isResizingTopbar = false;
  document.body.classList.remove("resizing-topbar");
  savePrefs();
}

function startWorkspaceResize(event, target) {
  event.preventDefault();
  state.workspaceResizeTarget = target;
  document.body.classList.add("resizing-pane");
}

function resizeWorkspacePane(event) {
  if (!state.workspaceResizeTarget) return;
  const workspace = $(".reader-workspace");
  const rect = workspace.getBoundingClientRect();
  if (state.workspaceResizeTarget === "toc") {
    setTocWidth(`${clamp(event.clientX - rect.left, 180, 420)}px`);
  } else {
    setAsideWidth(`${clamp(rect.right - event.clientX, 220, 520)}px`);
  }
}

function stopWorkspaceResize() {
  if (!state.workspaceResizeTarget) return;
  state.workspaceResizeTarget = "";
  document.body.classList.remove("resizing-pane");
  savePrefs();
}

function setSidebarWidth(value) {
  const width = clamp(parseInt(value, 10) || 292, 236, 480);
  document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
}

function setTopbarHeight(value) {
  const height = clamp(parseInt(value, 10) || 152, 58, 260);
  document.documentElement.style.setProperty("--topbar-max-height", `${height}px`);
}

function setReaderWidth(value) {
  const width = clamp(parseInt(value, 10) || 880, 680, 1180);
  document.documentElement.style.setProperty("--reader-width", `${width}px`);
  els.readingWidthRange.value = String(width);
  updateReaderZoomWidth();
}

function setReadingZoom(value) {
  const zoom = clamp(parseInt(value, 10) || 100, 80, 150);
  document.documentElement.style.setProperty("--reading-zoom", `${zoom / 100}`);
  document.documentElement.style.setProperty("--paragraph-font-size", `${(20 * zoom) / 100}px`);
  document.documentElement.style.setProperty("--heading-font-size", `${(26 * zoom) / 100}px`);
  document.documentElement.style.setProperty("--html-font-size", `${(18 * zoom) / 100}px`);
  els.readingZoomRange.value = String(zoom);
  els.readingZoomValue.textContent = `${zoom}%`;
  if (els.fontSizeRange) els.fontSizeRange.value = String(zoom);
  if (els.fontSizeValue) els.fontSizeValue.textContent = `${zoom}%`;
  updateReaderZoomWidth();
}

function updateReaderZoomWidth() {
  const width = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--reader-width"), 10) || 880;
  const zoom = parseInt(els.readingZoomRange?.value, 10) || 100;
  document.documentElement.style.setProperty("--reader-zoom-width", `${Math.round((width * zoom) / 100)}px`);
}

function setReaderFont(value) {
  const fontMap = {
    serif: 'Georgia, "Times New Roman", "Microsoft YaHei", serif',
    sans: 'Inter, ui-sans-serif, system-ui, "Microsoft YaHei", sans-serif',
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif',
  };
  const next = fontMap[value] || fontMap.serif;
  document.documentElement.style.setProperty("--reader-font-family", next);
  if (els.fontFamilySelect) els.fontFamilySelect.value = value in fontMap ? value : "serif";
}

function setReaderFormat(value) {
  const presets = {
    compact: { line: 1.65, paragraph: "16px" },
    comfortable: { line: 1.9, paragraph: "24px" },
    loose: { line: 2.12, paragraph: "32px" },
  };
  const preset = presets[value] || presets.comfortable;
  document.documentElement.style.setProperty("--reader-line-height", String(preset.line));
  document.documentElement.style.setProperty("--reader-paragraph-gap", preset.paragraph);
  if (els.formatSelect) els.formatSelect.value = value in presets ? value : "comfortable";
}

function setPageMode(value) {
  const mode = value === "snap" ? "snap" : "scroll";
  document.body.classList.toggle("page-snap-mode", mode === "snap");
  if (els.pageModeSelect) els.pageModeSelect.value = mode;
}

function setTocWidth(value) {
  const width = clamp(parseInt(value, 10) || 260, 180, 420);
  document.documentElement.style.setProperty("--toc-width", `${width}px`);
}

function setAsideWidth(value) {
  const width = clamp(parseInt(value, 10) || 280, 220, 520);
  document.documentElement.style.setProperty("--aside-width", `${width}px`);
}

function dockedPopoverBounds() {
  const margin = 12;
  let top = margin;
  for (const selector of [".reader-topbar", ".reader-toolbar"]) {
    const element = $(selector);
    if (!element || element.hidden || getComputedStyle(element).display === "none") continue;
    top = Math.max(top, element.getBoundingClientRect().bottom + 8);
  }

  let bottom = window.innerHeight - margin;
  if (els.readingDock && !els.readingDock.hidden && getComputedStyle(els.readingDock).display !== "none") {
    bottom = Math.min(bottom, els.readingDock.getBoundingClientRect().top - 8);
  }
  if (els.topbarShowBtn && !els.topbarShowBtn.hidden && getComputedStyle(els.topbarShowBtn).display !== "none") {
    const rect = els.topbarShowBtn.getBoundingClientRect();
    top = Math.max(top, rect.bottom + 8);
  }
  if (bottom - top < 220) {
    top = margin;
    bottom = window.innerHeight - margin;
  }
  return { top, bottom };
}

function setDockedPopoverTop(top) {
  const bounds = dockedPopoverBounds();
  const rect = els.selectionPopover.getBoundingClientRect();
  const height = Math.min(rect.height || 220, bounds.bottom - bounds.top);
  const nextTop = clamp(top, bounds.top, Math.max(bounds.top, bounds.bottom - height));
  els.selectionPopover.style.top = `${nextTop}px`;
  state.popoverDockTop = nextTop;
}

function startPopoverResize(event) {
  const handle = event.target.closest("[data-popover-resize]");
  if (!handle || !els.selectionPopover.contains(handle) || els.selectionPopover.hidden) return;
  event.preventDefault();
  event.stopPropagation();

  const rect = els.selectionPopover.getBoundingClientRect();
  state.isResizingPopover = true;
  state.popoverResize = {
    corner: handle.dataset.popoverResize,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
  handle.setPointerCapture?.(event.pointerId);
  document.body.classList.add("resizing-popover");
}

function resizePopover(event) {
  const resize = state.popoverResize;
  if (!state.isResizingPopover || !resize || event.pointerId !== resize.pointerId) return;
  const dx = event.clientX - resize.startX;
  const dy = event.clientY - resize.startY;
  const corner = resize.corner || "";
  let width = resize.width;
  let height = resize.height;
  let left = resize.left;
  let top = resize.top;

  if (corner.includes("e")) width = resize.width + dx;
  if (corner.includes("w")) width = resize.width - dx;
  if (corner.includes("s")) height = resize.height + dy;
  if (corner.includes("n")) height = resize.height - dy;

  if (state.isPopoverDocked) {
    const bounds = dockedPopoverBounds();
    const maxWidth = Math.min(640, window.innerWidth - 24);
    width = clamp(width, 300, maxWidth);
    height = clamp(height, state.isPopoverCollapsed ? 180 : 240, Math.max(180, bounds.bottom - bounds.top));
    if (corner.includes("n")) top = resize.top + resize.height - height;
    top = clamp(top, bounds.top, Math.max(bounds.top, bounds.bottom - height));
    els.selectionPopover.style.right = "0px";
    els.selectionPopover.style.left = "";
    els.selectionPopover.style.width = `${width}px`;
    els.selectionPopover.style.height = `${height}px`;
    els.selectionPopover.style.top = `${top}px`;
    state.popoverDockTop = top;
    state.popoverDockSize = { width: Math.round(width), height: Math.round(height) };
    return;
  }

  const maxWidth = window.innerWidth - 24;
  const maxHeight = window.innerHeight - 24;
  width = clamp(width, 320, maxWidth);
  height = clamp(height, 260, maxHeight);
  if (corner.includes("w")) left = resize.left + resize.width - width;
  if (corner.includes("n")) top = resize.top + resize.height - height;
  left = clamp(left, 12, window.innerWidth - width - 12);
  top = clamp(top, 12, window.innerHeight - height - 12);
  els.selectionPopover.style.left = `${left}px`;
  els.selectionPopover.style.top = `${top}px`;
  els.selectionPopover.style.width = `${width}px`;
  els.selectionPopover.style.height = `${height}px`;
  state.popoverPosition = { x: left, y: top };
}

function stopPopoverResize() {
  if (!state.isResizingPopover) return;
  state.isResizingPopover = false;
  document.body.classList.remove("resizing-popover");
  state.popoverResize = null;
  if (state.isPopoverDocked) {
    state.popoverDockSize = currentPopoverSize();
    state.popoverDockTop = els.selectionPopover.getBoundingClientRect().top;
  }
  savePrefs();
}

function startPopoverDrag(event) {
  if (event.target.closest("button, select, input, label")) return;
  if (els.selectionPopover.hidden) return;
  if (state.isResizingPopover) return;

  const rect = els.selectionPopover.getBoundingClientRect();
  state.isDraggingPopover = true;
  state.dragOffset = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  els.popoverDragHandle.setPointerCapture?.(event.pointerId);
}

function dragPopover(event) {
  if (!state.isDraggingPopover) return;
  if (state.isPopoverDocked) {
    setDockedPopoverTop(event.clientY - state.dragOffset.y);
    return;
  }
  const x = event.clientX - state.dragOffset.x;
  const y = event.clientY - state.dragOffset.y;
  movePopoverTo(x, y);
}

function stopPopoverDrag() {
  if (!state.isDraggingPopover) return;
  state.isDraggingPopover = false;
  const rect = els.selectionPopover.getBoundingClientRect();
  if (state.isPopoverDocked) {
    state.popoverDockTop = rect.top;
    state.popoverDockSize = currentPopoverSize();
  } else {
    state.popoverPosition = { x: rect.left, y: rect.top };
  }
  savePrefs();
}

function movePopoverTo(x, y) {
  const rect = els.selectionPopover.getBoundingClientRect();
  const margin = 12;
  const left = clamp(x, margin, window.innerWidth - rect.width - margin);
  const top = clamp(y, margin, window.innerHeight - rect.height - margin);
  els.selectionPopover.style.left = `${left}px`;
  els.selectionPopover.style.top = `${top}px`;
  state.popoverPosition = { x: left, y: top };
}

function currentPopoverSize() {
  const rect = els.selectionPopover.getBoundingClientRect();
  if (!rect.width || !rect.height) {
    const width = parseFloat(els.selectionPopover.style.width);
    const height = parseFloat(els.selectionPopover.style.height);
    return width && height ? { width: Math.round(width), height: Math.round(height) } : null;
  }
  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

function togglePopoverPin() {
  state.isPopoverPinned = !state.isPopoverPinned;
  if (state.isPopoverPinned && !state.popoverPosition && !els.selectionPopover.hidden) {
    const rect = els.selectionPopover.getBoundingClientRect();
    state.popoverPosition = { x: rect.left, y: rect.top };
  }
  updatePopoverPinState();
  savePrefs();
}

function updatePopoverPinState() {
  els.selectionPopover.classList.toggle("pinned", state.isPopoverPinned);
  els.pinPopoverBtn?.setAttribute("aria-pressed", String(state.isPopoverPinned));
  if (els.popoverHint) {
    if (state.isPopoverDocked) {
      els.popoverHint.textContent = state.isPopoverCollapsed ? "右侧已收起，点击展开后继续翻译/评分" : "已固定在右侧，可拖右下角调整大小";
    } else {
      els.popoverHint.textContent = state.isPopoverPinned ? "已固定，可拖动调整位置，右下角调大小" : "拖动标题移动，右下角调大小";
    }
  }
}

function togglePopoverDock() {
  state.isPopoverDocked = !state.isPopoverDocked;
  if (state.isPopoverDocked) {
    state.isPopoverPinned = true;
    state.isPopoverCollapsed = false;
    els.selectionPopover.hidden = false;
    positionDockedPopover();
  }
  updatePopoverModeState();
  updatePopoverPinState();
  savePrefs();
}

function togglePopoverCollapse() {
  if (!state.isPopoverDocked) {
    state.isPopoverDocked = true;
    state.isPopoverPinned = true;
    positionDockedPopover();
  }
  state.isPopoverCollapsed = !state.isPopoverCollapsed;
  els.selectionPopover.hidden = false;
  updatePopoverModeState();
  updatePopoverPinState();
  savePrefs();
}

function updatePopoverModeState() {
  els.selectionPopover.classList.toggle("docked-right", state.isPopoverDocked);
  els.selectionPopover.classList.toggle("collapsed", state.isPopoverDocked && state.isPopoverCollapsed);
  els.dockPopoverBtn?.setAttribute("aria-pressed", String(state.isPopoverDocked));
  els.collapsePopoverBtn?.setAttribute("aria-pressed", String(state.isPopoverCollapsed));
  if (state.isPopoverDocked) positionDockedPopover();
}

async function translateSelectedText() {
  if (!state.selectedText) return;
  els.translationOutput.classList.add("show");
  const provider = els.translatorSelect.value;

  if (provider === "local") {
    els.translationOutput.textContent = makeLocalTranslation(state.selectedText);
    return;
  }

  els.translationOutput.innerHTML = "正在连接在线翻译...";
  els.translationOutput.innerHTML = await makeExternalTranslation(provider, state.selectedText);
}

async function tryBuiltInTranslate(text) {
  try {
    if ("Translator" in window && typeof window.Translator.create === "function") {
      const translator = await window.Translator.create({ sourceLanguage: "en", targetLanguage: "zh-Hans" });
      return await translator.translate(text);
    }
  } catch {
    // Browser translation APIs are experimental and may be unavailable.
  }
  return "";
}

function makeLocalTranslation(text) {
  const words = tokenizeWords(text);
  if (words.length === 0) return "未识别到英文内容。";

  const pairs = unique(words)
    .slice(0, 14)
    .map((word) => {
      const meaning = getWordMeaning(word);
      return meaning ? `${word}: ${meaning}` : "";
    })
    .filter(Boolean);

  if (words.length === 1) {
    return pairs[0] || `${words[0]}: 暂无本地词典释义，可结合上下文理解或接入在线翻译。`;
  }

  const draft = localDraftTranslate(text);
  const analysis = analyzeSentenceStructure(text);
  return [
    draft ? `连贯译文：${draft}` : "连贯译文：本地词典覆盖有限，请切换 Google 或百度查看完整译文。",
    analysis,
  ]
    .filter(Boolean)
    .join("\n");
}

function analyzeSentenceStructure(text) {
  const sentence = normalizeInlineText(text).replace(/^["'“”]+|["'“”]+$/g, "");
  const words = sentence.match(/[A-Za-z]+(?:[-'][A-Za-z]+)?|[,.;:!?]/g) || [];
  const lowerWords = words.map((word) => word.toLowerCase());
  const verbIndex = findVerbIndex(lowerWords);
  if (verbIndex <= 0) {
    return `句子解析：未识别到完整主谓结构，可按短语理解。核心词：${keywordList(sentence).slice(0, 6).join(" / ") || sentence}`;
  }

  const subject = words.slice(0, verbIndex).join(" ");
  const predicateEnd = findPredicateEnd(lowerWords, verbIndex);
  const predicate = words.slice(verbIndex, predicateEnd).join(" ");
  const rest = words.slice(predicateEnd).join(" ").replace(/\s+([,.;:!?])/g, "$1");
  const modifier = extractModifier(rest);

  return [
    "句子解析：",
    `主语：${subject}`,
    `谓语：${predicate}`,
    rest ? `宾语/表语/补足语：${rest}` : "",
    modifier ? `修饰或从句：${modifier}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function findVerbIndex(words) {
  const verbs = new Set([
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "learn",
    "learns",
    "read",
    "reads",
    "grows",
    "grow",
    "gives",
    "give",
    "notice",
    "discovers",
    "discover",
    "becomes",
    "become",
    "remember",
    "make",
    "makes",
    "listen",
    "repeat",
    "compare",
    "build",
    "turns",
    "turn",
  ]);
  return words.findIndex((word, index) => index > 0 && (verbs.has(word) || /(?:ed|ing|s)$/.test(word)));
}

function findPredicateEnd(words, verbIndex) {
  let end = verbIndex + 1;
  const particles = new Set(["not", "also", "only", "to", "be", "been", "being", "have", "has", "had"]);
  while (end < words.length && end < verbIndex + 4 && particles.has(words[end])) end += 1;
  return end;
}

function extractModifier(rest) {
  const match = rest.match(/\b(when|because|that|which|who|where|if|with|by|in|on|at|for|from|into)\b.+/i);
  return match ? match[0] : "";
}

function localDraftTranslate(text) {
  const normalized = normalizeInlineText(text);
  const lower = normalized.toLowerCase();
  const coherent = localCoherentDraft(normalized);
  if (coherent) return coherent;
  const phraseMap = [
    [/the hidden value of slow reading/i, "慢读的隐藏价值"],
    [/most people learn a language by collecting words/i, "大多数人通过积累单词来学习一门语言"],
    [/real confidence grows/i, "真正的信心会逐渐建立起来"],
    [/inside a living sentence/i, "在鲜活的句子里"],
    [/slow reading gives the learner enough time/i, "慢读给学习者足够的时间"],
    [/notice rhythm, grammar, and emotion/i, "注意节奏、语法和情感"],
    [/your mouth discovers patterns/i, "你的口腔会发现发音规律"],
    [/a phrase like "on the other hand"/i, "像 “on the other hand” 这样的短语"],
    [/good pronunciation is not only about isolated sounds/i, "好的发音不只是孤立音素的问题"],
    [/stress, linking, and the movement of meaning/i, "重音、连读和意义的推进"],
    [/technology can make this practice more personal/i, "技术可以让这种练习更个性化"],
    [/listen to a sentence in different voices/i, "用不同音色听同一个句子"],
    [/compare the spoken result with the original text/i, "把说出的结果和原文比较"],
    [/the best feedback is specific/i, "最好的反馈应该是具体的"],
    [/the goal is not to sound perfect/i, "目标不是一次就说得完美"],
    [/build a small daily loop/i, "建立一个小的每日循环"],
    [/reading into conversation and conversation into memory/i, "把阅读变成对话，再把对话变成记忆"],
  ];

  const hits = phraseMap.filter(([pattern]) => pattern.test(normalized)).map(([, zh]) => zh);
  if (hits.length > 0) return `${hits.join("，")}。`;

  if (/\bnot only\b.+\bbut also\b/i.test(lower)) {
    return "这句话表达“不仅……而且……”，重点在后半部分的补充强调。";
  }
  if (/\bbecause\b/i.test(lower)) {
    return "这句话先说明结果，再用 because 补充原因。";
  }
  if (/\bwhen\b/i.test(lower)) {
    return "这句话表示“当……时”，后面说明发生的动作或结果。";
  }

  const translatedWords = wordsForDraft(normalized)
    .slice(0, 14)
    .map((word) => getWordMeaning(word) || word);
  return translatedWords.length ? `${translatedWords.join(" / ")}。` : "";
}

function wordsForDraft(text) {
  return tokenizeWords(text).filter((word) => word.length > 2 && !stopWords.has(word));
}

function localCoherentDraft(text) {
  const normalized = normalizeInlineText(text);
  if (!normalized || countWords(normalized) <= 1) return "";

  const sentences = splitSentences(normalized);
  if (sentences.length > 1) {
    return sentences.map((sentence) => localCoherentDraft(sentence) || translateClauseKeywords(sentence)).filter(Boolean).join(" ");
  }

  const phraseMap = [
    [/the hidden value of slow reading/i, "慢读的隐藏价值。"],
    [/most people learn a language by collecting words/i, "大多数人通过积累单词来学习一门语言。"],
    [/real confidence grows/i, "真正的信心会逐渐建立起来。"],
    [/inside a living sentence/i, "在鲜活的句子里理解语言。"],
    [/technology can make this practice more personal/i, "技术可以让这种练习更个性化。"],
    [/compare the spoken result with the original text/i, "把说出的结果和原文进行比较。"],
    [/the best feedback is specific/i, "最好的反馈应该是具体的。"],
    [/build a small daily loop/i, "建立一个小的每日练习循环。"],
  ];
  const hits = phraseMap.filter(([pattern]) => pattern.test(normalized)).map(([, value]) => value);
  if (hits.length) return hits.join("");

  const goalMatch = normalized.match(/\bthe goal is not to (.+?)\.?\s*(?:the goal is to (.+))?$/i);
  if (goalMatch) {
    const first = translateClauseKeywords(goalMatch[1]);
    const second = goalMatch[2] ? translateClauseKeywords(goalMatch[2]) : "";
    return second ? `目标不是${first}，而是${second}。` : `目标不是${first}。`;
  }

  const whenMatch = normalized.match(/^when you (.+?),\s*(.+)$/i);
  if (whenMatch) return `当你${translateClauseKeywords(whenMatch[1])}时，${translateClauseKeywords(whenMatch[2])}。`;

  const becauseMatch = normalized.match(/^(.+?)\s+because\s+(.+)$/i);
  if (becauseMatch) return `${translateClauseKeywords(becauseMatch[1])}，因为${translateClauseKeywords(becauseMatch[2])}。`;

  const makeMatch = normalized.match(/^(.+?)\s+can\s+make\s+(.+?)\s+more\s+(.+)$/i);
  if (makeMatch) {
    return `${translateClauseKeywords(makeMatch[1])}可以让${translateClauseKeywords(makeMatch[2])}更加${translateClauseKeywords(makeMatch[3])}。`;
  }

  if (/\bnot only\b.+\bbut also\b/i.test(normalized)) return "这句话表达“不仅……而且……”，重点在后半部分的补充强调。";
  if (countWords(normalized) >= 4) return `这句话主要表达：${translateClauseKeywords(normalized)}。`;
  return "";
}

function translateClauseKeywords(text) {
  let normalized = normalizeInlineText(text).replace(/[.!?]+$/g, "");
  const phraseMap = [
    [/\bslow reading\b/i, "慢读"],
    [/\breal confidence\b/i, "真正的信心"],
    [/\ba living sentence\b/i, "鲜活的句子"],
    [/\bthe original text\b/i, "原文"],
    [/\bthe spoken result\b/i, "说出的结果"],
    [/\bdifferent voices\b/i, "不同音色"],
    [/\bdaily loop\b/i, "每日练习循环"],
  ];
  for (const [pattern, replacement] of phraseMap) normalized = normalized.replace(pattern, replacement);

  const translated = wordsForDraft(normalized)
    .slice(0, 10)
    .map((word) => shortMeaning(getWordMeaning(word)) || word)
    .filter(Boolean);
  return translated.length ? translated.join("、") : normalized;
}

function shortMeaning(meaning) {
  const first = String(meaning || "")
    .replace(/（原形[^）]+）/g, "")
    .split(/[；;]/)[0]
    .trim();
  return first;
}

function detectSentenceHint(text) {
  const normalized = normalizeInlineText(text);
  if (/\bnot only\b.+\bbut also\b/i.test(normalized)) return "句型：not only ... but also ...，意思是“不仅……而且……”。";
  if (/\bbecause\b/i.test(normalized)) return "句型：because 引出原因，可以先找主句，再看原因。";
  if (/\bwhen\b/i.test(normalized)) return "句型：when 引出时间或条件，可理解为“当……时”。";
  if (/\bif\b/i.test(normalized)) return "句型：if 引出条件，可理解为“如果……”。";
  if (/\bthe goal is\b/i.test(normalized)) return "句型：the goal is ...，意思是“目标是……”。";
  return countWords(normalized) > 8 ? "本地辅助理解：先抓主语、谓语和关键词，再顺着从句补充意思。" : "短语拆解：";
}

function bookmarkSelectedText() {
  if (!state.currentDoc || !state.selectedText) return;
  const text = state.selectedText;
  const bookmarks = Array.isArray(state.currentDoc.bookmarks) ? state.currentDoc.bookmarks : [];
  if (bookmarks.some((item) => item.text === text)) {
    showToast("这个片段已经在书签里");
    return;
  }

  bookmarks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    createdAt: new Date().toISOString(),
  });
  state.currentDoc.bookmarks = bookmarks;
  saveDocs();
  renderBookmarks();
  els.bookmarkDrawer.hidden = false;
  showToast("已加入书签");
}

function renderBookmarks() {
  els.bookmarkList.textContent = "";
  const bookmarks = state.currentDoc?.bookmarks || [];

  if (bookmarks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "bookmark-item";
    empty.textContent = "暂无书签。选中文本后点“书签”即可保存。";
    els.bookmarkList.append(empty);
    renderAsideBookmarks();
    return;
  }

  for (const bookmark of bookmarks) {
    const item = document.createElement("div");
    item.className = "bookmark-item";
    item.title = "双击定位到文章位置";
    item.addEventListener("dblclick", () => locateBookmark(bookmark.text));
    const text = document.createElement("div");
    text.textContent = bookmark.text;

    const actions = document.createElement("div");
    actions.className = "library-actions";

    const readButton = document.createElement("button");
    readButton.type = "button";
    readButton.className = "soft-button";
    readButton.innerHTML = '<i data-lucide="volume-2"></i>朗读';
    readButton.addEventListener("click", () => speakNatural(bookmark.text));

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "soft-button";
    removeButton.innerHTML = '<i data-lucide="x"></i>删除';
    removeButton.addEventListener("click", () => {
      state.currentDoc.bookmarks = (state.currentDoc.bookmarks || []).filter((item) => item.id !== bookmark.id);
      saveDocs();
      renderBookmarks();
    });

    actions.append(readButton, removeButton);
    item.append(text, actions);
    els.bookmarkList.append(item);
  }
  refreshIcons();
  renderAsideBookmarks();
}

function renderAsideBookmarks() {
  els.readerAsideBookmarks.textContent = "";
  const bookmarks = state.currentDoc?.bookmarks || [];
  if (bookmarks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "aside-empty";
    empty.textContent = "暂无书签。选中文本后可保存到这里。";
    els.readerAsideBookmarks.append(empty);
    return;
  }

  for (const bookmark of bookmarks.slice(0, 80)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "aside-bookmark";
    button.textContent = shorten(bookmark.text, 80);
    button.title = "点击定位到文章位置";
    button.addEventListener("click", () => locateBookmark(bookmark.text));
    els.readerAsideBookmarks.append(button);
  }
}

function locateBookmark(text) {
  const target = normalizeInlineText(text);
  if (!target) return;
  const paragraphs = $$(".paragraph", els.readerContent);
  const paragraph = paragraphs.find((item) => normalizeInlineText(item.textContent).includes(target));
  if (!paragraph) {
    const page = $$(".original-page", els.readerContent).find((item) => normalizeInlineText(item.textContent).includes(target));
    if (page) {
      page.scrollIntoView({ behavior: "smooth", block: "start" });
      page.classList.add("jump-highlight");
      window.setTimeout(() => page.classList.remove("jump-highlight"), 1200);
      els.bookmarkDrawer.hidden = true;
      updateReadingProgress();
      return;
    }
  }
  if (!paragraph) {
    showToast("没有在当前文章中找到这个书签片段。");
    return;
  }

  paragraph.scrollIntoView({ behavior: "smooth", block: "center" });
  const range = rangeForText(paragraph, target);
  const selection = window.getSelection();
  selection.removeAllRanges();

  if (range) {
    selection.addRange(range);
    setSelection(range, target);
    showPopoverForRange(range);
  } else {
    const fallback = document.createRange();
    fallback.selectNodeContents(paragraph);
    selection.addRange(fallback);
    setSelection(fallback, paragraph.textContent);
    showPopoverForRange(fallback);
  }

  els.bookmarkDrawer.hidden = true;
}

function rangeForText(root, text) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let combined = "";
  while (walker.nextNode()) {
    const node = walker.currentNode;
    nodes.push({ node, start: combined.length, end: combined.length + node.textContent.length });
    combined += node.textContent;
  }

  let start = combined.indexOf(text);
  if (start < 0) start = normalizeInlineText(combined).indexOf(text);
  if (start < 0) return null;
  const end = start + text.length;
  const startNode = nodes.find((item) => start >= item.start && start <= item.end);
  const endNode = nodes.find((item) => end >= item.start && end <= item.end);
  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode.node, Math.max(0, start - startNode.start));
  range.setEnd(endNode.node, Math.max(0, end - endNode.start));
  return range;
}

function boldSelectedText() {
  if (!state.selectionRange || !state.selectedText) return;

  const range = state.selectionRange.cloneRange();
  if (!els.readerContent.contains(range.commonAncestorContainer)) {
    showToast("请重新选择要加粗的文本");
    return;
  }

  const wrapper = document.createElement("strong");
  wrapper.className = "user-bold";
  try {
    const fragment = range.extractContents();
    wrapper.append(fragment);
    range.insertNode(wrapper);

    const selection = window.getSelection();
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(wrapper);
    selection.addRange(newRange);
    setSelection(newRange, wrapper.textContent);
    showPopoverForRange(newRange);
    showToast("已加粗");
  } catch {
    showToast("这个跨段选择无法直接加粗，请缩小选择范围。");
  }
}

function startRecording() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    showToast("当前浏览器不支持语音识别，可手动输入后评分。");
    els.transcriptInput.focus();
    return;
  }

  if (!state.selectedText) {
    showToast("先选择需要跟读的文本。");
    return;
  }

  stopRecording();
  const recognition = new Recognition();
  recognition.lang = selectedVoiceConfig().lang || "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;
  state.recognition = recognition;

  let finalTranscript = "";
  recognition.onstart = () => {
    els.recordBtn.disabled = true;
    els.recordStopBtn.disabled = false;
    els.scoreOutput.textContent = "正在听...";
  };
  recognition.onresult = (event) => {
    let interim = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      if (result.isFinal) finalTranscript += `${result[0].transcript} `;
      else interim += result[0].transcript;
    }
    els.transcriptInput.value = normalizeInlineText(`${finalTranscript} ${interim}`);
  };
  recognition.onerror = (event) => {
    els.scoreOutput.textContent = `识别中断：${event.error || "请检查麦克风权限"}`;
  };
  recognition.onend = () => {
    els.recordBtn.disabled = false;
    els.recordStopBtn.disabled = true;
    if (els.transcriptInput.value.trim()) {
      scoreTranscript(els.transcriptInput.value);
    } else if (!els.scoreOutput.textContent.startsWith("识别中断")) {
      els.scoreOutput.textContent = "没有识别到声音，也可以手动输入后评分。";
    }
  };
  recognition.start();
}

function stopRecording() {
  if (!state.recognition) return;
  try {
    state.recognition.stop();
  } catch {
    // Already stopped.
  }
  state.recognition = null;
}

function scoreTranscript(transcript) {
  const expectedText = normalizeInlineText(state.selectedText || els.practiceTargetText.textContent || "");
  if (!expectedText || !/[A-Za-z]/.test(expectedText)) {
    showToast("先选择需要跟读的文本。");
    return;
  }

  const heard = normalizeInlineText(transcript || "");
  if (!heard) {
    showToast("没有可评分的识别文本。");
    return;
  }

  renderScore(comparePronunciation(expectedText, heard));
}

function comparePronunciation(expectedText, heardText) {
  const expected = tokenizeWords(expectedText).slice(0, 180);
  const heard = tokenizeWords(heardText).slice(0, 180);
  const m = expected.length;
  const n = heard.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const back = Array.from({ length: m + 1 }, () => Array(n + 1).fill(""));

  for (let i = 1; i <= m; i += 1) {
    dp[i][0] = i;
    back[i][0] = "delete";
  }
  for (let j = 1; j <= n; j += 1) {
    dp[0][j] = j;
    back[0][j] = "insert";
  }

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const same = expected[i - 1] === heard[j - 1];
      const choices = [
        { cost: dp[i - 1][j - 1] + (same ? 0 : 1), op: same ? "match" : "replace" },
        { cost: dp[i - 1][j] + 1, op: "delete" },
        { cost: dp[i][j - 1] + 1, op: "insert" },
      ].sort((a, b) => a.cost - b.cost);
      dp[i][j] = choices[0].cost;
      back[i][j] = choices[0].op;
    }
  }

  const operations = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    const op = back[i][j];
    if (op === "match" || op === "replace") {
      operations.unshift({ op, expected: expected[i - 1], heard: heard[j - 1] });
      i -= 1;
      j -= 1;
    } else if (op === "delete") {
      operations.unshift({ op, expected: expected[i - 1], heard: "" });
      i -= 1;
    } else {
      operations.unshift({ op: "insert", expected: "", heard: heard[j - 1] });
      j -= 1;
    }
  }

  const score = Math.max(0, Math.round(100 * (1 - dp[m][n] / Math.max(m, n, 1))));
  const missed = operations
    .filter((item) => item.op === "delete" || item.op === "replace")
    .map((item) => item.expected)
    .filter(Boolean);
  const extra = operations
    .filter((item) => item.op === "insert")
    .map((item) => item.heard)
    .filter(Boolean);

  return {
    score,
    missed: unique(missed).slice(0, 8),
    extra: unique(extra).slice(0, 6),
    tips: makePronunciationTips(missed),
  };
}

function makePronunciationTips(words) {
  if (words.length === 0) return ["整体匹配很好，可以尝试提高语速或换一句更长的句子。"];
  const tips = new Set();
  const joined = words.join(" ");
  if (/th/i.test(joined)) tips.add("th: 舌尖轻触上齿背送气，不要读成 s 或 z。");
  if (/[rl]/i.test(joined)) tips.add("r/l: r 舌头后缩，l 舌尖轻碰上齿龈。");
  if (/[vw]/i.test(joined)) tips.add("v/w: v 用上齿轻触下唇，w 先收圆嘴唇。");
  if (/ed\b/i.test(joined)) tips.add("-ed: 根据前一个音读作 /t/、/d/ 或 /ɪd/。");
  if (tips.size === 0) tips.add("先慢读一次，注意重读词和句尾停顿。");
  return Array.from(tips).slice(0, 4);
}

function renderScore(result) {
  const level = result.score >= 86 ? "清晰" : result.score >= 70 ? "接近" : result.score >= 50 ? "需要慢练" : "建议拆句";
  const barClass = result.score < 55 ? " low" : result.score < 78 ? " warn" : "";
  els.scoreOutput.innerHTML = `
    <div class="score-head"><span>${escapeHtml(level)}</span><span>${result.score}/100</span></div>
    <div class="score-bar${barClass}"><span style="width:${result.score}%"></span></div>
    <div>重点词：${escapeHtml(result.missed.length ? result.missed.join(", ") : "无明显遗漏")}</div>
    <div>多识别：${escapeHtml(result.extra.length ? result.extra.join(", ") : "无")}</div>
    <div>${result.tips.map(escapeHtml).join("<br>")}</div>
  `;
  speakScoreResult(result, level);
}

function speakScoreResult(result, level) {
  const missed = result.missed.length ? result.missed.join(", ") : "没有明显遗漏";
  const extra = result.extra.length ? `多识别了 ${result.extra.join(", ")}` : "没有明显多识别";
  const tip = result.tips[0] || "";
  speakSystemText(`跟读评分 ${result.score} 分，${level}。重点词：${missed}。${extra}。${tip}`, "zh-CN", true);
}

function resetChat() {
  els.chatMessages.textContent = "";
  state.chatSeeded = true;
  addMessage("coach", "我会围绕当前文章回答。你可以让我总结、讲词汇、提问，或用英文继续聊选中的片段。");
}

function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role}`;
  bubble.textContent = text;
  els.chatMessages.append(bubble);
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function makeCoachReply(query) {
  if (!state.articleText) return "先导入或打开一篇文章，我们再练习。";
  const lower = query.toLowerCase();
  if (containsAny(lower, ["summary", "summarize", "main idea"]) || /总结|概括|主旨|大意/.test(query)) {
    return `Simple summary:\n${summarizeArticle()}\n\nYour turn: answer in English: What is one idea you agree with?`;
  }
  if (containsAny(lower, ["vocabulary", "words", "phrases"]) || /词汇|单词|短语|生词/.test(query)) {
    return vocabularyReply();
  }
  if (containsAny(lower, ["question", "quiz", "ask me"]) || /提问|问题|理解题|测试/.test(query)) {
    return questionReply();
  }
  if (state.selectedText) {
    return `Let's talk about your selection:\n"${shorten(state.selectedText, 140)}"\n\nIn simple English, it means: ${localDraftTranslate(state.selectedText) || "focus on the key words and the main action."}\n\nTry replying with: "I think this means..."`;
  }
  const match = findRelevantSentences(query)[0];
  return match
    ? `I found this line:\n"${match}"\n\nCan you explain it in your own English?`
    : "我没有在文章里找到直接对应的句子。你可以问一个关键词、人物、原因、结果，或先选中一段再问。";
}

function summarizeArticle() {
  const sentences = contentSentences();
  if (sentences.length <= 3) return sentences.join(" ");
  const keywords = topKeywords(state.articleText, 12);
  return sentences
    .map((sentence, index) => ({
      sentence,
      index,
      score: keywordList(sentence).filter((word) => keywords.includes(word)).length + (index < 2 ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.sentence)
    .join(" ");
}

function vocabularyReply() {
  const words = topKeywords(state.articleText, 8);
  return words
    .map((word, index) => `${index + 1}. ${word} ${preferredPhonetic(getPhonetic(word))} - ${getWordMeaning(word) || "结合上下文理解"}`)
    .join("\n");
}

function questionReply() {
  const sentences = contentSentences().filter((sentence) => countWords(sentence) >= 8);
  return [
    "Answer in English:",
    "1. What is the main idea of this passage?",
    `2. Why does the article mention "${shorten(sentences[1] || sentences[0] || "", 70)}"?`,
    `3. How would you use this idea in your own English learning?`,
  ].join("\n");
}

function findRelevantSentences(query) {
  const keys = keywordList(query);
  if (keys.length === 0) return [];
  return allSentences()
    .map((sentence) => {
      const sentenceKeys = keywordList(sentence);
      return { sentence, score: keys.filter((word) => sentenceKeys.includes(word)).length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.sentence);
}

function allSentences() {
  return state.paragraphs.flatMap((paragraph) => splitSentences(paragraph));
}

function contentSentences() {
  return allSentences().filter((sentence) => countWords(sentence) > 5 && !isLikelyHeading(sentence));
}

function isLikelyHeading(sentence) {
  return countWords(sentence) <= 10 && !/[.!?]"?$/.test(sentence.trim());
}

function topKeywords(text, limit) {
  const counts = new Map();
  for (const word of tokenizeWords(text).filter((item) => item.length > 2 && !stopWords.has(item))) {
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, limit)
    .map(([word]) => word);
}

function loadVoices() {
  if (!("speechSynthesis" in window)) {
    els.voiceSelect.innerHTML = "<option>浏览器不支持语音朗读</option>";
    return;
  }

  state.voices = window.speechSynthesis.getVoices();
  populateVoiceSelect();
}

function populateVoiceSelect() {
  els.voiceSelect.textContent = "";

  const accent = els.accentSelect.value;
  const defaultOptions = [
    { value: "default:en-US", label: "系统默认美音", lang: "en-US" },
    { value: "default:en-GB", label: "系统默认英音", lang: "en-GB" },
    { value: "default:en-AU", label: "系统默认澳音", lang: "en-AU" },
  ];
  const orderedDefaults =
    accent === "en-GB"
      ? [defaultOptions[1], defaultOptions[0], defaultOptions[2]]
      : accent === "en-AU"
        ? [defaultOptions[2], defaultOptions[0], defaultOptions[1]]
        : defaultOptions;

  for (const item of orderedDefaults) {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    els.voiceSelect.append(option);
  }

  const sorted = [...state.voices].sort((a, b) => voiceScore(b, accent) - voiceScore(a, accent) || a.name.localeCompare(b.name));
  const englishFirst = sorted.filter((voice) => /^en/i.test(voice.lang));
  const nonEnglish = sorted.filter((voice) => !/^en/i.test(voice.lang));
  for (const [index, voice] of englishFirst.entries()) {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    const badge = index === 0 ? "推荐 · " : "";
    option.textContent = `${badge}${voice.name} · ${voice.lang}`;
    els.voiceSelect.append(option);
  }
  for (const voice of nonEnglish) {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `本地 · ${voice.name} · ${voice.lang}`;
    els.voiceSelect.append(option);
  }

  const preferred = els.voiceSelect.dataset.preferred;
  if (preferred && [...els.voiceSelect.options].some((option) => option.value === preferred)) {
    els.voiceSelect.value = preferred;
  } else if (accent === "en-GB") {
    els.voiceSelect.value = "default:en-GB";
  } else if (accent === "en-AU") {
    els.voiceSelect.value = "default:en-AU";
  } else {
    els.voiceSelect.value = "default:en-US";
  }
  updateSupportStatus();
}

function voiceScore(voice, accent) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang || "";
  let score = 0;

  if (/^en/i.test(lang)) score += 30;
  if (accent !== "auto" && lang.toLowerCase().startsWith(accent.toLowerCase())) score += 80;
  if (accent === "auto" && /^en-(us|gb)/i.test(lang)) score += 40;
  if (/natural|online|neural|multilingual|premium/i.test(name)) score += 50;
  if (/jenny|aria|guy|ava|andrew|emma|brian|sonia|ryan|libby|steffan|william|olivia/i.test(name)) score += 26;
  if (/zh-|chinese/i.test(lang) || /huihui|kangkang|yaoyao/i.test(name)) score -= 60;
  if (voice.localService) score += 3;

  return score;
}

function selectedVoice() {
  const chosen = state.voices.find((voice) => voice.voiceURI === els.voiceSelect.value);
  return chosen || null;
}

function selectedVoiceConfig() {
  const voice = selectedVoice();
  if (voice) return { voice, lang: voice.lang };
  const selected = els.voiceSelect.value || "";
  if (selected.startsWith("default:")) return { voice: null, lang: selected.replace("default:", "") };
  return { voice: null, lang: els.accentSelect.value === "auto" ? "en-US" : els.accentSelect.value };
}

function voiceStyleParams() {
  const style = els.voiceStyleSelect.value;
  if (style === "clear") return { rate: 0.92, pitch: 1 };
  if (style === "warm") return { rate: 0.96, pitch: 0.94 };
  if (style === "story") return { rate: 0.9, pitch: 1.08 };
  return { rate: 1, pitch: 1 };
}

function playAccentSample(lang) {
  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持语音朗读。");
    return;
  }

  stopSpeech();
  const sample =
    lang === "en-GB"
      ? "British English sample. Slow reading helps you notice rhythm, stress, and meaning."
      : "American English sample. Slow reading helps you notice rhythm, stress, and meaning.";
  const utterance = new SpeechSynthesisUtterance(sample);
  const voice = bestVoiceForLang(lang);
  if (voice) utterance.voice = voice;
  utterance.lang = lang;
  const style = voiceStyleParams();
  const profile = state.voiceProfile || { rate: 1, pitch: 1, volume: 1 };
  utterance.rate = clamp((Number(els.rateRange.value) || 0.95) * style.rate * profile.rate, 0.55, 1.45);
  utterance.pitch = clamp(style.pitch * profile.pitch, 0.7, 1.35);
  utterance.volume = clamp(profile.volume, 0.72, 1);
  window.speechSynthesis.speak(utterance);
}

function bestVoiceForLang(lang, fallbackToEnglish = true) {
  const target = String(lang || "").toLowerCase();
  const primary = state.voices.find((voice) => voice.lang?.toLowerCase().startsWith(target));
  if (primary) return primary;
  const family = target.split("-")[0];
  const familyVoice = family ? state.voices.find((voice) => voice.lang?.toLowerCase().startsWith(family)) : null;
  if (familyVoice) return familyVoice;
  if (!fallbackToEnglish) return null;
  return (
    state.voices.find((voice) => /^en/i.test(voice.lang || ""))
  );
}

function speakNatural(text) {
  const content = normalizeInlineText(text || "");
  if (!content) {
    showToast("没有可朗读的文本。");
    return;
  }

  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持语音朗读。");
    return;
  }

  stopSpeech();
  state.speechQueue = makeSpeechChunks(content);
  state.isPaused = false;
  speakNextChunk();
}

function speakSystemText(text, lang = "zh-CN", useReadingVoice = false) {
  const content = normalizeInlineText(text || "");
  if (!content || !("speechSynthesis" in window)) return;

  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(content);
  const readingVoice = useReadingVoice ? selectedVoiceConfig() : null;
  const voice = readingVoice?.voice || bestVoiceForLang(lang, false);
  const profile = state.voiceProfile || { rate: 1, pitch: 1, volume: 1 };
  const style = voiceStyleParams();
  const baseRate = Number(els.rateRange.value) || 0.95;
  if (voice) {
    utterance.voice = voice;
    utterance.lang = readingVoice?.lang || voice.lang || lang;
  } else {
    utterance.lang = readingVoice?.lang || lang;
  }
  utterance.rate = clamp(baseRate * profile.rate * style.rate, 0.65, 1.35);
  utterance.pitch = clamp(profile.pitch * style.pitch, 0.75, 1.3);
  utterance.volume = clamp(profile.volume, 0.75, 1);
  window.speechSynthesis.speak(utterance);
}

function speakNextChunk() {
  if (state.speechQueue.length === 0) return;
  const chunk = state.speechQueue.shift();
  const voiceConfig = selectedVoiceConfig();
  const baseRate = Number(els.rateRange.value) || 0.95;
  const profile = state.voiceProfile || { rate: 1, pitch: 1, volume: 1 };
  const style = voiceStyleParams();
  const utterance = new SpeechSynthesisUtterance(chunk.text);

  if (voiceConfig.voice) {
    utterance.voice = voiceConfig.voice;
    utterance.lang = voiceConfig.lang;
  } else {
    utterance.lang = voiceConfig.lang;
  }

  utterance.rate = clamp(baseRate * chunk.rate * profile.rate * style.rate, 0.55, 1.45);
  utterance.pitch = clamp(chunk.pitch * profile.pitch * style.pitch, 0.7, 1.35);
  utterance.volume = clamp(profile.volume, 0.72, 1);
  utterance.onend = () => {
    state.speechTimer = window.setTimeout(speakNextChunk, chunk.pause);
  };
  window.speechSynthesis.speak(utterance);
}

function makeSpeechChunks(text) {
  const sentences = splitSentences(text);
  const chunks = [];

  for (const sentence of sentences) {
    const trimmed = normalizeInlineText(sentence);
    if (!trimmed) continue;
    const parts = trimmed.length > 220 ? splitLongSentence(trimmed) : [trimmed];

    for (const part of parts) {
      const pause = /[.!?]"?$/.test(part) ? 260 : 130;
      const question = /\?$/.test(part);
      const exclaim = /!$/.test(part);
      chunks.push({
        text: part,
        pause,
        rate: question ? 0.96 : 1,
        pitch: question ? 1.06 : exclaim ? 1.08 : 1,
      });
    }
  }

  return chunks.length ? chunks : [{ text, pause: 0, rate: 1, pitch: 1 }];
}

function splitLongSentence(sentence) {
  const parts = sentence.split(/(?<=[,;:])\s+/).filter(Boolean);
  if (parts.length > 1) return parts;

  const words = sentence.split(/\s+/);
  const chunks = [];
  for (let index = 0; index < words.length; index += 22) {
    chunks.push(words.slice(index, index + 22).join(" "));
  }
  return chunks;
}

function togglePause() {
  if (!("speechSynthesis" in window)) return;
  if (window.speechSynthesis.speaking && !state.isPaused) {
    window.speechSynthesis.pause();
    state.isPaused = true;
  } else if (state.isPaused) {
    window.speechSynthesis.resume();
    state.isPaused = false;
  }
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  window.clearTimeout(state.speechTimer);
  state.speechQueue = [];
  state.isPaused = false;
}

function updateRangeLabel() {
  els.rateValue.textContent = `${Number(els.rateRange.value).toFixed(2)}x`;
}

async function analyzeVoiceSample(file) {
  if (!window.AudioContext && !window.webkitAudioContext) {
    showToast("当前浏览器不支持音频分析。");
    return;
  }

  try {
    showToast("正在分析参考音频...");
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextClass();
    const buffer = await context.decodeAudioData(await file.arrayBuffer());
    const channel = buffer.getChannelData(0);
    const sampleRate = buffer.sampleRate;
    const duration = buffer.duration;
    const rms = calculateRms(channel);
    const pitch = estimateMedianPitch(channel, sampleRate);
    const rhythm = estimateRhythm(channel, sampleRate);

    const rate = rhythm > 150 ? 1.06 : rhythm < 90 ? 0.94 : 1;
    const pitchScale = pitch > 190 ? 1.07 : pitch > 0 && pitch < 125 ? 0.94 : 1;
    const volume = rms > 0.09 ? 0.92 : 1;

    state.voiceProfile = { rate, pitch: pitchScale, volume };
    showVoiceProfile(
      state.voiceProfile,
      `时长 ${duration.toFixed(1)}s，估计基频 ${pitch ? `${Math.round(pitch)}Hz` : "不足以判断"}，节奏 ${Math.round(
        rhythm,
      )} peaks/min。已用于微调语速、音高和音量；声纹克隆需要后端语音模型授权。`,
    );
    await context.close?.();
    savePrefs();
    showToast("参考音频分析完成");
  } catch (error) {
    console.error(error);
    showToast("音频分析失败，请换一段清晰人声。");
  }
}

function showVoiceProfile(profile, summary) {
  if (!profile) return;
  els.voiceProfile.hidden = false;
  els.voiceProfile.innerHTML = `<strong>参考音频已应用</strong>：${escapeHtml(summary)} 当前修正：语速 x${profile.rate.toFixed(
    2,
  )}，音高 x${profile.pitch.toFixed(2)}，音量 x${profile.volume.toFixed(2)}。`;
}

function calculateRms(samples) {
  let sum = 0;
  const step = Math.max(1, Math.floor(samples.length / 120_000));
  let count = 0;
  for (let index = 0; index < samples.length; index += step) {
    sum += samples[index] * samples[index];
    count += 1;
  }
  return Math.sqrt(sum / Math.max(count, 1));
}

function estimateRhythm(samples, sampleRate) {
  const frameSize = Math.floor(sampleRate * 0.05);
  const energies = [];
  for (let offset = 0; offset + frameSize < samples.length; offset += frameSize) {
    let sum = 0;
    for (let index = 0; index < frameSize; index += 1) {
      const value = samples[offset + index];
      sum += value * value;
    }
    energies.push(Math.sqrt(sum / frameSize));
  }

  const average = energies.reduce((sum, value) => sum + value, 0) / Math.max(energies.length, 1);
  let peaks = 0;
  for (let index = 1; index < energies.length - 1; index += 1) {
    if (energies[index] > average * 1.25 && energies[index] > energies[index - 1] && energies[index] > energies[index + 1]) {
      peaks += 1;
    }
  }
  const minutes = samples.length / sampleRate / 60;
  return peaks / Math.max(minutes, 0.01);
}

function estimateMedianPitch(samples, sampleRate) {
  const pitches = [];
  const windowSize = Math.floor(sampleRate * 0.05);
  const hop = Math.floor(sampleRate * 0.2);
  const maxSamples = Math.min(samples.length - windowSize, sampleRate * 20);

  for (let offset = 0; offset < maxSamples; offset += hop) {
    const pitch = autoCorrelatePitch(samples.subarray(offset, offset + windowSize), sampleRate);
    if (pitch >= 70 && pitch <= 320) pitches.push(pitch);
  }

  if (pitches.length === 0) return 0;
  pitches.sort((a, b) => a - b);
  return pitches[Math.floor(pitches.length / 2)];
}

function autoCorrelatePitch(buffer, sampleRate) {
  const size = buffer.length;
  let rms = 0;
  for (let index = 0; index < size; index += 1) rms += buffer[index] * buffer[index];
  rms = Math.sqrt(rms / size);
  if (rms < 0.01) return 0;

  const minLag = Math.floor(sampleRate / 320);
  const maxLag = Math.floor(sampleRate / 70);
  let bestLag = -1;
  let bestCorrelation = 0;

  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let correlation = 0;
    for (let index = 0; index < size - lag; index += 1) {
      correlation += buffer[index] * buffer[index + lag];
    }
    correlation /= size - lag;
    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestLag = lag;
    }
  }

  return bestCorrelation > 0.002 && bestLag > 0 ? sampleRate / bestLag : 0;
}

async function extractTextFromFile(file) {
  const ext = getExtension(file.name);
  let extracted = "";

  if (ext === "pdf") extracted = await extractPdfText(file);
  else if (ext === "docx") extracted = await extractDocxText(file);
  else if (ext === "epub") extracted = await extractEpubText(file);
  else if (["html", "htm"].includes(ext)) extracted = htmlToDocument(await file.text());
  else if (["md", "markdown"].includes(ext)) extracted = markdownToText(await file.text());
  else if (ext === "csv") extracted = csvToText(await file.text());
  else if (["srt", "vtt"].includes(ext)) extracted = captionsToText(await file.text());
  else extracted = await file.text();

  const text = typeof extracted === "string" ? extracted : extracted.text || "";
  const normalized = normalizeDocumentText(text);
  if (countWords(normalized) < 3 && normalized.length < 20) {
    throw new Error("没有提取到足够文本");
  }
  return typeof extracted === "string" ? normalized : { ...extracted, text: normalized };
}

async function extractPdfText(file) {
  const pdfjs = await ensurePdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pages = [];
  const pageLayouts = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.45 });
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    pages.push(text);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    await page.render({ canvasContext: context, viewport }).promise;

    pageLayouts.push({
      number: pageNumber,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height),
      imageSrc: canvas.toDataURL("image/jpeg", 0.84),
      text,
      items: makePdfTextLayerItems(content.items, viewport, pdfjs),
    });
  }

  return { text: pages.join("\n\n"), pageCount: pdf.numPages, pages: pageLayouts };
}

function makePdfTextLayerItems(items, viewport, pdfjs) {
  return items
    .filter((item) => normalizeInlineText(item.str))
    .map((item) => {
      const transform = pdfjs.Util.transform(viewport.transform, item.transform);
      const fontSize = Math.max(6, Math.hypot(transform[2], transform[3]));
      const left = clamp((transform[4] / viewport.width) * 100, 0, 100);
      const top = clamp(((transform[5] - fontSize) / viewport.height) * 100, 0, 100);
      const width = clamp(((item.width || item.str.length * fontSize * 0.45) * viewport.scale) / viewport.width * 100, 0.6, 100 - left);
      return {
        text: normalizeInlineText(item.str),
        left: Number(left.toFixed(3)),
        top: Number(top.toFixed(3)),
        width: Number(width.toFixed(3)),
        fontSize: Number(((fontSize / viewport.width) * 100).toFixed(3)),
      };
    });
}

async function ensurePdfJs() {
  if (!state.pdfjs) {
    state.pdfjs = await import("./vendor/pdf.min.mjs");
    state.pdfjs.GlobalWorkerOptions.workerSrc = "./vendor/pdf.worker.min.mjs";
  }
  return state.pdfjs;
}

async function extractDocxText(file) {
  const archive = await openZip(await file.arrayBuffer());
  const xml = await archive.readText("word/document.xml");
  if (!xml) throw new Error("DOCX 缺少正文");
  const doc = parseXml(xml);
  const paragraphs = elementsByLocalName(doc, "p")
    .map((node) => collectDocxText(node).trim())
    .filter(Boolean);
  const images = await extractZipImages(archive, "word/media/");
  return { text: paragraphs.join("\n\n"), images };
}

async function extractEpubText(file) {
  const archive = await openZip(await file.arrayBuffer());
  const container = await archive.readText("META-INF/container.xml");
  if (!container) throw new Error("EPUB 缺少目录");
  const containerDoc = parseXml(container);
  const rootfile = elementsByLocalName(containerDoc, "rootfile")[0]?.getAttribute("full-path");
  if (!rootfile) throw new Error("EPUB 缺少 OPF");

  const opf = await archive.readText(rootfile);
  const opfDoc = parseXml(opf);
  const base = rootfile.split("/").slice(0, -1).join("/");
  const manifest = new Map();

  for (const item of elementsByLocalName(opfDoc, "item")) {
    const id = item.getAttribute("id");
    const href = item.getAttribute("href");
    const mediaType = item.getAttribute("media-type") || "";
    if (id && href) manifest.set(id, { href: resolveZipPath(base, href), mediaType });
  }

  const chapters = [];
  for (const itemref of elementsByLocalName(opfDoc, "itemref")) {
    const entry = manifest.get(itemref.getAttribute("idref"));
    if (!entry || !/xhtml|html/i.test(entry.mediaType)) continue;
    const html = await archive.readText(entry.href);
    if (html) chapters.push(htmlToText(html));
  }

  if (chapters.length === 0) throw new Error("EPUB 没有可读章节");
  const images = [];
  for (const entry of manifest.values()) {
    if (!/^image\//i.test(entry.mediaType)) continue;
    const bytes = await archive.read(entry.href);
    if (bytes) images.push({ src: bytesToDataUrl(bytes, entry.mediaType), alt: entry.href.split("/").pop() || "EPUB 图片" });
  }
  return { text: chapters.join("\n\n"), images: images.slice(0, 120) };
}

async function openZip(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const eocdOffset = findEndOfCentralDirectory(view);
  const totalEntries = view.getUint16(eocdOffset + 10, true);
  const centralOffset = view.getUint32(eocdOffset + 16, true);
  const entries = new Map();
  let pointer = centralOffset;

  for (let index = 0; index < totalEntries; index += 1) {
    if (view.getUint32(pointer, true) !== 0x02014b50) throw new Error("ZIP 目录损坏");
    const flags = view.getUint16(pointer + 8, true);
    const method = view.getUint16(pointer + 10, true);
    const compressedSize = view.getUint32(pointer + 20, true);
    const filenameLength = view.getUint16(pointer + 28, true);
    const extraLength = view.getUint16(pointer + 30, true);
    const commentLength = view.getUint16(pointer + 32, true);
    const localOffset = view.getUint32(pointer + 42, true);
    const nameBytes = bytes.subarray(pointer + 46, pointer + 46 + filenameLength);
    const name = decodeZipName(nameBytes, flags).replace(/\\/g, "/");
    entries.set(name, { name, method, compressedSize, localOffset });
    pointer += 46 + filenameLength + extraLength + commentLength;
  }

  return {
    entries,
    async read(name) {
      const entry = entries.get(name);
      if (!entry) return null;
      return readZipEntry(bytes, view, entry);
    },
    async readText(name) {
      const data = await this.read(name);
      return data ? new TextDecoder("utf-8").decode(data) : "";
    },
  };
}

function findEndOfCentralDirectory(view) {
  const min = Math.max(0, view.byteLength - 66_000);
  for (let offset = view.byteLength - 22; offset >= min; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) return offset;
  }
  throw new Error("不是有效的 ZIP 文件");
}

async function readZipEntry(bytes, view, entry) {
  const pointer = entry.localOffset;
  if (view.getUint32(pointer, true) !== 0x04034b50) throw new Error("ZIP 条目损坏");
  const filenameLength = view.getUint16(pointer + 26, true);
  const extraLength = view.getUint16(pointer + 28, true);
  const dataStart = pointer + 30 + filenameLength + extraLength;
  const compressed = bytes.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.method === 0) return compressed.slice();
  if (entry.method === 8) return inflateRaw(compressed);
  throw new Error(`ZIP 压缩方式不支持：${entry.method}`);
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("浏览器不支持 DOCX/EPUB 解压");
  }

  for (const format of ["deflate-raw", "deflate"]) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    } catch {
      // Try the next format.
    }
  }

  throw new Error("无法解压文件内容");
}

function decodeZipName(bytes) {
  return new TextDecoder("utf-8").decode(bytes);
}

function parseXml(xml) {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const error = doc.querySelector("parsererror");
  if (error) throw new Error("XML 解析失败");
  return doc;
}

function elementsByLocalName(root, localName) {
  return $$("*", root).filter((element) => element.localName === localName);
}

function collectDocxText(node) {
  let output = "";
  for (const child of node.childNodes) {
    if (child.nodeType !== Node.ELEMENT_NODE) continue;
    if (child.localName === "t") output += child.textContent;
    else if (child.localName === "tab") output += " ";
    else if (child.localName === "br" || child.localName === "cr") output += "\n";
    else output += collectDocxText(child);
  }
  return output;
}

async function extractZipImages(archive, prefix = "") {
  const images = [];
  for (const name of archive.entries.keys()) {
    if (prefix && !name.startsWith(prefix)) continue;
    const mime = mimeFromPath(name);
    if (!mime) continue;
    const bytes = await archive.read(name);
    if (!bytes) continue;
    images.push({ src: bytesToDataUrl(bytes, mime), alt: name.split("/").pop() || "文档图片" });
  }
  return images.slice(0, 120);
}

function mimeFromPath(path) {
  const ext = getExtension(path);
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  if (ext === "svg") return "image/svg+xml";
  return "";
}

function bytesToDataUrl(bytes, mime) {
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return `data:${mime};base64,${btoa(binary)}`;
}

function resolveZipPath(base, href) {
  const stack = base ? base.split("/") : [];
  for (const rawPart of href.split("/")) {
    const part = decodeURIComponent(rawPart);
    if (!part || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return stack.join("/");
}

function htmlToDocument(html) {
  return {
    text: htmlToText(html),
    images: extractHtmlImages(html),
  };
}

function extractHtmlImages(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return $$("img", doc.body)
    .map((img) => ({
      src: img.getAttribute("src") || "",
      alt: normalizeInlineText(img.getAttribute("alt") || img.getAttribute("title") || ""),
    }))
    .filter((image) => /^data:image\//i.test(image.src) || /^https?:\/\//i.test(image.src))
    .slice(0, 80);
}

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  $$("script, style, nav, svg", doc).forEach((node) => node.remove());
  const blocks = $$("h1, h2, h3, h4, p, li, blockquote", doc.body)
    .map((node) => normalizeInlineText(node.textContent))
    .filter(Boolean);
  return blocks.length ? blocks.join("\n\n") : normalizeInlineText(doc.body.textContent || "");
}

function markdownToText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~>#]/g, " ");
}

function csvToText(csv) {
  return csv
    .split(/\r?\n/)
    .map((row) =>
      row
        .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        .map((cell) => cell.replace(/^"|"$/g, "").replace(/""/g, '"').trim())
        .filter(Boolean)
        .join(" "),
    )
    .filter(Boolean)
    .join("\n");
}

function captionsToText(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => !/^\d+$/.test(line.trim()))
    .filter((line) => !/-->|WEBVTT|NOTE/.test(line))
    .join("\n");
}

function normalizeDocumentText(text) {
  return (text || "")
    .replace(/\u0000/g, "")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeInlineText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function splitParagraphs(text) {
  const normalized = normalizeDocumentText(text);
  if (!normalized) return [];

  const rough = normalized
    .split(/\n{2,}/)
    .map((block) => normalizeInlineText(block))
    .filter(Boolean);

  const paragraphs = [];
  for (const block of rough) {
    if (block.length < 1400) {
      paragraphs.push(block);
      continue;
    }

    const sentences = splitSentences(block);
    for (let index = 0; index < sentences.length; index += 5) {
      paragraphs.push(sentences.slice(index, index + 5).join(" "));
    }
  }

  return paragraphs;
}

function splitSentences(text) {
  const input = normalizeInlineText(text);
  if (!input) return [];

  if ("Intl" in window && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    return Array.from(segmenter.segment(input), (item) => item.segment.trim()).filter(Boolean);
  }

  return input.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g)?.map((item) => item.trim()).filter(Boolean) || [input];
}

function tokenizeWords(text) {
  return (text.toLowerCase().match(/[a-z]+(?:[-'][a-z]+)?|\d+(?:[.,]\d+)?/g) || []).map((word) =>
    word.replace(/^-+|-+$/g, ""),
  );
}

function countWords(text) {
  return tokenizeWords(text).length;
}

function keywordList(text) {
  return unique(tokenizeWords(text).filter((word) => word.length > 2 && !stopWords.has(word)));
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function getExtension(filename) {
  return filename.includes(".") ? filename.split(".").pop().toLowerCase() : "";
}

function stripExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}

function shorten(text, maxLength) {
  const normalized = normalizeInlineText(text);
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 1)}...` : normalized;
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateSupportStatus() {
  const tts = "speechSynthesis" in window ? "朗读可用" : "朗读不可用";
  const zip = typeof DecompressionStream !== "undefined" ? "DOCX/EPUB 可用" : "DOCX/EPUB 受限";
  const englishCount = state.voices.filter((voice) => /^en/i.test(voice.lang)).length;
  const localCount = state.voices.length;
  const voiceText = englishCount > 0 ? `英文音色 ${englishCount} 个` : `系统默认英音/美音可选，本地音色 ${localCount} 个`;
  els.supportStatus.textContent = `${tts} · PDF 可用 · ${zip} · ${voiceText}`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2600);
}

function refreshIcons() {
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => {
      registration.update().catch(() => {});
      if (registration.waiting) registration.waiting.postMessage({ type: "SKIP_WAITING" });
      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) {
            worker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
    })
    .catch(() => {});
}
