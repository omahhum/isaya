/**
 * isaya 官網 — GAS 後端封裝（商品清單 / 訂單）
 * 目前商品清單以本地 products.js 為主（fallback）。
 * GAS 部署後，loadProducts() 會嘗試拉後端清單覆蓋本地；失敗則保留本地。
 */
(function () {
  // ⚠️ 填入 isaya 專用 GAS Web App 部署 URL（部署前先用本地清單）
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ISAYA_PLACEHOLDER/exec';

  function okResponse(text) {
    // GAS 成功也回 302，response.ok 為 false，故以 body 含 'ok' 判斷
    return text && text.indexOf('ok') >= 0;
  }

  window.ISAYA_API = {
    // 載入商品清單：優先進後端；後端未就緒 / 失敗 → 回傳本地 fallback
    loadProducts: function () {
      return new Promise(function (resolve) {
        if (APPS_SCRIPT_URL.indexOf('ISAYA_PLACEHOLDER') >= 0) {
          resolve({ source: 'local', products: window.ISAYA.PRODUCTS });
          return;
        }
        fetch(APPS_SCRIPT_URL + '?action=getProducts')
          .then(function (r) { return r.text(); })
          .then(function (text) {
            var data = JSON.parse(text);
            if (data && Array.isArray(data.products) && data.products.length) {
              resolve({ source: 'remote', products: data.products });
            } else {
              resolve({ source: 'local', products: window.ISAYA.PRODUCTS });
            }
          })
          .catch(function () { resolve({ source: 'local', products: window.ISAYA.PRODUCTS }); });
      });
    }
  };
})();
