/**
 * isaya 官網 — Light Wish Soul 精品靈性品牌 Header
 * 對 #top-nav 注入導覽列。auth 動態項（Gmail 登入／我的訂單／登出）
 * 由 auth-nav.js 依登入狀態追加到 #navLinks；購物車角標 #cartBadge 由 cart.js 更新。
 * LINE / Instagram / 聯絡我 的真實連結請填入 products.js 的 ISAYA.LINKS
 * （.line / .instagram / .contact），缺時以 # 佔位、不壞功能。
 */

const NAV_ITEMS = [
  { href: 'index.html',  label: '首頁' },
  { href: 'about.html',  label: '關於我' },
  { href: 'services.html', label: '療癒服務' },
  { href: 'products.html', label: '商品選物' },
  { href: '__blog',      label: '部落格' },
  { href: '__contact',   label: '聯絡我' },
];

function renderTopNav() {
  const navEl = document.getElementById('top-nav');
  if (!navEl) return;

  const L = (window.ISAYA && window.ISAYA.LINKS) ? window.ISAYA.LINKS : {};

  const items = NAV_ITEMS.map(item => {
    if (item.href === '__blog') {
      const blog = L.blog || '#';
      return `<li><a href="${blog}" target="_blank" rel="noopener">部落格</a></li>`;
    }
    if (item.href === '__contact') {
      const c = L.contact || '#';
      return `<li><a href="${c}"${c === '#' ? '' : ' target="_blank" rel="noopener"'}>聯絡我</a></li>`;
    }
    return `<li><a href="${item.href}">${item.label}</a></li>`;
  }).join('\n        ');

  const line = L.line || '#';
  const ig   = L.instagram || '#';
  const fb   = L.fb || '#';
  const social = (href, label) =>
    `<a class="nav-social__link" href="${href}"${href === '#' ? '' : ' target="_blank" rel="noopener"'} title="${label}">${label}</a>`;

  navEl.innerHTML =
`<nav class="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="光圻靈的伊夏亞 首頁">
      <img class="nav-logo__mark" src="https://lh3.googleusercontent.com/d/12ty9zoq5coMKbA7C0phJp14-Y1pK8HOF=w2000" alt="" width="160" height="160">
      <span class="nav-logo__box">
        <span class="nav-logo__cn">光圻靈的伊夏亞</span>
        <span class="nav-logo__en">Light Wish Soul</span>
      </span>
    </a>

    <div class="nav-drop">
      <ul class="nav-links" id="navLinks">
          ${items}
          <li><a href="cart.html" class="nav-cart" aria-label="選物清單">選物<span id="cartBadge" class="cart-badge" style="display:none">0</span></a></li>
      </ul>
      <div class="nav-tools">
        <div class="nav-social">
          ${social(line, 'LINE')}
          ${social(ig, 'Instagram')}
          ${social(fb, 'Facebook')}
        </div>
        <a class="nav-cta" href="services.html">預約諮詢</a>
      </div>
    </div>

    <button class="nav-mobile-btn" id="mobileBtn" aria-label="選單"><span></span><span></span><span></span></button>
  </div>
</nav>`;

  const btn = navEl.querySelector('#mobileBtn');
  const nav = navEl.querySelector('.nav');
  if (btn && nav) btn.onclick = () => nav.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', renderTopNav);
