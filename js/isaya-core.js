/**
 * isaya 官網 — 前端核心：命名空間 / 運費規則 / 外部連結 / 查詢函數。
 * ⚠️ 此檔「不含任何價格、庫存、選項、簡介」資料。
 * 商品的 price / stock / options / on_sale / blurb 一律以 Google Sheet（經 GAS）為唯一來源，
 * 由 js/api.js 的 loadProducts() 填入 ISAYA.PRODUCTS。本檔只提供：
 *   - ISAYA.PRODUCTS：開頭為空陣列，GAS 讀取成功前不顯示、不加購、不結帳（fail-closed）。
 *   - SHIPPING 運費規則、LINKS 外部連結（靜態，非商品價格）。
 *   - 查詢函數 getProduct / getOption / lineUnitPrice / byType（對 GAS 填入的 PRODUCTS 運算）。
 */
window.ISAYA = window.ISAYA || {};

// 商品清單：開頭為空。GAS 讀取成功前，ISAYA.PRODUCTS_READY === false，
// 各錢頁應 showLoading／停用加購結帳，絕不用任何本機舊價備胎。
window.ISAYA.PRODUCTS = [];
window.ISAYA.PRODUCTS_READY = false;

// 運費規則：滿 2000 免運；未滿 150 元（靜態規則，非商品價）
window.ISAYA.SHIPPING = {"freeThreshold":2000,"base":150};

// 外部連結（footer / 各頁共用）
window.ISAYA.LINKS = {"fb":"https://www.facebook.com/lightwishsoul/","fbPersonal":"https://www.facebook.com/eshya.light","shopee":"https://shopee.tw/jewelry69","shopee2":"https://shopee.tw/shop/353675203/","blog":"https://lightwishsoul.blogspot.com/","podcast":"https://open.firstory.me/user/lightwishsoul/platforms","light":"https://light.spiritstar.org/"};

// ── 查詢輔助（對 GAS 填入的 PRODUCTS 運算；無資料時自然回空／null）──
window.ISAYA.getProduct = function (id) {
  return window.ISAYA.PRODUCTS.find(function (p) { return p.id === id; });
};

window.ISAYA.getOption = function (p, optionId) {
  if (!p || !p.options || !p.options.length) return { id: "", label: "", surcharge: 0 };
  return p.options.find(function (o) { return o.id === optionId; }) || p.options[0];
};

// 單價（含加購）；洽詢品回 null
window.ISAYA.lineUnitPrice = function (p, optionId) {
  if (!p) return null;
  if (p.consult) return null;
  var opt = window.ISAYA.getOption(p, optionId);
  return (p.price || 0) + (opt ? opt.surcharge : 0);
};

// 依 type 分組（只回 on_sale；資料未載入時回空陣列）
window.ISAYA.byType = function (type) {
  return window.ISAYA.PRODUCTS.filter(function (p) { return p.type === type && p.on_sale; });
};

// fail-closed 提示：商品資料讀不到時，各錢頁顯示此訊息並停用加購／結帳。
// 不使用任何本機舊價備胎。
window.isayaFailMsg = function (txt) {
  return '<div class="cart-empty" style="text-align:center;padding:2rem;">' +
    '<div style="font-size:2rem;color:var(--gold);margin-bottom:.5rem;">◎</div>' +
    '<p style="color:var(--text-muted);line-height:1.9;max-width:420px;margin:0 auto;">' +
    (txt || '商品資料暫無法載入，請稍後再試。') + '</p>' +
    '</div>';
};
