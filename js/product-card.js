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

  function renderProductCard(p) {
    var hasOpts = p.options && p.options.length > 1;

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

    var note = p.price_note ? '<span class="product-note">' + p.price_note + '</span>' : '';
    var stock = (typeof p.stock === 'string' && p.stock) ? '<div class="stock-line">' + p.stock + '</div>' : '';

    return '<div class="product-card" data-id="' + p.id + '">' +
      imgHTML +
      '<div class="product-body">' +
        '<div class="product-name">' + p.name + '</div>' +
        '<div class="product-blurb">' + p.blurb + '</div>' +
        stock +
        '<div class="product-price-row">' + priceHTML(p) + ' ' + note + '</div>' +
        optHTML +
        '<div class="cart-row">' +
          '<a href="product.html?id=' + p.id + '">詳細說明</a>' +
          '<button class="btn-add" data-add="' + p.id + '">加入購物車</button>' +
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
