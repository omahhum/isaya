/**
 * isaya 官網 — 商品/服務清單（本地 fallback，同時是目前主要來源）
 * 待 Google Sheets + GAS 部署後，由 js/api.js 的 loadProducts() 用後端清單覆蓋此表。
 *
 * 結構：
 * {
 *   id, name, type: 'product'|'service',
 *   price,            // 單價（NT$）；洽詢品為 null
 *   consult,          // true = 洽詢價
 *   group_order,      // true = 成團才印，結帳後提示「成團後通知付款」
 *   multi_qty,        // true = 可調數量
 *   price_note,       // 價格補充說明
 *   options: [ {id,label,surcharge} ],   // 加購選項
 *   stock, on_sale, img, blurb, detail
 * }
 */

window.ISAYA = window.ISAYA || {};

// 運費規則：滿 2000 免運；未滿 150 元
window.ISAYA.SHIPPING = { freeThreshold: 2000, base: 150 };

// 外部連結（footer / 各頁共用）
window.ISAYA.LINKS = {
  fb: 'https://www.facebook.com/lightwishsoul/',
  fbPersonal: 'https://www.facebook.com/eshya.light',
  shopee: 'https://shopee.tw/jewelry69',
  shopee2: 'https://shopee.tw/shop/353675203/',
  blog: 'https://lightwishsoul.blogspot.com/',
  podcast: 'https://open.firstory.me/user/lightwishsoul/platforms',
  light: 'https://light.spiritstar.org/'
};

window.ISAYA.PRODUCTS = [
  // ── 結緣品（實體）────────────────────────
  {
    id: 'caibao-card',
    name: '財寶天王字壇城卡片',
    type: 'product',
    price: 360,
    multi_qty: true,
    price_note: 'A5/A6 大小卡各一張，一組含運',
    options: [
      { id: 'base', label: '原版（含運）', surcharge: 0 },
      { id: 'holofilm', label: '加貼大藏經光柵膜（=960元）', surcharge: 600 }
    ],
    stock: true, on_sale: true,
    img: "images/products/caibao-card.jpg",
    blurb: '全球獨一無二的財寶天王字曼陀羅開運招財朱印，当日修法祈請降臨加持，蓋上甘露王菩薩及聖曼陀羅朱印。',
    detail: [
      '與大家結緣無比殊勝、全球獨一無二的財寶天王字曼陀羅開運招財朱印。',
      '所有的字曼陀羅都會在當日修法祈請財寶天王降臨加持，並蓋上甘露王菩薩及聖曼陀羅朱印。',
      '財寶天王字曼陀羅係顯雨師兄考究藏經，真實還原經中記載的多款曼陀羅結合為一，每一尊書寫上去的神名都是佛經記載的真名。',
      '文字聖壇、字曼陀羅是自古就有的供奉形式。文字的力量並不會比畫像差，甚至還更為強大，特別是中文字的神聖靈力，是現存古文明文字中極為強力的存在。',
      '可以夾在書桌或辦公桌墊上，或自行護貝護膜供奉，放書包公事包等，只要心懷恭敬，百無禁忌。不需要常去廟裡回爐充電。',
      '日後使用若有老舊破損髒污而不堪使用，或因故不適配戴供奉者，只需在任何佛菩薩像前恭敬頂禮、感恩奉送，然後直接火化即可，沒有任何傳統宮廟符法的手尾禁忌。',
      '每組結緣價 360 元（含運費）。加貼大藏經光柵膜版，額外 +600 元 = 960 元。'
    ]
  },
  {
    id: 'gulugue-thangka',
    name: '秘制咕嚕咕咧佛母閃亮唐卡',
    type: 'product',
    price: 360,
    multi_qty: true,
    price_note: '每張（含運）',
    options: [
      { id: 'base', label: '原版（含運）', surcharge: 0 },
      { id: 'holofilm', label: '加貼大藏經光柵膜', surcharge: 500 }
    ],
    stock: true, on_sale: true,
    img: "images/products/gulugue-thangka.jpg",
    blurb: '作明佛母（咕嚕咕咧佛母），懷愛法中最強大的兩大本尊之一。正面亮銀面閃卡材質，聖輪宗特別繪製。',
    detail: [
      '作明佛母，藏傳佛教又稱為咕嚕咕咧佛母，漢地佛經記載的名稱是酤羅菩薩，是懷愛法中最強大的兩大本尊之一（另一為愛染明王）。',
      '此唐卡正面為亮銀面閃卡材質，本尊形象為聖輪宗特別繪製，具有與眾不同的懷愛加持力。',
      '懷愛法又叫做敬愛法，乃促進人緣、親和力、個人吸引力、感情、親密度等相關聯特質的加持法門，包括男女感情、家庭和諧、姻緣，以及業務類工作運、明星網紅的知名度、曝光度、事業運等，有需要面對很多人展現個人魅力、吸引力或親和力的工作上，也有很大的加持幫助。',
      '背面要寫上自己身份證上的姓名，或工作用的名稱（名片名字、網路頻道名稱、ID 等），能夠與自己的需求加強連結，使加持力更快速產生效果。',
      '放在隨身的包包或皮夾、書桌辦公桌、床頭、佛堂壇城等都很好，最好是自己天天看得到，並方便對著唐卡持誦心咒的地方。每天抽出時間多持誦作明佛母心咒，連結度越高，感應越快越明顯，加持力越大。',
      '結緣價每張 360 元（含運）。加貼大藏經光柵膜：額外 +500 元。'
    ]
  },
  {
    id: 'umbrella',
    name: '超強辟邪護身流蘇傘蓋',
    type: 'product',
    price: 0,
    multi_qty: false,
    price_note: '依佛塔座數選擇規格（不含瓔珞）',
    options: [
      { id: 't36', label: '36 座大藏經光柵膜佛塔', surcharge: 16200 },
      { id: 't49', label: '49 座大藏經光柵膜佛塔', surcharge: 19600 },
      { id: 't72', label: '72 座大藏經光柵膜佛塔', surcharge: 25200 },
      { id: 't108', label: '108 座大藏經光柵膜佛塔', surcharge: 32400 }
    ],
    stock: '現貨依備品，不足時排隊趕製', on_sale: true,
    img: "images/products/umbrella.jpg",
    blurb: '「大藏經光柵膜佛塔 - 辟邪護身傘蓋套組」，考慮良久並親身實驗近一年後才決定的強效辟邪護身方便法門。',
    detail: [
      '「大藏經光柵膜佛塔 - 辟邪護身傘蓋套組」是我們考慮良久、並親身實驗將近一年之後，才決定跟同修們分享的超級法寶。',
      '目的就是為了提供一個強效、速效、辟邪護身的方便法門，讓正遭遇到強大困難的同修，可以馬上獲得一個依靠，得到一個可以安心休息的避風港、可以阻擋外來干擾的守護堡壘。',
      '此套組是以內含大藏經光柵膜的藥香塔為主要結構，上附掛勾或吊線，用以懸掛公主帳、流蘇傘，搭成一個專屬於個人的超強力守護結界。',
      '因應每個人所遇到的障礙大小、以及經濟能力考量，分 36 座、49 座、72 座、以及 108 座佛塔等四個組合：',
      '  36 座 16200 元（平均單塔 450 元）',
      '  49 座 19600 元（平均單塔 400 元）',
      '  72 座 25200 元（平均單塔 350 元）',
      '  108 座 32400 元（平均單塔 400 元）',
      '（不含瓔珞）公主帳、流蘇傘請依個人喜好或按房間大小自行丈量選擇款式購買，本套組不提供、也不代購。',
      '我們會在修行與弘法工作之餘盡力製作備品，但如果同時間結緣的人數太多、備品不足時，還請同修們耐心排隊等候，我們會調整工作時程為您盡快趕製。',
      '建議：對個人來說，只要自己有足夠的信心與誠心，一座佛塔跟 108 座佛塔並沒有什麼分別。一座佛塔、一部經文、一句咒語，功德便是不可思議的強大。'
    ]
  },
  {
    id: 'mirror-mandala',
    name: '鏡面聖曼陀羅',
    type: 'product',
    price: 1680,
    multi_qty: false,
    price_note: '限量結緣；含說明書，前 100 名加贈結緣品',
    options: [
      { id: 'base', label: '標準', surcharge: 0 }
    ],
    stock: '尚有庫存（限量）', on_sale: true,
    img: "images/products/mirror-mandala.jpg",
    blurb: '順心自在、隨求滿願的神聖曼陀羅。全鋁合金雷雕上色，表層 1mm 透明保護墊，防鏽防蝕、耐曬耐熱。',
    detail: [
      '順心自在、隨求滿願的神聖曼陀羅。',
      '曼陀羅在國外又稱為 Magic Circle（神奇之圓），在幾何圖形上書寫咒文，用以祈福、召喚神靈幫助、或配戴為幸運符。本次公開的曼陀羅考究經典甚多，咒文結構多以古梵文書寫，皆有所出經典依據，是多年跟隨的老師所設計，已獲授權公開推廣。',
      '可用来安家鎮宅、給神像開光、結界守護、淨化水晶、觀修大悲水、收驚防煞、招財擋小人等，功效皆有經典真實記載。',
      '全鋁合金雷雕上色，表層有厚達 1mm 的透明保護墊，防鏽防蝕、耐曬耐熱，放在戶外多年也不會褪色，不怕颱風、不怕撞擊（凸透鏡、山海鎮是玻璃做的，怕撞擊）。',
      '我們會再附一本說明書，介紹曼陀羅的設計以及咒文的經典考究，讓您明白為什麼曼陀羅會有這麼神奇的效果。',
      '限量結緣，NT$1680。前 100 名加贈三大超級結緣品（增生舍利子、護符、金剛光明砂／護摩灰，依現貨二選一，名額以實際為准）。'
    ]
  },
  {
    id: 'relic',
    name: '老料龍宮舍利',
    type: 'product',
    price: 0,
    multi_qty: false,
    price_note: '收藏二十年以上老礦，依編號選擇',
    options: [
      { id: 'no1', label: 'No.1 歲月凝珠・珊瑚舍利墜', surcharge: 4000 },
      { id: 'no2', label: 'No.2 沉靜之黑・黑金剛老礦墜（12.8g）', surcharge: 3600 },
      { id: 'no3', label: 'No.3 綻放於石中的暖陽・珊瑚舍利（約13g）', surcharge: 3600 },
      { id: 'no4', label: 'No.4 覺知的焦點・老礦核心舍利眼墜（約8g）', surcharge: 3800 },
      { id: 'no5', label: 'No.5 瓷化・白金剛/骨舍利（約32g）', surcharge: 4500 },
      { id: 'no6', label: 'No.6 多眼珊瑚舍利（約12.9g）', surcharge: 3800 },
      { id: 'no7', label: 'No.7 絲絹水波紋・龍宮珍品（約15.7g）', surcharge: 4200 }
    ],
    stock: '每件為斷代珍藏，售出即止', on_sale: true,
    img: "images/products/relic.jpg",
    blurb: '收藏超過二十年、完全沒有配戴過的珍品龍宮舍利，僅收藏保養，為共修中心壇城改建而釋出。',
    detail: [
      '這些超過二十年的珍品，完全沒有配戴過，僅只於收藏、保養，看上去都很漂亮，時間沒有在上面留下任何痕跡。',
      '如今拿出來與同修分享結緣：一來是自身修持本來就沒有很依賴龍宮舍利；二是仍有一些舍利供在壇城上多年，這些就不方便結緣；自己配戴過的當然也不可能結緣。最後，是為了共修中心的壇城改建。',
      '為貫徹「不無償接受捐款供養」的理念，故將這批珍藏很久的老礦龍宮舍利與大家結緣。在老礦已絕跡的當下，每一件都是「用一件、少一件」的斷代珍藏，僅釋出給懂得讀懂時光價值的精準藏家。',
      '各編號：No.1 珊瑚舍利墜 4000／No.2 黑金剛老礦墜 3600／No.3 珊瑚舍利 3600／No.4 核心舍利眼墜 3800／No.5 白金剛/骨舍利 4500／No.6 多眼珊瑚舍利 3800／No.7 絲絹水波紋 4200。'
    ]
  },
  {
    id: 'xuanzhi-mandala',
    name: '宣紙手寫 財寶天王 字曼陀羅',
    type: 'product',
    price: 12800,
    multi_qty: true,
    price_note: '每幅（含大藏經光柵膜 x3）',
    options: [
      { id: 'base', label: '標準（含光柵膜 x3）', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: '',
    blurb: '宣紙手寫財寶天王字曼陀羅，每幅含大藏經光柵膜 x3。',
    detail: [
      '宣紙手寫財寶天王字曼陀羅，每幅 12800 元（含大藏經光柵膜 x3）。',
      '文字曼陀羅係依藏經真實還原經中記載的曼陀羅，書寫神名皆為佛經真名，具顯雨師兄考究之完整財寶天王眷屬陣容。',
      '可護貝護膜供奉，放書桌、佛堂、壇城，恭敬合掌禮拜即可，百無禁忌。'
    ]
  },
  {
    id: 'wealth-note',
    name: '招財紙鈔（團印）',
    type: 'product',
    price: 720,
    multi_qty: false,
    group_order: true,
    price_note: '一份 600 張；成團後印刷寄送',
    options: [
      { id: 'base', label: '一份 600 張', surcharge: 0 }
    ],
    stock: '數量足夠，成團才印刷寄送', on_sale: true,
    img: '',
    blurb: '全新版招財紙鈔，修持財神法最佳輔助用品。一份 600 張 720 元，運費 150。',
    detail: [
      '全新版招財紙鈔，修持財神法最佳輔助用品。',
      '一份 600 張，720 元，運費 150 元。',
      '每期團印時間不定，數量足夠、成團才印刷寄送。請關注粉絲專頁最新發佈訊息，才能趕上團印。',
      '結帳後將提示「成團後通知付款」，管理端確認成團再通知。'
    ]
  },
  // ── 祈福服務 ───────────────────────────
  {
    id: 'candle-light',
    name: '點燈祈福',
    type: 'service',
    price: 200,
    multi_qty: true,
    price_note: '每顆 200 元；代點後會拍照傳訊給你',
    options: [
      { id: 'base', label: '每顆 200 元', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: "images/services/candle-light.jpg",
    blurb: '在香海所供奉的壇城、佛塔、轉經輪前為你專門點上祈願蠟燭、小油燈，將供燈功德迴向給你所想祈求的事項。',
    detail: [
      '在香海所供奉的壇城、佛塔、轉經輪前為你專門點上祈願蠟燭、小油燈，將供燈的功德迴向給你所想祈求的事項。',
      '代點的蠟燭，會拍照傳訊給你。結緣價新台幣 200 元／顆。'
    ]
  },
  {
    id: 'incense-seal',
    name: '大悲拔苦香印代點服務',
    type: 'service',
    price: 350,
    multi_qty: true,
    price_note: '一盤 350 元；每日同時僅 5 個名額（香爐 5 座）',
    options: [
      { id: 'base', label: '一盤 350 元', surcharge: 0 }
    ],
    stock: '每日同時僅 5 個名額', on_sale: true,
    img: "images/services/incense-seal.jpg",
    blurb: '觀自在菩薩大悲智印周遍法界利益眾生薰真如法（又名觀自在妙香印法），一盤大悲拔苦熏香。',
    detail: [
      '大悲拔苦熏香代點服務，一盤結緣價 350 元，每日同時只開放 5 個名額（香爐暫時只有 5 座）。',
      '依據「觀自在菩薩大悲智印周遍法界利益眾生薰真如法」（又名觀自在妙香印法）。若人持此一字真言，能除一切災禍疾病，命終之後當得極樂上品之生，餘諸所求世間出世大願隨持得成。'
    ]
  },
  {
    id: 'personal-practice',
    name: '個人專法（包月）',
    type: 'service',
    price: 2680,
    multi_qty: false,
    price_note: '每人每月 2680 元；不限名額',
    options: [
      { id: 'base', label: '包月', surcharge: 0 }
    ],
    stock: '不限名額', on_sale: true,
    img: "images/services/personal-practice.jpg",
    blurb: '當月份報名者集體擺供、個人單獨祈福卡，每月不同主尊、殊勝日修不同法。',
    detail: [
      '2026.04 起「個人專法」更改為法會 [包月] 贊助功德主，不限名額，並開放更多小額、隨喜的法會參贊項目，供更多想要祈福加持的同修依個人情況選擇報名。',
      '個人專法（包月）：結緣贊助 2680 元／人。#所得用於弘法及共修中心維運',
      '當月份報名者：集體擺供、每個人單獨一張祈福卡、每月不同的主尊、每人個別單獨祈福加持、每月殊勝日修不同的法（小火供爐／千塔壇城／大火供爐），不同的主尊、供品、擺設、法器也都不同。'
    ]
  },
  // ── 線上課程（洽詢價）──────────────────
  {
    id: 'akashic-record',
    name: '阿卡西記錄解讀',
    type: 'service',
    price: null,
    consult: true,
    multi_qty: false,
    price_note: '每 30 分鐘；洽詢價',
    options: [
      { id: 'base', label: '每 30 分鐘', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: '',
    blurb: '隸屬於阿賴耶識之下，透過阿賴耶識的連結，比一般阿卡西解讀更直擊人心。',
    detail: [
      '阿卡西記錄隸屬於阿賴耶識之下，透過阿賴耶識的連結，能比一般的阿卡西記錄解讀更加深入、更直擊人心。',
      '香海能透過：1. 自出生便有記憶、天生通靈的天賦；2. 長年對神念功法、對佛教的修行；3. 超過三十年對心靈成長、靈修、占卜通靈問事的經驗，來幫助大家經驗這「假名為阿卡西記錄（實為阿賴耶識）」的超意識旅程。',
      '你會成為體驗者、參與者、自我解讀者，並與香海互相驗證彼此所感知的訊息、覺察到的能量變化、看到的畫面。每人次每 30 分鐘，洽詢價（私訊洽詢）。'
    ]
  },
  {
    id: 'light-course',
    name: '光的課程第一級',
    type: 'service',
    price: null,
    consult: true,
    multi_qty: false,
    price_note: '線上引導為主、讀書為輔，共十堂課；洽詢價',
    options: [
      { id: 'base', label: '共十堂課', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: '',
    blurb: '光的課程第一級，線上引導為主、讀書為輔，共十堂課。',
    detail: [
      '光的課程第一級：線上引導為主、讀書為輔，共十堂課，洽詢價（私訊洽詢）。'
    ]
  },
  {
    id: 'shennian-chakra',
    name: '神念九脈輪線上共修',
    type: 'service',
    price: null,
    consult: true,
    multi_qty: false,
    price_note: '一梯次十堂，晚 9 點、每堂 1 小時；洽詢價',
    options: [
      { id: 'base', label: '一梯次十堂', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: '',
    blurb: '線上共修，一梯次十堂，每堂 1 小時。',
    detail: [
      '神念九脈輪線上共修：一梯次十堂，時間晚上 9 點、時長 1 小時，洽詢價（私訊洽詢）。'
    ]
  },
  {
    id: 'tarot-advanced',
    name: '塔羅牌占卜（進階）',
    type: 'service',
    price: null,
    consult: true,
    multi_qty: false,
    price_note: '每 30 分鐘；限同一問題、不更換；洽詢價',
    options: [
      { id: 'base', label: '每 30 分鐘', surcharge: 0 }
    ],
    stock: true, on_sale: true,
    img: '',
    blurb: '進階說明或個案處理。簡易占卜體驗優惠價請至蝦皮。',
    detail: [
      '塔羅牌占卜：簡易占卜體驗優惠價請至蝦皮；進階說明或個案處理，每人次每 30 分鐘（限同一問題、不更換），洽詢價（私訊洽詢）。'
    ]
  }
];

// ── 查詢輔助 ───────────────────────────
window.ISAYA.getProduct = function (id) {
  return window.ISAYA.PRODUCTS.find(function (p) { return p.id === id; });
};

window.ISAYA.getOption = function (p, optionId) {
  if (!p.options || !p.options.length) return { id: '', label: '', surcharge: 0 };
  return p.options.find(function (o) { return o.id === optionId; }) || p.options[0];
};

// 單價（含加購）；洽詢品回 null
window.ISAYA.lineUnitPrice = function (p, optionId) {
  if (p.consult) return null;
  var opt = window.ISAYA.getOption(p, optionId);
  return (p.price || 0) + (opt ? opt.surcharge : 0);
};

// 依 type 分組
window.ISAYA.byType = function (type) {
  return window.ISAYA.PRODUCTS.filter(function (p) { return p.type === type && p.on_sale; });
};
