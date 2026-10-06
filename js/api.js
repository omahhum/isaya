/**
 * isaya 官網 — GAS 後端封裝（商品清單 / 訂單）
 * 商品：本機 products.js 為底；loadProducts() 會拉後端清單合併進去（改價/庫存不用改網站）。
 * 圖片規則見「圖片規則.md」：img 欄填相對路徑，檔案缺失時自動回退舊圖→占位符，絕不破圖。
 */
(function () {
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_aYUGaSQV6u1QnkG4KuK_Wlisjj4vDpUxwq-JrglmDg8RZaq807IPsEn0QIjzZhQ/exec';

  var localImg = {};
  var loaded = null; // 同頁只 fetch 一次

  // 記錄本機舊圖（5 個品項有 lh3 網址），供後端 img 檔案缺失時回退
  function snapshotLocalImgs() {
    localImg = {};
    (window.ISAYA.PRODUCTS || []).forEach(function (p) { localImg[p.id] = p.img || ''; });
  }
  snapshotLocalImgs();

  function mergeIntoLocal(remote) {
    var local = window.ISAYA.PRODUCTS;
    remote.forEach(function (rp) {
      if (!rp.id) return;
      var ex = null;
      for (var i = 0; i < local.length; i++) if (local[i].id === rp.id) ex = local[i];
      var isNew = !ex;
      if (isNew) {
        ex = { id: rp.id, name: rp.name || rp.id, type: rp.type || 'product',
               options: [{ id: 'base', label: '標準', surcharge: 0 }] };
        local.push(ex);
      }
      // 價格／庫存／選項以試算表為準（改價、改庫存不用改網站）；
      // 行銷文案 blurb / detail / imgs 以官網為準（試算表只有一行，不能蓋掉整頁介紹）。
      ['name', 'type', 'price', 'consult', 'group_order', 'multi_qty',
       'price_note', 'options', 'stock', 'on_sale'].forEach(function (k) {
        if (rp[k] !== undefined && rp[k] !== '') ex[k] = rp[k];
      });
      if (rp.img) ex.img = rp.img;      // 主圖可試算表指定；圖廊/文案仍為本機
      ex.imgFb = localImg[ex.id] || '';  // 本機舊圖 fallback
    });
  }

  // 圖片候選順序：relic 選 no1~no7 → 專屬圖 → 品項 img（後端）→ 本機舊圖 imgFb
  function candidates(p, optionId) {
    var c = [];
    if (p && p.id === 'relic' && optionId && /^no\d+$/.test(optionId)) c.push('images/products/relic-' + optionId + '.jpg');
    if (p && p.img) c.push(p.img);
    if (p && p.imgFb && p.imgFb !== p.img) c.push(p.imgFb);
    return c;
  }

  /**
   * 綁定圖片：<img> 與占位 <div> 成對使用（依序排，同一時間只顯示一個）。
   * 圖檔不存在 → 依候選順序 fallback，全無則顯示占位符 ◎/☸，絕不破圖。
   * rebind（選項變更）會重試所有候選。
   */
  function bindPair(imgEl, phEl, p, optionId) {
    if (!imgEl) return;
    imgEl.dataset.tried = '';
    (function apply() {
      var tried = imgEl.dataset.tried ? imgEl.dataset.tried.split('|') : [];
      var cands = candidates(p, optionId);
      var src = '';
      for (var i = 0; i < cands.length; i++) if (tried.indexOf(cands[i]) === -1) { src = cands[i]; break; }
      if (!src) {
        imgEl.style.display = 'none';
        if (phEl) { phEl.textContent = p.type === 'service' ? '☸' : '◎'; phEl.style.display = ''; }
        return;
      }
      if (phEl) phEl.style.display = 'none';
      imgEl.style.display = '';
      imgEl.onerror = function () { tried.push(src); imgEl.dataset.tried = tried.join('|'); apply(); };
      imgEl.src = src;
    })();
  }

  window.ISAYA_API = {
    url: APPS_SCRIPT_URL,
    // 載入並合併後端商品；失敗 → 保留本機。回傳 {source:'remote'|'local', products}
    loadProducts: function () {
      if (loaded) return loaded;
      loaded = new Promise(function (resolve) {
        fetch(APPS_SCRIPT_URL + '?action=getProducts')
          .then(function (r) { return r.text(); })
          .then(function (text) {
            var data = null;
            try { data = JSON.parse(text); } catch (e) {}
            if (data && Array.isArray(data.products) && data.products.length) {
              mergeIntoLocal(data.products);
              resolve({ source: 'remote', products: window.ISAYA.PRODUCTS });
            } else {
              resolve({ source: 'local', products: window.ISAYA.PRODUCTS });
            }
          })
          .catch(function () { resolve({ source: 'local', products: window.ISAYA.PRODUCTS }); });
      });
      return loaded;
    },
    bindPair: bindPair,
    candidates: candidates
  };
})();
