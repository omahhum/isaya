/**
 * isaya 官網 — 商品圖片資產（純圖片，⚠️ 不含任何價格／庫存／文案）
 * 價格與庫存一律以 Google Sheet（經 GAS）為唯一來源（見 js/api.js）。
 * 本檔只存「圖片清單」：img(主圖)、imgs(圖廊)、optionImgs(舍利依編號換圖)。
 * 新增品項若要有圖：把圖片上傳 website/images/ 並在此補一筆；沒有則自動走占位符。
 */
window.ISAYA_IMAGES = {
  "caibao-card": {
    "img": "https://lh3.googleusercontent.com/d/18qnC4J9Kdom4fwg_JM2Oc9CrTOdkDzbW=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/18qnC4J9Kdom4fwg_JM2Oc9CrTOdkDzbW=w2000"
    ]
  },
  "gulugue-thangka": {
    "img": "https://lh3.googleusercontent.com/d/1SgxjF-lna_5vCJEiuL6HQJAXwJaFOjs5=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1SgxjF-lna_5vCJEiuL6HQJAXwJaFOjs5=w2000",
      "https://lh3.googleusercontent.com/d/133bjdj_zw7MoBv-1lHGrVdDGp-vmFg-V=w2000",
      "https://lh3.googleusercontent.com/d/1EXERmvtgyiUqte6ShOlKdyNsmw7l_RZt=w2000",
      "https://lh3.googleusercontent.com/d/1yrcwwK6OJI78bmKAaJeVLQ8A8y0_JK6U=w2000",
      "https://lh3.googleusercontent.com/d/1i5mayEiulzKVkWgZ4ITrjFJxbpdcw1Kp=w2000"
    ]
  },
  "umbrella": {
    "img": "https://lh3.googleusercontent.com/d/1CZloUlgBhM4m-px2-_rUviwFJvBzL9Qd=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1CZloUlgBhM4m-px2-_rUviwFJvBzL9Qd=w2000",
      "https://lh3.googleusercontent.com/d/1Se31Cl3mJyEbqatFN6thgZoymX-WlkBq=w2000",
      "https://lh3.googleusercontent.com/d/1oKmBcbZHXX2X4gC3EiKNh2S747p5ajCI=w2000",
      "https://lh3.googleusercontent.com/d/19nVhNszqK5oew9cvGL6ekpzJlqUnWfeI=w2000"
    ]
  },
  "mirror-mandala": {
    "img": "https://lh3.googleusercontent.com/d/1OtFSCxHyQ1VZ5IjDWgfdTqVDun84c7WD=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1OtFSCxHyQ1VZ5IjDWgfdTqVDun84c7WD=w2000",
      "https://lh3.googleusercontent.com/d/12sXyHycMio0W2zNKXaG7huxikCAI2KdS=w2000",
      "https://lh3.googleusercontent.com/d/1fMOhZSmB-wkug7iefd7Gz5K9XazO0Yr9=w2000",
      "https://lh3.googleusercontent.com/d/1yrQg6aEfgp5UwbQ9XebJU437Wafh330A=w2000",
      "https://lh3.googleusercontent.com/d/1gaIgDdm9lY5zvl3AMVh0ZcAexpCX5Vp9=w2000",
      "https://lh3.googleusercontent.com/d/1fsCpzeA9DOMUhN1yPdANjBrnEf6VfOUI=w2000",
      "https://lh3.googleusercontent.com/d/1UB8333X7Xdwzjh1gHK463Er2YegEWl7m=w2000",
      "https://lh3.googleusercontent.com/d/1d8BOWNdNu9-GYwz-K7eabdQSI6lVpjbO=w2000",
      "https://lh3.googleusercontent.com/d/1WeGvhhZabrB9v_vl5_v8toszxOvyu7bz=w2000",
      "https://lh3.googleusercontent.com/d/1h0VeJo7hGUQljQdHu2IqB4b-mMU42721=w2000",
      "https://lh3.googleusercontent.com/d/1GmPHKkUyxmgv2ehaG8p9OhBjcPD5qJaq=w2000",
      "https://lh3.googleusercontent.com/d/136jLMDGzll4Pze2bMJrbCWjb0uDWulh8=w2000",
      "https://lh3.googleusercontent.com/d/1Y1ujj4GVuTxGpiDkxP2QhzNbKhsMIHXJ=w2000",
      "https://lh3.googleusercontent.com/d/1I7F1MFSnpxIwEPalpSDUNrtW-VhKCsM0=w2000",
      "https://lh3.googleusercontent.com/d/1bPqp95wfrlLImtV2M1RRPmiP1VNYptvw=w2000",
      "https://lh3.googleusercontent.com/d/1y4DKk6AyeBR5k-Jx5vDIQCd5IlIwrqwx=w2000"
    ]
  },
  "relic": {
    "img": "https://lh3.googleusercontent.com/d/15ZSxT5N4HtgcR0yxQpyD1UtIPmyX9Tld=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/15ZSxT5N4HtgcR0yxQpyD1UtIPmyX9Tld=w2000",
      "https://lh3.googleusercontent.com/d/1o2uL44qLv088h4a4LjH7L1dYoXokWUlS=w2000",
      "https://lh3.googleusercontent.com/d/1qUA_bRbB9LOSt4B2vjUNwjUy-H24HpYD=w2000",
      "https://lh3.googleusercontent.com/d/1DzqTOic4-_capiel83UULonCeBr36xyb=w2000",
      "https://lh3.googleusercontent.com/d/1AUOERQGGYJdTzIlrQZMCBJPBBguG256u=w2000",
      "https://lh3.googleusercontent.com/d/1hEU_Y07vCrfYpy24da60ljlqqAPw3cei=w2000",
      "https://lh3.googleusercontent.com/d/1ZWG542xI4Erd1PPdNfZI6Jdp2X6QmtlD=w2000",
      "https://lh3.googleusercontent.com/d/17lLnVtai_BZNoxUvQ39fwB2m2eFnFW16=w2000"
    ],
    "optionImgs": {
      "no1": [
        "https://lh3.googleusercontent.com/d/1o2uL44qLv088h4a4LjH7L1dYoXokWUlS=w2000",
        "https://lh3.googleusercontent.com/d/1BTVA0oFk2IxWKMmqMswFBEqSzLxO25t7=w2000"
      ],
      "no2": [
        "https://lh3.googleusercontent.com/d/1qUA_bRbB9LOSt4B2vjUNwjUy-H24HpYD=w2000",
        "https://lh3.googleusercontent.com/d/1npQkloxFj9lrP3Rw54eKPzIjJdkF6jXP=w2000"
      ],
      "no3": [
        "https://lh3.googleusercontent.com/d/1DzqTOic4-_capiel83UULonCeBr36xyb=w2000",
        "https://lh3.googleusercontent.com/d/14odu1o6bLC1bikZkG3jbsxSbcuBLJA3Q=w2000"
      ],
      "no4": [
        "https://lh3.googleusercontent.com/d/1AUOERQGGYJdTzIlrQZMCBJPBBguG256u=w2000",
        "https://lh3.googleusercontent.com/d/13IVH9rstPLysHPAM7A_25BhS4VxOm0ua=w2000"
      ],
      "no5": [
        "https://lh3.googleusercontent.com/d/1hEU_Y07vCrfYpy24da60ljlqqAPw3cei=w2000",
        "https://lh3.googleusercontent.com/d/1ey_6FVeLiEH9NMEEIoH9q_uzKnSAifjT=w2000"
      ],
      "no6": [
        "https://lh3.googleusercontent.com/d/1ZWG542xI4Erd1PPdNfZI6Jdp2X6QmtlD=w2000",
        "https://lh3.googleusercontent.com/d/1V-nHnKQOFxvfdF2ecj9jnqrjYULZDq0q=w2000"
      ],
      "no7": [
        "https://lh3.googleusercontent.com/d/17lLnVtai_BZNoxUvQ39fwB2m2eFnFW16=w2000",
        "https://lh3.googleusercontent.com/d/1rvKtzeDkfgasbCUUUcHkDCE6K2reU-Jk=w2000"
      ]
    }
  },
  "candle-light": {
    "img": "https://lh3.googleusercontent.com/d/1gKdG7_pxjQM9rHcQL_qIwkxa8VafYYnf=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1gKdG7_pxjQM9rHcQL_qIwkxa8VafYYnf=w2000"
    ]
  },
  "incense-seal": {
    "img": "https://lh3.googleusercontent.com/d/168oJLDoJ6gY14lKGxw43wSHM7EALveY3=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/168oJLDoJ6gY14lKGxw43wSHM7EALveY3=w2000",
      "https://lh3.googleusercontent.com/d/1Lt2DmyYBBf8YAw-6R78iyiTq6L81ksLp=w2000",
      "https://lh3.googleusercontent.com/d/1JtAQNGKiQMa89-ZHFCm3mG_9Ck0ZMUAM=w2000"
    ]
  },
  "personal-practice": {
    "img": "https://lh3.googleusercontent.com/d/1RewOxnvyNeXPcD18fLTyvkpZKD8dOKqc=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1RewOxnvyNeXPcD18fLTyvkpZKD8dOKqc=w2000",
      "https://lh3.googleusercontent.com/d/1VOBDTL-BOWYUpkg3_tujz30JyV3ezgsQ=w2000",
      "https://lh3.googleusercontent.com/d/1Cj2q92AfkDBXTsIhdgGE84vdrrebNBfu=w2000",
      "https://lh3.googleusercontent.com/d/1yQUivkqBNo35w2E7sFAd9x4I66JbW7vb=w2000",
      "https://lh3.googleusercontent.com/d/1xVlP4atMck0-RunlE14odrRnGVcMOzW8=w2000",
      "https://lh3.googleusercontent.com/d/1oat6G-MijQXFHgKcQQo6JS2dH9lEonBB=w2000",
      "https://lh3.googleusercontent.com/d/1VGBQ73kE0BwhzKDgvxPwlbE3sdMEcZpx=w2000",
      "https://lh3.googleusercontent.com/d/1MbPLuj-8YrJ3Q61i-Rm9iOBfRI1L2bf-=w2000",
      "https://lh3.googleusercontent.com/d/1RT11noqZF4LYiK7YklKcQekvt04zRjHt=w2000",
      "https://lh3.googleusercontent.com/d/1eiT2eIxJ2aIGU65idKUFIzl4Cgbq9tPf=w2000",
      "https://lh3.googleusercontent.com/d/13dMQJ_ZkGtVhiThX9wS2ngJzXvKvlNhm=w2000",
      "https://lh3.googleusercontent.com/d/1GbU_koYMlAni3ZX5DJbC3ZlGFsAu-zoz=w2000",
      "https://lh3.googleusercontent.com/d/14EWiRu7KHtoI9Rxihe6ZekbEqHxS-GvD=w2000",
      "https://lh3.googleusercontent.com/d/1y4EDm4HAmEQGYbRB8xeb2-9rUdFOMQyD=w2000",
      "https://lh3.googleusercontent.com/d/1lIUtInKw0eloDKtCuNlms1Sy49Q6S4Is=w2000",
      "https://lh3.googleusercontent.com/d/13Jiu5Fbq4tZGutRd44S3z68H2tOWoJws=w2000",
      "https://lh3.googleusercontent.com/d/1gROkzQs-_i2NOEUrm9NNHDU0868haarr=w2000",
      "https://lh3.googleusercontent.com/d/1s18iEuqJrxiQZ0h0Re1go3yEFt1hNR-J=w2000",
      "https://lh3.googleusercontent.com/d/1EP0VOXfe_XF-MmlgNJlhq7DZ_ZtgyYVy=w2000",
      "https://lh3.googleusercontent.com/d/1JkZ30rhqbGwyOrfXDLd6dTb0KOBeBreF=w2000",
      "https://lh3.googleusercontent.com/d/1enHuP_gHM3cRVwNXUy6DKzhY6fr0wM9s=w2000",
      "https://lh3.googleusercontent.com/d/1jAa1IYlLn0IMty651CcRB5dZuPp_1xmx=w2000",
      "https://lh3.googleusercontent.com/d/1cyt6XZqcm3Rafv_RXH2K-4n0JA_6jCwo=w2000",
      "https://lh3.googleusercontent.com/d/1CMGK7pjEk7EVMhxDaWWNzYZStXF-8EFL=w2000",
      "https://lh3.googleusercontent.com/d/1MbmSwlF-5XUVgW3M7mxdpLdHUXtHdBjy=w2000"
    ]
  },
  "moni-vase": {
    "img": "https://lh3.googleusercontent.com/d/1mel3u5I4In-7RMf26uscU0jiwOoAW8f3=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1mel3u5I4In-7RMf26uscU0jiwOoAW8f3=w2000",
      "https://lh3.googleusercontent.com/d/1dRQZyxymbJ0csbLoAvE4GpiTd-gYQwAy=w2000",
      "https://lh3.googleusercontent.com/d/1jmXnT9uLE36QDiFII8_4biaSExCpzYwk=w2000"
    ]
  },
  "dazizai-oracle": {
    "img": "https://lh3.googleusercontent.com/d/1mFbbffxwzPmcdhRIM6iXtVebe437Vlii=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1mFbbffxwzPmcdhRIM6iXtVebe437Vlii=w2000",
      "https://lh3.googleusercontent.com/d/15LG1YiP0ghXjXTckoEcid3avElCscKOq=w2000"
    ]
  },
  "guanzizai-card": {
    "img": "https://lh3.googleusercontent.com/d/1S6aBLtqLivvwx7KvTSBJS0IhA_N-xnIH=w2000",
    "imgs": [
      "https://lh3.googleusercontent.com/d/1S6aBLtqLivvwx7KvTSBJS0IhA_N-xnIH=w2000",
      "https://lh3.googleusercontent.com/d/1pkIqldpioJCTJovNadv0tO_yxxodZQFp=w2000",
      "https://lh3.googleusercontent.com/d/1g6p-X4LRi7pyajWJ8cpRvzggtHyamoFh=w2000"
    ]
  }
};
