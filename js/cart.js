/**
 * isaya 官網 — 購物車邏輯（localStorage 持久化）
 * 存 key：isaya_cart = [{id, qty, optionId}]
 * 明細、金額、運費、計價全由 ISAYA 清單（GAS 清單）即時算出。
 */
(function () {
  var KEY = 'isaya_cart';
  var ISAYA = window.ISAYA;

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
    // 通知同頁的表單重繪
    document.dispatchEvent(new CustomEvent('isaya:cart-changed', { detail: { items: items } }));
  }

  window.ISAYACart = {
    all: load,

    clear: function () { save([]); },

    // 加入 / 累加一筆（qty 為本次加的量）
    add: function (id, optionId, qty) {
      var p = ISAYA.getProduct(id);
      if (!p || !p.on_sale) return;
      qty = qty || 1;
      if (!p.multi_qty) qty = 1; // 服務 / 單件品項固定 1
      var items = load();
      var found = items.find(function (i) { return i.id === id && i.optionId === optionId; });
      if (found) {
        found.qty += qty;
      } else {
        items.push({ id: id, optionId: optionId, qty: qty });
      }
      save(items);
    },

    setQty: function (id, optionId, qty) {
      var p = ISAYA.getProduct(id);
      qty = Math.max(1, parseInt(qty, 10) || 1);
      if (p && !p.multi_qty) qty = 1;
      var items = load().filter(function (i) { return !(i.id === id && i.optionId === optionId); });
      if (qty > 0) items.push({ id: id, optionId: optionId, qty: qty });
      save(items);
    },

    remove: function (id, optionId) {
      save(load().filter(function (i) { return !(i.id === id && i.optionId === optionId); }));
    },

    count: function () {
      return load().reduce(function (s, i) { return s + (i.qty || 0); }, 0);
    },

    // 明細 + 計價（含運費）
    detail: function () {
      var items = load();
      var lines = [];
      for (var k = 0; k < items.length; k++) {
        var i = items[k];
        var p = ISAYA.getProduct(i.id);
        if (!p) continue;   // 商品資料未載入或已下架 → 略過（不計價、不結帳）
        var opt = ISAYA.getOption(p, i.optionId);
        var unit = ISAYA.lineUnitPrice(p, i.optionId);
        var hasPrice = unit !== null;
        var lineTotal = hasPrice ? unit * (i.qty || 1) : null;
        lines.push({
          id: p.id, qty: i.qty || 1, optionId: i.optionId,
          name: p.name, optLabel: opt ? opt.label : '',
          unit: unit, lineTotal: lineTotal,
          consult: !!p.consult, group_order: !!p.group_order, multi_qty: !!p.multi_qty
        });
      }

      var goods = lines.reduce(function (s, l) { return s + (l.lineTotal || 0); }, 0);
      var shipping = 0;
      if (goods > 0) {
        shipping = goods >= ISAYA.SHIPPING.freeThreshold ? 0 : ISAYA.SHIPPING.base;
      }
      var hasConsult = lines.some(function (l) { return l.consult; });
      var hasGroup = lines.some(function (l) { return l.group_order; });
      return { lines: lines, goods: goods, shipping: shipping, total: goods + shipping,
               hasPrice: goods > 0, hasConsult: hasConsult, hasGroup: hasGroup };
    },

    // 頂欄角標
    updateBadge: function () {
      var b = document.getElementById('cartBadge');
      if (!b) return;
      var n = this.count();
      b.textContent = n;
      b.style.display = n ? 'inline-block' : 'none';
    }
  };

  function updateBadge() { window.ISAYACart.updateBadge(); }

  document.addEventListener('DOMContentLoaded', function () {
    updateBadge();
  });
})();
