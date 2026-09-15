/**
 * isaya 官網 — 導覽動態項 + 購物車角標 + toast 共用模組
 *
 * PHASE 1（目前）：導覽只加「我的訂單」靜態連結；結帳走 FB 私訊，不須登入。
 * PHASE 2（GAS 啟用後）：改回依登入狀態顯示「Gmail 登入／姓名｜我的訂單｜登出」。
 *   屆時把 addOrdersNav() 換成 firebaseAuth.onAuthStateChanged 的全功能版本即可。
 *
 * 載入順序：top-menu.js 先於本檔（本檔依賴 #navLinks 已被建立）。
 */
(function () {
  function addOrdersNav() {
    var nav = document.getElementById('navLinks');
    if (!nav || nav.querySelector('.orders-nav-item')) return;
    var li = document.createElement('li');
    li.className = 'orders-nav-item';
    li.innerHTML = '<a href="orders.html" style="font-size:.85rem;">我的訂單</a>';
    nav.appendChild(li);
  }

  // 簡易 toast 提示
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }
  window.isayaToast = toast;

  document.addEventListener('DOMContentLoaded', function () {
    addOrdersNav();
    if (window.ISAYACart) window.ISAYACart.updateBadge();
  });

  // 購物車變動 → 觸發同頁表單重繪
  document.addEventListener('isaya:cart-changed', function (e) {
    var h = window.__onCartChanged;
    if (typeof h === 'function') h(e.detail);
  });
})();
