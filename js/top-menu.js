/**
 * isaya 官網 — 純靜態頂部導航列
 * 只負責渲染 NAV_ITEMS，不含任何 auth 邏輯。
 * auth nav item 由各 HTML 的 inline script 在 DOMContentLoaded 中追加。
 * 購物車角標（cartBadge）由 cart.js 更新。
 */

const NAV_ITEMS = [
  { href: 'index.html', label: '首頁' },
  { href: 'products.html', label: '結緣品' },
  { href: 'services.html', label: '祈福服務' },
  { href: 'testimonials.html', label: '見證回饋' },
  { href: 'about.html', label: '關於我' },
  { href: 'calendar.html', label: '修行日曆' }
];

function renderTopNav() {
  const navEl = document.getElementById('top-nav');
  if (!navEl) return;

  navEl.innerHTML =
`<nav class="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">光圻靈的伊夏亞</a>
    <ul class="nav-links" id="navLinks">
      ${NAV_ITEMS.map(item =>
        `<li><a href="${item.href}">${item.label}</a></li>`
      ).join('')}
      <li><a href="cart.html" class="nav-cart">購物車<span id="cartBadge" class="cart-badge" style="display:none">0</span></a></li>
    </ul>
    <button class="nav-mobile-btn" id="mobileBtn" aria-label="選單">☰</button>
  </div>
</nav>`;

  const btn = document.getElementById('mobileBtn');
  if (btn) btn.onclick = () => document.getElementById('navLinks').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', renderTopNav);
