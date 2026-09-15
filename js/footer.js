/**
 * isaya 官網 — 純靜態 footer
 * 只負責渲染頁底版權區，不含任何 auth/logic
 * 使用方式：HTML </body> 前放 <div id="footer-placeholder"></div> + 本檔
 */
(function () {
  var L = window.ISAYA ? window.ISAYA.LINKS : {};
  var el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.outerHTML =
`<footer class="footer">
  <div class="footer-logo">光圻靈的伊夏亞</div>
  <div class="footer-tag">光麒麟 伊夏亞 isaya</div>
  <div class="footer-links">
    <a href="products.html">結緣品</a>
    <a href="services.html">祈福服務</a>
    <a href="orders.html">我的訂單</a>
    <a href="buddha-chip.html">佛咒晶片vs光柵膜</a>
  </div>
  <div class="footer-ext">
    <a href="${L.fb}" target="_blank" rel="noopener">Facebook 粉專</a>
    <a href="${L.shopee}" target="_blank" rel="noopener">蝦皮賣場</a>
    <a href="${L.blog}" target="_blank" rel="noopener">阿卡西網誌</a>
    <a href="${L.podcast}" target="_blank" rel="noopener">Podcast 線上電台</a>
    <a href="${L.light}" target="_blank" rel="noopener">佛碟輪藏說明</a>
  </div>
  <p class="footer-copy">© 2026 光圻靈的伊夏亞 isaya。#所得用於弘法及共修中心維運</p>
</footer>`;
})();
