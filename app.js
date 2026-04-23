const CONFIG = {
  GAS_URL: "https://script.google.com/macros/s/AKfycbxTPQRvtozv209Vs2xizk7WgnHD6BofTNKnAeq0zfxLOThqqRJ0hNMwR1kGInIIdjFs/exec",
  WORK_TITLE: "Семестрова робота",
  SUBJECT: "Інтегрований курс історії, 6 клас",
  TOTAL_TIME_SECONDS: 40 * 60,
  BREAK_TIME_SECONDS: 5 * 60,
  TOTAL_QUESTIONS: 48,
  BLOCK_SIZE: 24
};

function generateAttemptId() {
  if (
    typeof crypto !== "undefined" &&
    crypto &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return "attempt-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}

const questionBank = [
  { id: "q1", group: "ГР1", question: "Що найбільше впливало на життя і заняття населення Давньої Греції?", options: ["Великі рівнини та повноводні річки", "Гори, море і нестача родючих земель", "Лише густі ліси", "Суворі морози протягом усього року"], correct: 1 },
  { id: "q2", group: "ГР1", question: "Яка цивілізація виникла на острові Крит?", options: ["Ахейська", "Мінойська", "Римська", "Фінікійська"], correct: 1 },
  { id: "q3", group: "ГР1", question: "Яку цивілізацію пов’язують з містом Мікени?", options: ["Ахейську", "Мінойську", "Єгипетську", "Перську"], correct: 0 },
  { id: "q4", group: "ГР1", question: "Що означає слово «поліс»?", options: ["Військовий союз", "Місто-держава", "Торговий порт", "Палац правителя"], correct: 1 },
  { id: "q5", group: "ГР1", question: "Яке грецьке місто-держава найбільше відоме розвитком демократії?", options: ["Спарта", "Коринф", "Афіни", "Мілет"], correct: 2 },
  { id: "q6", group: "ГР1", question: "Яке грецьке місто-держава було відоме суворим військовим устроєм?", options: ["Афіни", "Спарта", "Ольвія", "Тір"], correct: 1 },
  { id: "q7", group: "ГР1", question: "Як називали бойовий стрій важкоозброєних грецьких воїнів?", options: ["Легіон", "Фаланга", "Кіннота", "Маніпула"], correct: 1 },
  { id: "q8", group: "ГР1", question: "Що було головною причиною Великої грецької колонізації?", options: ["Заборона торгівлі", "Брак землі та пошук нових ринків", "Наказ перських царів", "Прагнення втекти від моря"], correct: 1 },
  { id: "q9", group: "ГР1", question: "Що таке акрополь?", options: ["Нижнє поселення", "Портова площа", "Верхня укріплена частина поліса", "Ринок для ремісників"], correct: 2 },
  { id: "q10", group: "ГР1", question: "Яка війна прославила греків у боротьбі проти Персії?", options: ["Пелопоннеська", "Греко-перська", "Пунічна", "Троянська"], correct: 1 },
  { id: "q11", group: "ГР1", question: "Хто очолив великі завоювання, після яких поширилася грецька культура?", options: ["Перікл", "Солон", "Олександр Македонський", "Лікург"], correct: 2 },
  { id: "q12", group: "ГР1", question: "Як називають поширення грецької культури після завоювань Олександра Македонського?", options: ["Колонізація", "Еллінізм", "Романізація", "Республіка"], correct: 1 },
  { id: "q13", group: "ГР1", question: "На якому півострові виникла Давньоримська держава?", options: ["Балканському", "Апеннінському", "Піренейському", "Кримському"], correct: 1 },
  { id: "q14", group: "ГР1", question: "Яка форма правління існувала в Римі до імперії?", options: ["Республіка", "Абсолютна монархія", "Тиранія", "Колонія"], correct: 0 },
  { id: "q15", group: "ГР1", question: "Як називали основну військову одиницю римлян?", options: ["Фаланга", "Сенат", "Легіон", "Поліс"], correct: 2 },
  { id: "q16", group: "ГР1", question: "Що було центром громадського життя в Давньому Римі?", options: ["Форум", "Акрополь", "Колізей", "Пантеон"], correct: 0 },
  { id: "q17", group: "ГР1", question: "Хто з діячів пов’язаний з переходом Риму від республіки до імперії?", options: ["Гомер", "Юлій Цезар", "Перікл", "Солон"], correct: 1 },
  { id: "q18", group: "ГР1", question: "Хто став першим римським імператором?", options: ["Нерон", "Октавіан Август", "Траян", "Спартак"], correct: 1 },
  { id: "q19", group: "ГР1", question: "Яка війна зробила Рим панівною силою в Західному Середземномор’ї?", options: ["Греко-перська", "Пелопоннеська", "Пунічна", "Троянська"], correct: 2 },
  { id: "q20", group: "ГР1", question: "Який народ створив могутню державу в українських степах у добу античності?", options: ["Скіфи", "Франки", "Сакси", "Ацтеки"], correct: 0 },
  { id: "q21", group: "ГР1", question: "Яке античне місто-держава було засноване греками на півдні сучасної України?", options: ["Ольвія", "Афіни", "Спарта", "Рим"], correct: 0 },
  { id: "q22", group: "ГР1", question: "Що виникло раніше за часом?", options: ["Римська імперія", "Походи Олександра Македонського", "Поширення християнства в Римі", "Пунічні війни"], correct: 1 },
  { id: "q23", group: "ГР1", question: "Яке твердження правильно передає зв’язок між природою Греції та колонізацією?", options: ["Родючих земель було надто багато, тому греки залишали батьківщину", "Гори й нестача землі спонукали шукати нові місця для життя і торгівлі", "Колонізація почалася після падіння Риму", "Колонії виникали тільки за наказом перських царів"], correct: 1 },
  { id: "q24", group: "ГР1", question: "Яке твердження правильно показує спадкоємність подій?", options: ["Завоювання Олександра сприяли поширенню еллінізму", "Пунічні війни заснували Афіни", "Троянська війна створила Римську імперію", "Спарта започаткувала християнство"], correct: 0 },

  { id: "q25", group: "ГР2", question: "Прочитайте твердження: «Поліс — це місто-держава». Воно є…", options: ["історичним поняттям", "назвою римського легіону", "міфом", "назвою зброї"], correct: 0 },
  { id: "q26", group: "ГР2", question: "Яке слово найкраще пояснює значення поняття «демократія» в Афінах?", options: ["Влада народу", "Влада імператора", "Влада жерців", "Влада купців"], correct: 0 },
  { id: "q27", group: "ГР2", question: "Яке джерело інформації найкраще допоможе дізнатися про порядок подій у часі?", options: ["Історична хронологія", "Пейзажна картина", "Казка", "Рекламний плакат"], correct: 0 },
  { id: "q28", group: "ГР2", question: "Установіть, яке поняття стосується Давнього Риму, а не Греції.", options: ["Поліс", "Форум", "Акрополь", "Еллінізм"], correct: 1 },
  { id: "q29", group: "ГР2", question: "Яке твердження є висновком, а не окремим фактом?", options: ["Ольвія була грецьким містом-державою", "Юлій Цезар був політичним діячем Риму", "Античний світ сильно вплинув на розвиток європейської культури", "Фаланга була бойовим строєм греків"], correct: 2 },
  { id: "q30", group: "ГР2", question: "Що означає працювати з історичною інформацією?", options: ["Лише вивчати напам’ять дати", "Добирати, розуміти й пояснювати історичні факти та поняття", "Переписувати підручник без змін", "Замість відповіді вгадувати"], correct: 1 },
  { id: "q31", group: "ГР2", question: "Яке поняття пов’язане з релігійним життям Давнього Риму?", options: ["Юпітер", "Перікл", "Солон", "Мікени"], correct: 0 },
  { id: "q32", group: "ГР2", question: "Яке узагальнення правильно пояснює значення форуму?", options: ["Це центр громадського й політичного життя Риму", "Це військовий табір римлян", "Це лише храм одного бога", "Це вид римської зброї"], correct: 0 },
  { id: "q33", group: "ГР2", question: "Прочитайте твердження: «Сенат — рада знатних громадян». Воно дає інформацію про…", options: ["орган влади", "вид театру", "міфічного героя", "торговий корабель"], correct: 0 },
  { id: "q34", group: "ГР2", question: "Яка пара правильно співвідносить діяча і явище?", options: ["Олександр Македонський — еллінізм", "Юпітер — демократія", "Перікл — Пунічні війни", "Октавіан Август — Троянська війна"], correct: 0 },
  { id: "q35", group: "ГР2", question: "Який висновок можна зробити з факту поширення християнства в Римській імперії?", options: ["Релігійне життя римлян змінювалося", "Рим перестав існувати за один день", "Греки заснували Рим", "Усі війни припинилися назавжди"], correct: 0 },
  { id: "q36", group: "ГР2", question: "Яке поняття найкраще описує спільну спадщину Давньої Греції та Давнього Риму?", options: ["Античність", "Колонізація", "Фаланга", "Поліс"], correct: 0 },
  { id: "q37", group: "ГР2", question: "Яке твердження найкраще пояснює значення грецького театру?", options: ["Це частина культурної спадщини людства", "Це вид військового строю", "Це назва римського закону", "Це синонім сенату"], correct: 0 },
  { id: "q38", group: "ГР2", question: "Що спільного між Ольвією і Херсонесом?", options: ["Це античні міста-держави на території сучасної України", "Це римські імператори", "Це грецькі боги", "Це військові союзи"], correct: 0 },
  { id: "q39", group: "ГР2", question: "Який інформаційний висновок правильний: «Патриції і плебеї» — це…", options: ["суспільні групи населення Риму", "два грецькі поліси", "види римських храмів", "назви колоній у Причорномор’ї"], correct: 0 },
  { id: "q40", group: "ГР2", question: "Яке твердження точніше за інші описує римське право?", options: ["Воно вплинуло на розвиток юридичних норм у майбутньому", "Воно існувало тільки в Греції", "Воно було лише військовою піснею", "Воно не мало жодного значення"], correct: 0 },
  { id: "q41", group: "ГР2", question: "Який приклад показує роботу з історичною картою або простором?", options: ["Визначити, де виникла Ольвія", "Просто переписати параграф", "Прочитати вірш", "Намалювати довільний орнамент"], correct: 0 },
  { id: "q42", group: "ГР2", question: "Яке поняття слід використати, щоб пояснити сувору військову організацію Спарти?", options: ["Поліс", "Лад воїнів і дисципліна", "Поширення християнства", "Форум"], correct: 1 },
  { id: "q43", group: "ГР2", question: "Який із наведених прикладів є історичним узагальненням?", options: ["Октавіан Август був першим імператором", "Грецька та римська цивілізації залишили важливу культурну спадщину", "Юпітер був головним богом римлян", "Форум був центром життя Риму"], correct: 1 },
  { id: "q44", group: "ГР2", question: "Що треба зробити, щоб правильно інтерпретувати історичне поняття?", options: ["Зрозуміти його зміст і вміти навести приклад", "Запам’ятати лише першу літеру", "Замінити його будь-яким іншим словом", "Ігнорувати контекст"], correct: 0 },
  { id: "q45", group: "ГР2", question: "Яке пояснення найкраще передає значення еллінізму?", options: ["Поширення грецької культури на нові землі", "Створення римського сенату", "Військовий стрій спартанців", "Падіння Трої"], correct: 0 },
  { id: "q46", group: "ГР2", question: "Який висновок можна зробити з факту існування античних міст на півдні України?", options: ["Терени сучасної України були пов’язані з античним світом", "Україна була частиною Римської імперії завжди", "Греки не займалися мореплавством", "Античність стосувалася лише Італії"], correct: 0 },
  { id: "q47", group: "ГР2", question: "Що з наведеного є прикладом суспільствознавчого змісту в курсі історії?", options: ["Розуміння влади, суспільних груп і правил життя держави", "Лише назви рослин", "Тільки математичні формули", "Лише кольори на малюнку"], correct: 0 },
  { id: "q48", group: "ГР2", question: "Яке підсумкове твердження є найбільш обґрунтованим?", options: ["Античний світ не вплинув на сучасність", "Історія Греції та Риму допомагає зрозуміти розвиток культури, держави й права", "Минуле не пов’язане із сучасністю", "Усі цивілізації античності були однаковими"], correct: 1 }
];

const appState = {
  attemptId: generateAttemptId(),
  studentName: "",
  className: "",
  shuffledQuestions: [],
  currentIndex: 0,
  answers: {},
  startedAt: null,
  finishedAt: null,
  mainTimer: CONFIG.TOTAL_TIME_SECONDS,
  breakTimer: CONFIG.BREAK_TIME_SECONDS,
  mainTimerId: null,
  breakTimerId: null,
  isPausedForBreak: false,
  hasCompletedBreak: false,
  integrity: {
    visibilityChanges: 0,
    blurCount: 0
  }
};

const $ = (id) => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  $(id).classList.add("active");
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(totalSec) {
  const m = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("history6Theme", theme);
}

function toggleTheme() {
  const next = document.body.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
}

function loadTheme() {
  setTheme(localStorage.getItem("history6Theme") || "light");
}

function startMainTimer() {
  clearInterval(appState.mainTimerId);
  appState.mainTimerId = setInterval(() => {
    if (appState.isPausedForBreak) return;

    appState.mainTimer -= 1;
    $("timerLabel").textContent = formatTime(Math.max(appState.mainTimer, 0));

    if (appState.mainTimer <= 0) {
      clearInterval(appState.mainTimerId);
      finishTest();
    }
  }, 1000);
}

function startBreakTimer() {
  clearInterval(appState.breakTimerId);
  $("continueAfterBreakBtn").disabled = true;

  appState.breakTimerId = setInterval(() => {
    appState.breakTimer -= 1;
    $("breakTimerLabel").textContent = formatTime(Math.max(appState.breakTimer, 0));

    if (appState.breakTimer <= 0) {
      clearInterval(appState.breakTimerId);
      appState.hasCompletedBreak = true;
      $("continueAfterBreakBtn").disabled = false;
    }
  }, 1000);
}

function buildQuestionUI(question) {
  const container = $("questionContainer");
  container.innerHTML = "";

  question.options.forEach((option, idx) => {
    const label = document.createElement("label");
    label.className = "option-label";
    label.innerHTML = `
      <input type="radio" name="${question.id}" value="${idx}" ${appState.answers[question.id] == idx ? "checked" : ""}>
      ${option}
    `;
    container.appendChild(label);
  });
}

function renderQuestion() {
  const question = appState.shuffledQuestions[appState.currentIndex];
  const questionNumber = appState.currentIndex + 1;
  const blockNumber = questionNumber <= CONFIG.BLOCK_SIZE ? 1 : 2;

  $("blockLabel").textContent = `Блок ${blockNumber} із 2`;
  $("questionMeta").textContent = `Завдання ${questionNumber} із ${CONFIG.TOTAL_QUESTIONS} · ${question.group}`;
  $("questionTitle").textContent = question.question;
  $("progressBar").style.width = `${(questionNumber / CONFIG.TOTAL_QUESTIONS) * 100}%`;

  buildQuestionUI(question);

  $("prevBtn").style.display = appState.currentIndex === 0 ? "none" : "inline-block";
  $("nextBtn").style.display = appState.currentIndex === CONFIG.TOTAL_QUESTIONS - 1 ? "none" : "inline-block";
  $("finishBtn").style.display = appState.currentIndex === CONFIG.TOTAL_QUESTIONS - 1 ? "inline-block" : "none";
}

function saveCurrentAnswer() {
  const question = appState.shuffledQuestions[appState.currentIndex];
  const checked = document.querySelector(`input[name="${question.id}"]:checked`);

  if (checked) {
    appState.answers[question.id] = Number(checked.value);
  }
}

function nextQuestion() {
  saveCurrentAnswer();
  const nextIndex = appState.currentIndex + 1;

  if (nextIndex === CONFIG.BLOCK_SIZE && !appState.hasCompletedBreak) {
    pauseForBreak();
    return;
  }

  if (nextIndex < CONFIG.TOTAL_QUESTIONS) {
    appState.currentIndex = nextIndex;
    renderQuestion();
  }
}

function prevQuestion() {
  saveCurrentAnswer();

  if (appState.currentIndex > 0) {
    appState.currentIndex -= 1;
    renderQuestion();
  }
}

function pauseForBreak() {
  appState.isPausedForBreak = true;
  clearInterval(appState.mainTimerId);
  appState.breakTimer = CONFIG.BREAK_TIME_SECONDS;
  $("breakTimerLabel").textContent = formatTime(appState.breakTimer);
  showScreen("screen-break");
  startBreakTimer();
}

function continueAfterBreak() {
  if (!appState.hasCompletedBreak) return;

  appState.isPausedForBreak = false;
  appState.currentIndex = CONFIG.BLOCK_SIZE;
  showScreen("screen-test");
  $("timerLabel").textContent = formatTime(appState.mainTimer);
  startMainTimer();
  renderQuestion();
}

function rawTo12(raw) {
  if (raw <= 4) return 1;
  if (raw <= 8) return 3;
  if (raw <= 12) return 4;
  if (raw <= 16) return 5;
  if (raw <= 20) return 6;
  if (raw <= 24) return 7;
  if (raw <= 30) return 8;
  if (raw <= 36) return 9;
  if (raw <= 41) return 10;
  if (raw <= 45) return 11;
  return 12;
}

function computeGR3() {
  const answeredCount = Object.keys(appState.answers).length;
  const durationSec = Math.max(0, CONFIG.TOTAL_TIME_SECONDS - appState.mainTimer);
  let score = 3;
  const reasons = [];

  if (!appState.hasCompletedBreak) {
    score -= 1;
    reasons.push("не завершено обов’язкову перерву між блоками");
  }

  if (answeredCount < CONFIG.TOTAL_QUESTIONS * 0.9) {
    score -= 1;
    reasons.push("значна частина завдань залишилась без відповіді");
  }

  if ((appState.integrity.visibilityChanges + appState.integrity.blurCount) >= 8) {
    score -= 1;
    reasons.push("висока кількість перемикань уваги під час виконання");
  }

  if (durationSec > 0 && durationSec < 15 * 60) {
    score -= 1;
    reasons.push("підозріло короткий час виконання для 48 завдань");
  }

  score = Math.max(0, score);

  let level = "зараховано";
  if (score === 2) level = "частково зараховано";
  if (score <= 1) level = "ризик";

  return { score, level, reasons };
}

function computeResults() {
  let raw = 0;
  const groupScores = {
    ГР1: { correct: 0, total: 0 },
    ГР2: { correct: 0, total: 0 }
  };

  appState.shuffledQuestions.forEach((question) => {
    groupScores[question.group].total += 1;

    if (appState.answers[question.id] === question.correct) {
      raw += 1;
      groupScores[question.group].correct += 1;
    }
  });

  return {
    raw,
    score12: rawTo12(raw),
    groupScores,
    gr3: computeGR3()
  };
}

function buildPayload() {
  const results = computeResults();

  return {
    attemptId: appState.attemptId,
    studentName: appState.studentName,
    className: appState.className,
    workTitle: CONFIG.WORK_TITLE,
    subject: CONFIG.SUBJECT,
    totalQuestions: CONFIG.TOTAL_QUESTIONS,
    scoreRaw: results.raw,
    score12: results.score12,
    maxScore: CONFIG.TOTAL_QUESTIONS,
    startedAt: appState.startedAt,
    finishedAt: appState.finishedAt,
    durationSec: Math.max(0, CONFIG.TOTAL_TIME_SECONDS - appState.mainTimer),
    integrity: appState.integrity,
    grResults: {
      GR1: results.groupScores["ГР1"],
      GR2: results.groupScores["ГР2"],
      GR3: results.gr3
    }
  };
}

function renderResultScreen() {
  const payload = buildPayload();

  $("studentResultLabel").textContent = `${payload.studentName}, ${payload.className}`;
  $("scoreRawLabel").textContent = `${payload.scoreRaw} / ${payload.maxScore}`;
  $("score12Label").textContent = payload.score12;

  const list = $("grList");
  list.innerHTML = "";

  [
    `ГР1: ${payload.grResults.GR1.correct} / ${payload.grResults.GR1.total}`,
    `ГР2: ${payload.grResults.GR2.correct} / ${payload.grResults.GR2.total}`,
    `ГР3: ${payload.grResults.GR3.level} (${payload.grResults.GR3.score}/3)`
  ].forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });

  if (payload.grResults.GR3.reasons.length) {
    payload.grResults.GR3.reasons.forEach((reason) => {
      const li = document.createElement("li");
      li.textContent = `ГР3 — причина: ${reason}`;
      list.appendChild(li);
    });
  }

  $("submitStatus").textContent = "Очікує надсилання.";
  $("submitStatus").className = "";
}

function finishTest() {
  saveCurrentAnswer();
  clearInterval(appState.mainTimerId);
  clearInterval(appState.breakTimerId);
  appState.finishedAt = new Date().toISOString();
  renderResultScreen();
  showScreen("screen-result");
}

async function sendPayload() {
  const payload = buildPayload();
  const statusNode = $("submitStatus");

  if (!CONFIG.GAS_URL) {
    statusNode.textContent = "Не задано GAS_URL у файлі app.js.";
    statusNode.className = "error";
    return;
  }

  statusNode.textContent = "Надсилання...";
  statusNode.className = "";

  try {
    const response = await fetch(CONFIG.GAS_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { ok: false, error: text };
    }

    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Сервер повернув помилку.");
    }

    statusNode.textContent = "Результат успішно надіслано.";
    statusNode.className = "success";
  } catch (error) {
    statusNode.textContent = `Помилка надсилання: ${error.message}`;
    statusNode.className = "error";
  }
}

function resetApp() {
  clearInterval(appState.mainTimerId);
  clearInterval(appState.breakTimerId);

  appState.attemptId = generateAttemptId();
  appState.studentName = "";
  appState.className = "";
  appState.shuffledQuestions = [];
  appState.currentIndex = 0;
  appState.answers = {};
  appState.startedAt = null;
  appState.finishedAt = null;
  appState.mainTimer = CONFIG.TOTAL_TIME_SECONDS;
  appState.breakTimer = CONFIG.BREAK_TIME_SECONDS;
  appState.isPausedForBreak = false;
  appState.hasCompletedBreak = false;
  appState.integrity = {
    visibilityChanges: 0,
    blurCount: 0
  };

  $("studentName").value = "";
  $("studentClass").value = "";
  $("timerLabel").textContent = formatTime(CONFIG.TOTAL_TIME_SECONDS);
  $("breakTimerLabel").textContent = formatTime(CONFIG.BREAK_TIME_SECONDS);

  showScreen("screen-start");
}

function goToInstructions() {
  const name = $("studentName").value.trim();
  const className = $("studentClass").value.trim();

  if (!name || !className) {
    alert("Заповніть ПІБ і клас.");
    return;
  }

  showScreen("screen-instructions");
}

function beginTest() {
  appState.studentName = $("studentName").value.trim();
  appState.className = $("studentClass").value.trim();

  if (!appState.studentName || !appState.className) {
    alert("Заповніть ПІБ і клас.");
    showScreen("screen-student");
    return;
  }

  appState.shuffledQuestions = shuffle(questionBank);
  appState.startedAt = new Date().toISOString();
  appState.currentIndex = 0;
  appState.answers = {};
  appState.mainTimer = CONFIG.TOTAL_TIME_SECONDS;
  appState.breakTimer = CONFIG.BREAK_TIME_SECONDS;
  appState.isPausedForBreak = false;
  appState.hasCompletedBreak = false;

  $("timerLabel").textContent = formatTime(appState.mainTimer);
  $("breakTimerLabel").textContent = formatTime(appState.breakTimer);

  renderQuestion();
  showScreen("screen-test");
  startMainTimer();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    appState.integrity.visibilityChanges += 1;
  }
});

window.addEventListener("blur", () => {
  appState.integrity.blurCount += 1;
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme();

  $("themeToggle").addEventListener("click", toggleTheme);
  $("startBtn").addEventListener("click", () => showScreen("screen-student"));
  $("studentBackBtn").addEventListener("click", () => showScreen("screen-start"));
  $("studentNextBtn").addEventListener("click", goToInstructions);
  $("instructionsBackBtn").addEventListener("click", () => showScreen("screen-student"));
  $("instructionsNextBtn").addEventListener("click", beginTest);
  $("prevBtn").addEventListener("click", prevQuestion);
  $("nextBtn").addEventListener("click", nextQuestion);
  $("finishBtn").addEventListener("click", finishTest);
  $("continueAfterBreakBtn").addEventListener("click", continueAfterBreak);
  $("restartBtn").addEventListener("click", resetApp);
  $("sendBtn").addEventListener("click", sendPayload);
});
