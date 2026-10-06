/**
 * isaya 官網 — 純靜態 footer
 * 左側：品牌名／英文名＋標語＋社羣（Instagram／Facebook／LINE）＋©
 * 使用方式：HTML </body> 前放 <div id="footer-placeholder"></div> + 本檔
 * 視覺（深紫灰＋金色細線、非純黑）在 css/style.css 的 .footer 規則
 */
(function () {
  var L = window.ISAYA ? window.ISAYA.LINKS : {};
  // Instagram / LINE 尚未於 ISAYA.LINKS 提供，暫用 # 占位（補真實網址後替換）
  var IG = window.ISAYA ? window.ISAYA.LINKS.instagram : '#';
  var LINE = window.ISAYA ? window.ISAYA.LINKS.line : '#';
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.outerHTML =
`<footer class="footer">
  <div class="footer__brand">
    <div class="footer__name">光祈靈的伊夏亞</div>
    <div class="footer__en">Light Wish Soul</div>
    <p class="footer__tag">「相信靈魂連結，遇見真正的自己。」</p>
    <div class="footer__social">
      <a class="footer__social-link" href="${IG}" target="_blank" rel="noopener">Instagram</a>
      <a class="footer__social-link" href="${L.fb}" target="_blank" rel="noopener">Facebook</a>
      <a class="footer__social-link" href="${LINE}" target="_blank" rel="noopener">LINE</a>
    </div>
    <p class="footer__copy">© Light Wish Soul - Eshya</p>
  </div>
</footer>`;
})();
