/**
 * isaya 官網 — 導覽動態項（登入狀態）+ 購物車角標 + toast 共用模組
 *
 * 導覽依 Firebase 登入狀態顯示：
 *   未登入：Gmail 登入｜我的訂單
 *   已登入：姓名／email｜我的訂單｜登出
 *
 * 載入順序：top-menu.js 先於本檔（本檔依賴 #navLinks 已被建立）。
 * auth.js 必須先於本檔（提供 firebaseAuth）。
 */
(function () {
  function ensureNav() {
    var nav = document.getElementById('navLinks');
    return nav;
  }

  function clearDyn() {
    var nav = ensureNav();
    if (!nav) return;
    nav.querySelectorAll('.auth-dyn-item').forEach(function (li) { li.remove(); });
  }

  function addAuthNav(user) {
    var nav = ensureNav();
    clearDyn();
    if (!nav) return;

    function li(cls, html) {
      var el = document.createElement('li');
      el.className = 'auth-dyn-item ' + cls;
      el.style.fontSize = '.85rem';
      el.innerHTML = html;
      nav.appendChild(el);
      return el;
    }

    if (user) {
      var who = user.displayName || (user.email ? user.email.split('@')[0] : '會員');
      li('auth-user',
        '<a style="color:var(--gold);cursor:default;" title="' + (user.email || '') + '">' + who + '</a>');
      li('auth-logout',
        '<a href="javascript:void(0)" id="navLogout" style="color:var(--text-muted);">登出</a>');
      var lo = document.getElementById('navLogout');
      if (lo) lo.onclick = function () { firebaseAuth.signOut(); };
    } else {
      li('auth-login',
        '<a href="javascript:void(0)" id="navLogin" style="color:var(--gold);">Gmail 登入</a>');
      var ln = document.getElementById('navLogin');
      if (ln) ln.onclick = function () { firebaseAuth.signInWithGoogle(); };
    }
    li('orders-nav-item',
      '<a href="orders.html" style="color:var(--text-muted);">我的訂單</a>');
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
    if (window.ISAYACart) window.ISAYACart.updateBadge();
    if (window.firebaseAuth) {
      firebaseAuth.onAuthStateChanged(function (u) { addAuthNav(u); });
      addAuthNav(firebaseAuth.getCurrentUser());
    } else {
      // 保險：firebase SDK 未載入時至少掛「我的訂單」
      addAuthNav(null);
    }
  });

  // 購物車變動 → 觸發同頁表單重繪
  document.addEventListener('isaya:cart-changed', function (e) {
    var h = window.__onCartChanged;
    if (typeof h === 'function') h(e.detail);
  });
})();
