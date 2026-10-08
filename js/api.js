/**
 * isaya 官網 — GAS 後端封裝（商品清單 / 訂單）
 * 商品：本機 products.js 為底；loadProducts() 會拉後端清單合併進去（改價/庫存不用改網站）。
 * 圖片規則見「圖片規則.md」：img 欄填相對路徑，檔案缺失時自動回退舊圖→占位符，絕不破圖。
 */
(function () {
  var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_aYUGaSQV6u1QnkG4KuK_Wlisjj4vDpUxwq-JrglmDg8RZaq807IPsEn0QIjzZhQ/exec';

  var localImg = {};
  var loaded = null; // 同頁只 fetch 一次

  // 記錄本機舊圖（5 個品項有 lh3 網址），供後端 img 檔案缺失時回退
  function snapshotLocalImgs() {
    localImg = {};
    (window.ISAYA.PRODUCTS || []).forEach(function (p) { localImg[p.id] = p.img || ''; });
  }
  snapshotLocalImgs();

  function mergeIntoLocal(remote) {
    var local = window.ISAYA.PRODUCTS;
    remote.forEach(function (rp) {
      if (!rp.id) return;
      var ex = null;
      for (var i = 0; i < local.length; i++) if (local[i].id === rp.id) ex = local[i];
      var isNew = !ex;
      if (isNew) {
        ex = { id: rp.id, name: rp.name || rp.id, type: rp.type || 'product',
               options: [{ id: 'base', label: '標準', surcharge: 0 }] };
        local.push(ex);
      }
      // 價格／庫存／選項以試算表為準（改價、改庫存不用改網站）；
      // 行銷文案 blurb / detail / imgs 以官網為準（試算表只有一行，不能蓋掉整頁介紹）。
      ['name', 'type', 'price', 'consult', 'group_order', 'multi_qty',
       'price_note', 'options', 'stock', 'on_sale'].forEach(function (k) {
        if (rp[k] !== undefined && rp[k] !== '') ex[k] = rp[k];
      });
      if (rp.img) ex.img = toDrive(rp.img);      // 主圖可試算表指定；圖廊/文案仍為本機
      ex.imgFb = localImg[ex.id] || '';  // 本機舊圖 fallback
    });
  }

  // 後端（試算表）img 欄若填「本機相對路徑」，改用對應的 Google Drive 直連。
  // Drive 資料夾結構與 website/images/ 完全相同（about/…/services/），對應表如下。
  var DRIVE_BY_LOCAL = {
    'images/about/cert1.jpg': 'https://lh3.googleusercontent.com/d/1WSPv3bSPAD3ZEdj3D_pLcLSGYoWqHsiy=w2000',
    'images/about/cert2.jpg': 'https://lh3.googleusercontent.com/d/12KZJYtY410lELOfWWHdvDQBg531xD8cj=w2000',
    'images/about/cert3.jpg': 'https://lh3.googleusercontent.com/d/1C7Yeg1wGjRl09g3lt8fczIsSES07I0DD=w2000',
    'images/about/cert4.jpg': 'https://lh3.googleusercontent.com/d/1jW-km3BLS1UaPqYiyD-5kMlb8Xf3s_BI=w2000',
    'images/about/cert5.jpg': 'https://lh3.googleusercontent.com/d/1w3sp3ZAKTd0rYOPptIUmx2vZpV9wlk3N=w2000',
    'images/about/cert6.jpg': 'https://lh3.googleusercontent.com/d/1JJWJWVKF0APXUFAWASEu2up4PWZrRbk5=w2000',
    'images/about/profile.jpg': 'https://lh3.googleusercontent.com/d/1gJ6etggoyFUWDTgzuOZAZ_zW9OqhhQtq=w2000',
    'images/avatars/u01.jpg': 'https://lh3.googleusercontent.com/d/1o1G9lOxMW2URCm7uOaU6XW0V0I_t1tcs=w2000',
    'images/avatars/u02.jpg': 'https://lh3.googleusercontent.com/d/1a07VFf-DGnZ-oXAEJgHxexL6gJdJM3gJ=w2000',
    'images/avatars/u03.jpg': 'https://lh3.googleusercontent.com/d/1lYyV2J0xzeRmahHVIzrrbcB94DDtTgjg=w2000',
    'images/banner/soul-light.jpg': 'https://lh3.googleusercontent.com/d/1hy5ODeHRARMVfLJuseJWOHBHYzKzlIJ9=w2000',
    'images/character/profile.jpg': 'https://lh3.googleusercontent.com/d/1BzQkxANN8N0SAq80ZuKaTcCuryo20FwJ=w2000',
    'images/gallery/g01.jpg': 'https://lh3.googleusercontent.com/d/1G5oBdlWBSWjmbP-9mFwESirQRyjEodDQ=w2000',
    'images/gallery/g02.jpg': 'https://lh3.googleusercontent.com/d/1pdNbvD3aAWRUbiZlRDB_CvwE_IQu5BxA=w2000',
    'images/gallery/g03.jpg': 'https://lh3.googleusercontent.com/d/14jSuTijzzxsMNDc4ToCcyR1EhP1Ujj1C=w2000',
    'images/gallery/g04.jpg': 'https://lh3.googleusercontent.com/d/1F8czv1z5A_X9B8SQbAArejdDwvIJlSAL=w2000',
    'images/gallery/g05.jpg': 'https://lh3.googleusercontent.com/d/1zxBgqgCA3Nn-5ILyTUEFgASeU_dyQykI=w2000',
    'images/hero/character.jpg': 'https://lh3.googleusercontent.com/d/19NSV3VnuDrbZlvYOjDvZWqD9IObfok0W=w2000',
    'images/lifestyle/l01.jpg': 'https://lh3.googleusercontent.com/d/1OjSTD-nPWzeEo0tVCCj5V4QZnQoA9BZX=w2000',
    'images/lifestyle/l02.jpg': 'https://lh3.googleusercontent.com/d/1cBenr5ktcap1SmHz2xIygGn1iujN6B2G=w2000',
    'images/lifestyle/l03.jpg': 'https://lh3.googleusercontent.com/d/1FSTSgoTVu4w82qApgOUT6opyPSKQaxxZ=w2000',
    'images/lifestyle/l04.jpg': 'https://lh3.googleusercontent.com/d/10001OIYu-8tjtQzjoO_neu6j0YkOy5Z6=w2000',
    'images/logo/apple-touch-icon.png': 'https://lh3.googleusercontent.com/d/1jaaMWF8K0lTmXkpsrvdY2ixPsqWxoUuC=w2000',
    'images/logo/favicon-64.png': 'https://lh3.googleusercontent.com/d/1kRDPazWalVm9aG7i8Nj--iVrRJUNqsMG=w2000',
    'images/logo/isaya-emblem-sm.png': 'https://lh3.googleusercontent.com/d/12ty9zoq5coMKbA7C0phJp14-Y1pK8HOF=w2000',
    'images/logo/isaya-emblem.png': 'https://lh3.googleusercontent.com/d/164ikRv-Jkh7FPOmTgrrGQnGY1LFPwRVQ=w2000',
    'images/logo/isaya-logo.png': 'https://lh3.googleusercontent.com/d/1sCxwqDI0VVj3Jun0yB2WQ-gIxMIruWyJ=w2000',
    'images/og/_base_light-wish-soul.jpg': 'https://lh3.googleusercontent.com/d/1FaclR0Ml__V6yht08jXB4XKzFT-GsaXf=w2000',
    'images/og/light-wish-soul.jpg': 'https://lh3.googleusercontent.com/d/1fVJLFi2Z9vwidqxFjvAn_IMjOWNoZI3g=w2000',
    'images/posts/p01.jpg': 'https://lh3.googleusercontent.com/d/1zaspqJwq4QbMbCNwSim8gAXLo3HOUvdk=w2000',
    'images/posts/p02.jpg': 'https://lh3.googleusercontent.com/d/1CoLku4VPrQRq7aQQmQw0LDQO8g4OGXeP=w2000',
    'images/posts/p03.jpg': 'https://lh3.googleusercontent.com/d/10BSegBt5CMQ218aomv3pcOdbnHaVhP9I=w2000',
    'images/posts/p04.jpg': 'https://lh3.googleusercontent.com/d/1BmsJVZec8L2HPHeSIb-VK43ovV0iQorF=w2000',
    'images/products/caibao-card.jpg': 'https://lh3.googleusercontent.com/d/18qnC4J9Kdom4fwg_JM2Oc9CrTOdkDzbW=w2000',
    'images/products/candel_light.jpg': 'https://lh3.googleusercontent.com/d/1mpq5eh46moUtEXTZZkI6cVt63GlOsMsK=w2000',
    'images/products/gulugue-thangka.jpg': 'https://lh3.googleusercontent.com/d/1SgxjF-lna_5vCJEiuL6HQJAXwJaFOjs5=w2000',
    'images/products/gulugue-thangka_01.png': 'https://lh3.googleusercontent.com/d/133bjdj_zw7MoBv-1lHGrVdDGp-vmFg-V=w2000',
    'images/products/gulugue-thangka_03.jpg': 'https://lh3.googleusercontent.com/d/1EXERmvtgyiUqte6ShOlKdyNsmw7l_RZt=w2000',
    'images/products/gulugue-thangka_04.jpg': 'https://lh3.googleusercontent.com/d/1yrcwwK6OJI78bmKAaJeVLQ8A8y0_JK6U=w2000',
    'images/products/gulugue-thangka_05.jpg': 'https://lh3.googleusercontent.com/d/1i5mayEiulzKVkWgZ4ITrjFJxbpdcw1Kp=w2000',
    'images/products/mirror-mandala.jpg': 'https://lh3.googleusercontent.com/d/1OtFSCxHyQ1VZ5IjDWgfdTqVDun84c7WD=w2000',
    'images/products/mirror-mandala_02.jpg': 'https://lh3.googleusercontent.com/d/12sXyHycMio0W2zNKXaG7huxikCAI2KdS=w2000',
    'images/products/mirror-mandala_03.jpg': 'https://lh3.googleusercontent.com/d/1fMOhZSmB-wkug7iefd7Gz5K9XazO0Yr9=w2000',
    'images/products/mirror-mandala_04.jpg': 'https://lh3.googleusercontent.com/d/1yrQg6aEfgp5UwbQ9XebJU437Wafh330A=w2000',
    'images/products/mirror-mandala_05.jpg': 'https://lh3.googleusercontent.com/d/1gaIgDdm9lY5zvl3AMVh0ZcAexpCX5Vp9=w2000',
    'images/products/mirror-mandala_06.jpg': 'https://lh3.googleusercontent.com/d/1fsCpzeA9DOMUhN1yPdANjBrnEf6VfOUI=w2000',
    'images/products/mirror-mandala_07.jpg': 'https://lh3.googleusercontent.com/d/1UB8333X7Xdwzjh1gHK463Er2YegEWl7m=w2000',
    'images/products/mirror-mandala_08.jpg': 'https://lh3.googleusercontent.com/d/1d8BOWNdNu9-GYwz-K7eabdQSI6lVpjbO=w2000',
    'images/products/mirror-mandala_09.png': 'https://lh3.googleusercontent.com/d/1WeGvhhZabrB9v_vl5_v8toszxOvyu7bz=w2000',
    'images/products/mirror-mandala_10.png': 'https://lh3.googleusercontent.com/d/1h0VeJo7hGUQljQdHu2IqB4b-mMU42721=w2000',
    'images/products/mirror-mandala_11.png': 'https://lh3.googleusercontent.com/d/1GmPHKkUyxmgv2ehaG8p9OhBjcPD5qJaq=w2000',
    'images/products/mirror-mandala_12.jpg': 'https://lh3.googleusercontent.com/d/136jLMDGzll4Pze2bMJrbCWjb0uDWulh8=w2000',
    'images/products/mirror-mandala_13.jpg': 'https://lh3.googleusercontent.com/d/1Y1ujj4GVuTxGpiDkxP2QhzNbKhsMIHXJ=w2000',
    'images/products/mirror-mandala_14.jpg': 'https://lh3.googleusercontent.com/d/1I7F1MFSnpxIwEPalpSDUNrtW-VhKCsM0=w2000',
    'images/products/mirror-mandala_15.jpg': 'https://lh3.googleusercontent.com/d/1bPqp95wfrlLImtV2M1RRPmiP1VNYptvw=w2000',
    'images/products/mirror-mandala_16.jpg': 'https://lh3.googleusercontent.com/d/1y4DKk6AyeBR5k-Jx5vDIQCd5IlIwrqwx=w2000',
    'images/products/relic-no1-detail.jpg': 'https://lh3.googleusercontent.com/d/1BTVA0oFk2IxWKMmqMswFBEqSzLxO25t7=w2000',
    'images/products/relic-no1.jpg': 'https://lh3.googleusercontent.com/d/1o2uL44qLv088h4a4LjH7L1dYoXokWUlS=w2000',
    'images/products/relic-no2-detail.jpg': 'https://lh3.googleusercontent.com/d/1npQkloxFj9lrP3Rw54eKPzIjJdkF6jXP=w2000',
    'images/products/relic-no2.jpg': 'https://lh3.googleusercontent.com/d/1qUA_bRbB9LOSt4B2vjUNwjUy-H24HpYD=w2000',
    'images/products/relic-no3-detail.jpg': 'https://lh3.googleusercontent.com/d/14odu1o6bLC1bikZkG3jbsxSbcuBLJA3Q=w2000',
    'images/products/relic-no3.jpg': 'https://lh3.googleusercontent.com/d/1DzqTOic4-_capiel83UULonCeBr36xyb=w2000',
    'images/products/relic-no4-detail.jpg': 'https://lh3.googleusercontent.com/d/13IVH9rstPLysHPAM7A_25BhS4VxOm0ua=w2000',
    'images/products/relic-no4.jpg': 'https://lh3.googleusercontent.com/d/1AUOERQGGYJdTzIlrQZMCBJPBBguG256u=w2000',
    'images/products/relic-no5-detail.jpg': 'https://lh3.googleusercontent.com/d/1ey_6FVeLiEH9NMEEIoH9q_uzKnSAifjT=w2000',
    'images/products/relic-no5.jpg': 'https://lh3.googleusercontent.com/d/1hEU_Y07vCrfYpy24da60ljlqqAPw3cei=w2000',
    'images/products/relic-no6-detail.jpg': 'https://lh3.googleusercontent.com/d/1V-nHnKQOFxvfdF2ecj9jnqrjYULZDq0q=w2000',
    'images/products/relic-no6.jpg': 'https://lh3.googleusercontent.com/d/1ZWG542xI4Erd1PPdNfZI6Jdp2X6QmtlD=w2000',
    'images/products/relic-no7-detail.jpg': 'https://lh3.googleusercontent.com/d/1rvKtzeDkfgasbCUUUcHkDCE6K2reU-Jk=w2000',
    'images/products/relic-no7.jpg': 'https://lh3.googleusercontent.com/d/17lLnVtai_BZNoxUvQ39fwB2m2eFnFW16=w2000',
    'images/products/relic.jpg': 'https://lh3.googleusercontent.com/d/15ZSxT5N4HtgcR0yxQpyD1UtIPmyX9Tld=w2000',
    'images/products/umbrella.jpg': 'https://lh3.googleusercontent.com/d/1CZloUlgBhM4m-px2-_rUviwFJvBzL9Qd=w2000',
    'images/products/umbrella_02.png': 'https://lh3.googleusercontent.com/d/1Se31Cl3mJyEbqatFN6thgZoymX-WlkBq=w2000',
    'images/products/umbrella_03.png': 'https://lh3.googleusercontent.com/d/1oKmBcbZHXX2X4gC3EiKNh2S747p5ajCI=w2000',
    'images/products/umbrella_04.jpg': 'https://lh3.googleusercontent.com/d/19nVhNszqK5oew9cvGL6ekpzJlqUnWfeI=w2000',
    'images/services/aroma.jpg': 'https://lh3.googleusercontent.com/d/1GGZMY5l_t2UCiB9r_ix_kP1D4xBImI3h=w2000',
    'images/services/candle-light.jpg': 'https://lh3.googleusercontent.com/d/1gKdG7_pxjQM9rHcQL_qIwkxa8VafYYnf=w2000',
    'images/services/candle.jpg': 'https://lh3.googleusercontent.com/d/1qZX_XSetJJmAxfEz64cBPTh6o3yJXHAn=w2000',
    'images/services/crystal.jpg': 'https://lh3.googleusercontent.com/d/1N5bcvjcrceh-Jj6MlekFmups-mP56Pom=w2000',
    'images/services/healing.jpg': 'https://lh3.googleusercontent.com/d/1KFXiZjeev7fv51du75zG_5COkJk5CGG3=w2000',
    'images/services/incense-seal.jpg': 'https://lh3.googleusercontent.com/d/168oJLDoJ6gY14lKGxw43wSHM7EALveY3=w2000',
    'images/services/incense-seal_01.jpg': 'https://lh3.googleusercontent.com/d/1Lt2DmyYBBf8YAw-6R78iyiTq6L81ksLp=w2000',
    'images/services/incense-seal_02.jpg': 'https://lh3.googleusercontent.com/d/1JtAQNGKiQMa89-ZHFCm3mG_9Ck0ZMUAM=w2000',
    'images/services/personal-practice.jpg': 'https://lh3.googleusercontent.com/d/1RewOxnvyNeXPcD18fLTyvkpZKD8dOKqc=w2000',
    'images/services/personal-practice_01.jpg': 'https://lh3.googleusercontent.com/d/1VOBDTL-BOWYUpkg3_tujz30JyV3ezgsQ=w2000',
    'images/services/personal-practice_02.jpg': 'https://lh3.googleusercontent.com/d/1Cj2q92AfkDBXTsIhdgGE84vdrrebNBfu=w2000',
    'images/services/personal-practice_03.jpg': 'https://lh3.googleusercontent.com/d/1yQUivkqBNo35w2E7sFAd9x4I66JbW7vb=w2000',
    'images/services/personal-practice_04.jpg': 'https://lh3.googleusercontent.com/d/1xVlP4atMck0-RunlE14odrRnGVcMOzW8=w2000',
    'images/services/personal-practice_05.png': 'https://lh3.googleusercontent.com/d/1oat6G-MijQXFHgKcQQo6JS2dH9lEonBB=w2000',
    'images/services/personal-practice_06.jpg': 'https://lh3.googleusercontent.com/d/1VGBQ73kE0BwhzKDgvxPwlbE3sdMEcZpx=w2000',
    'images/services/personal-practice_07.jpg': 'https://lh3.googleusercontent.com/d/1MbPLuj-8YrJ3Q61i-Rm9iOBfRI1L2bf-=w2000',
    'images/services/personal-practice_08.png': 'https://lh3.googleusercontent.com/d/1RT11noqZF4LYiK7YklKcQekvt04zRjHt=w2000',
    'images/services/personal-practice_09.jpg': 'https://lh3.googleusercontent.com/d/1eiT2eIxJ2aIGU65idKUFIzl4Cgbq9tPf=w2000',
    'images/services/personal-practice_10.jpg': 'https://lh3.googleusercontent.com/d/13dMQJ_ZkGtVhiThX9wS2ngJzXvKvlNhm=w2000',
    'images/services/personal-practice_11.jpg': 'https://lh3.googleusercontent.com/d/1GbU_koYMlAni3ZX5DJbC3ZlGFsAu-zoz=w2000',
    'images/services/personal-practice_12.png': 'https://lh3.googleusercontent.com/d/14EWiRu7KHtoI9Rxihe6ZekbEqHxS-GvD=w2000',
    'images/services/personal-practice_13.jpg': 'https://lh3.googleusercontent.com/d/1y4EDm4HAmEQGYbRB8xeb2-9rUdFOMQyD=w2000',
    'images/services/personal-practice_14.png': 'https://lh3.googleusercontent.com/d/1lIUtInKw0eloDKtCuNlms1Sy49Q6S4Is=w2000',
    'images/services/personal-practice_15.jpg': 'https://lh3.googleusercontent.com/d/13Jiu5Fbq4tZGutRd44S3z68H2tOWoJws=w2000',
    'images/services/personal-practice_16.jpg': 'https://lh3.googleusercontent.com/d/1gROkzQs-_i2NOEUrm9NNHDU0868haarr=w2000',
    'images/services/personal-practice_17.jpg': 'https://lh3.googleusercontent.com/d/1s18iEuqJrxiQZ0h0Re1go3yEFt1hNR-J=w2000',
    'images/services/personal-practice_18.jpg': 'https://lh3.googleusercontent.com/d/1EP0VOXfe_XF-MmlgNJlhq7DZ_ZtgyYVy=w2000',
    'images/services/personal-practice_19.jpg': 'https://lh3.googleusercontent.com/d/1JkZ30rhqbGwyOrfXDLd6dTb0KOBeBreF=w2000',
    'images/services/personal-practice_20.jpg': 'https://lh3.googleusercontent.com/d/1enHuP_gHM3cRVwNXUy6DKzhY6fr0wM9s=w2000',
    'images/services/personal-practice_21.jpg': 'https://lh3.googleusercontent.com/d/1jAa1IYlLn0IMty651CcRB5dZuPp_1xmx=w2000',
    'images/services/personal-practice_22.jpg': 'https://lh3.googleusercontent.com/d/1cyt6XZqcm3Rafv_RXH2K-4n0JA_6jCwo=w2000',
    'images/services/personal-practice_23.jpg': 'https://lh3.googleusercontent.com/d/1CMGK7pjEk7EVMhxDaWWNzYZStXF-8EFL=w2000',
    'images/services/personal-practice_24.png': 'https://lh3.googleusercontent.com/d/1MbmSwlF-5XUVgW3M7mxdpLdHUXtHdBjy=w2000',
    'images/services/tarot.jpg': 'https://lh3.googleusercontent.com/d/1iFO2yzRsI9eVHPQOxZ7uZTupO8MP_f4C=w2000'
  };
  function toDrive(src) {
    return (src && DRIVE_BY_LOCAL[src]) ? DRIVE_BY_LOCAL[src] : src;
  }

  // 圖片候選順序：relic 選 no1~no7 → 專屬圖 → 品項 img（後端）→ 本機舊圖 imgFb
  function candidates(p, optionId) {
    var c = [];
    if (p && p.id === 'relic' && optionId && /^no\d+$/.test(optionId)) c.push(toDrive('images/products/relic-' + optionId + '.jpg'));
    if (p && p.img) c.push(toDrive(p.img));
    if (p && p.imgFb && p.imgFb !== p.img) c.push(toDrive(p.imgFb));
    return c;
  }

  /**
   * 綁定圖片：<img> 與占位 <div> 成對使用（依序排，同一時間只顯示一個）。
   * 圖檔不存在 → 依候選順序 fallback，全無則顯示占位符 ◎/☸，絕不破圖。
   * rebind（選項變更）會重試所有候選。
   */
  function bindPair(imgEl, phEl, p, optionId) {
    if (!imgEl) return;
    imgEl.dataset.tried = '';
    (function apply() {
      var tried = imgEl.dataset.tried ? imgEl.dataset.tried.split('|') : [];
      var cands = candidates(p, optionId);
      var src = '';
      for (var i = 0; i < cands.length; i++) if (tried.indexOf(cands[i]) === -1) { src = cands[i]; break; }
      if (!src) {
        imgEl.style.display = 'none';
        if (phEl) { phEl.textContent = p.type === 'service' ? '☸' : '◎'; phEl.style.display = ''; }
        return;
      }
      if (phEl) phEl.style.display = 'none';
      imgEl.style.display = '';
      imgEl.onerror = function () { tried.push(src); imgEl.dataset.tried = tried.join('|'); apply(); };
      imgEl.src = src;
    })();
  }

  window.ISAYA_API = {
    url: APPS_SCRIPT_URL,
    // 載入並合併後端商品；失敗 → 保留本機。回傳 {source:'remote'|'local', products}
    loadProducts: function () {
      if (loaded) return loaded;
      var settled = false;
      var settleShim = null;   // resolve 只在 executor 內有效，需先提出來給 resolveLocal 用
      function resolveLocal() {
        if (settled) return; settled = true;
        if (settleShim) settleShim({ source: 'local', products: window.ISAYA.PRODUCTS });
      }
      loaded = new Promise(function (resolve) {
        settleShim = resolve;
        var timer = setTimeout(resolveLocal, 5000); // GAS 太慢 → 先用本機顯示，載入動畫不卡死
        fetch(APPS_SCRIPT_URL + '?action=getProducts')
          .then(function (r) { return r.text(); })
          .then(function (text) {
            clearTimeout(timer);
            var data = null;
            try { data = JSON.parse(text); } catch (e) {}
            if (data && Array.isArray(data.products) && data.products.length) {
              mergeIntoLocal(data.products);
              settled = true;
              resolve({ source: 'remote', products: window.ISAYA.PRODUCTS });
            } else {
              resolveLocal();
            }
          })
          .catch(function () { clearTimeout(timer); resolveLocal(); });
      });
      return loaded;
    },
    bindPair: bindPair,
    candidates: candidates
  };
})();
