/**
 * isaya 官網 — 商品卡共用渲染（index / products / services 共用）
 * 暴露：window.renderProductCard(p), window.fillProductGrid(el, list)
 * 圖片：走 api.js 的候選 + onerror 回退（見「圖片規則.md」）；relic 選 no1~no7 會換圖。
 * 「加入購物車」：依 select 選的 option 加一筆，toast 提示。
 */
(function () {
  var ISAYA = window.ISAYA;

  function priceHTML(p) {
    if (p.consult) return '<span class="tag-consult">洽詢價</span>';
    if (!p.price) return '<span class="product-price">依規格</span>';
    return '<span class="product-price"><span class="cur">NT$</span>' + p.price + '</span>';
  }

  // 2026-10-13 卡片簡化：只留 品名／價格／規格，全部文字＝詳細說明連結（p.id/ 靜態頁）；加購改購物車圖示
  var CART_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';

  function renderProductCard(p) {
    var hasOpts = p.options && p.options.length > 1;
    var detailUrl = p.id + '/';

    // 圖片：img + 占位成對輸出，由 api.js bindPair 決定顯示哪個
    // （檔案缺失會自動回退舊圖 → 占位符，絕不破圖）
    var imgHTML =
      '<img class="product-img" data-pimg="' + p.id + '" src="" alt="' + p.name + '" loading="lazy">' +
      '<div class="product-img-ph">' + (p.type === 'service' ? '☸' : '◎') + '</div>';

    var optHTML = '';
    if (hasOpts) {
      optHTML = '<div class="product-optselect"><label>' +
        (!p.price ? '規格' : '加購') + '</label><select data-prodid="' + p.id + '">' +
        p.options.map(function (o) {
          return '<option value="' + o.id + '">' + o.label +
            (o.surcharge ? '（+' + o.surcharge + '）' : '') + '</option>';
        }).join('') +
        '</select></div>';
    }

    var priceLink = '<a class="price-link" href="' + detailUrl + '">' + priceHTML(p) + '</a>';
    var note = p.price_note ? '<a class="product-note" href="' + detailUrl + '">' + p.price_note + '</a>' : '';

    return '<div class="product-card" data-id="' + p.id + '">' +
      imgHTML +
      '<div class="product-body">' +
        '<a class="product-name" href="' + detailUrl + '">' + p.name + '</a>' +
        '<div class="product-price-row">' + priceLink + ' ' + note + '</div>' +
        optHTML +
        '<div class="cart-row">' +
          '<button class="btn-cart" data-add="' + p.id + '" title="加入購物車" aria-label="加入購物車：' + p.name + '">' + CART_SVG + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // 圖片：依「目前選到的 option」取候選（relic 依 option 換圖）
  function optOf(cardEl, p) {
    var sel = cardEl.querySelector('select[data-prodid]');
    return sel ? sel.value : (p.options && p.options[0] ? p.options[0].id : '');
  }
  function bindCardImg(cardEl, p) {
    var imgEl = cardEl.querySelector('img[data-pimg]');
    var phEl = cardEl.querySelector('.product-img-ph');
    if (window.ISAYA_API && ISAYA_API.bindPair) ISAYA_API.bindPair(imgEl, phEl, p, optOf(cardEl, p));
  }

  function bindGrid(el) {
    el.querySelectorAll('.product-card').forEach(function (cardEl) {
      var p = ISAYA.getProduct(cardEl.getAttribute('data-id'));
      if (!p) return;
      bindCardImg(cardEl, p);
      var sel = cardEl.querySelector('select[data-prodid]');
      if (sel) sel.onchange = function () { bindCardImg(cardEl, p); };
    });
    el.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.onclick = function () {
        var pid = btn.getAttribute('data-add');
        var p = ISAYA.getProduct(pid);
        if (!p) return;
        var sel = btn.parentElement.parentElement.querySelector('select');
        var optId = sel ? sel.value : (p.options && p.options[0] ? p.options[0].id : '');
        ISAYACart.add(pid, optId, 1);
        window.isayaToast('已加入購物車：' + p.name);
      };
    });
  }

  function fillProductGrid(el, list) {
    if (!el) return;
    el.innerHTML = list.map(renderProductCard).join('');
    bindGrid(el);
  }

  window.renderProductCard = renderProductCard;
  window.fillProductGrid = fillProductGrid;
})();
