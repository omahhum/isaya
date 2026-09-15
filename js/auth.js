/**
 * isaya 官網 — Firebase Auth 模組（沿用聖輪宗登入方案）
 * 所有頁面 include 此檔即可使用 firebaseAuth
 * 使用 Firebase popup 登入（禁止 redirect）
 */

// Firebase SDK (v10 compat 模式，CDN 直接載入於各 HTML head)
firebase.initializeApp({
  apiKey: "«reda...…»",
  authDomain: "studio-4305054348-a6a5f.firebaseapp.com",
  projectId: "studio-4305054348-a6a5f",
  storageBucket: "studio-4305054348-a6a5f.firebasestorage.app",
  messagingSenderId: "278667343750",
  appId: "1:278667343750:web:71e2da24e2a1ece6f39e07"
});

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// ⚠️ isaya 專用 GAS Web App（待部署後填入實際 URL）
// 格式：https://script.google.com/macros/s/YOUR_ISAYA_SCRIPT_ID/exec
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ISAYA_PLACEHOLDER/exec';

// 初始化時確保 redirect 結果被解析（防止 Firebase 搶在 DOM 完成前觸發）
auth.getRedirectResult().catch(err => {
  if (err.code !== 'auth/no-auth-event') {
    console.warn('Redirect result error:', err.code, err.message);
  }
});

/**
 * 彈出 Gmail 登入視窗
 */
function signInWithGoogle() {
  auth.signInWithPopup(googleProvider).catch(err => {
    console.error('登入失敗:', err);
    alert('登入失敗：' + err.message + '\n(若是 unauthorized-domain，請至 Firebase 後台加入此網域)');
  });
}

/**
 * 登出
 */
function signOut() {
  auth.signOut().then(() => {});
}

/**
 * 取得目前登入會員資料（同步）
 */
function getCurrentUser() {
  return auth.currentUser;
}

/**
 * 訂閱登入狀態變化
 * callback(user) — user 為 Firebase User 物件或 null
 */
function onAuthStateChanged(callback) {
  auth.onAuthStateChanged(callback);
}

/**
 * 取得 Firebase ID Token（用於 GAS 驗證）
 */
async function getFirebaseToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('未登入');
  try {
    // 強迫刷新 token，確保是最新的
    return await user.getIdToken(true);
  } catch (e) {
    console.error('無法取得 Firebase token:', e);
    throw new Error('無法取得驗證 token，請重新登入');
  }
}

/**
 * 建立訂單（結帳用）
 * cart = [{id, qty, optionId, name, lineTotal}], total 含運費
 */
async function createOrder(order) {
  const user = auth.currentUser;
  if (!user) throw new Error('未登入');

  const token = await getFirebaseToken();
  const payload = new URLSearchParams({
    action: 'createOrder',
    token: token,
    name: order.name || '',
    phone: order.phone || '',
    address: order.address || '',
    pay_method: order.pay_method || '',
    note: order.note || '',
    items_json: JSON.stringify(order.items || []),
    total: String(order.total || 0),
    shipping: String(order.shipping || 0)
  });

  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: payload,
    redirect: 'follow'
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { status: text.includes('ok') ? 'ok' : 'error', raw: text };
  }
  if (data.status !== 'ok') {
    throw new Error(data.error || '訂單建立失敗，請稍後再試');
  }
  return data; // { status:'ok', order_no:'IS-YYYYMMDD-xxx' }
}

/**
 * 查詢自己的訂單列表（依 token 解出的 email 比對，不信任前端傳 email）
 * @returns {Promise<Array<{order_no, total, status, created_at, items}>>}
 */
async function listOrders() {
  const user = auth.currentUser;
  if (!user) return [];

  const token = await getFirebaseToken();
  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: new URLSearchParams({
      action: 'listOrders',
      token: token
    })
  });

  const text = await response.text();
  try {
    const data = JSON.parse(text);
    return data.orders || [];
  } catch {
    return [];
  }
}

// 對外暴露
window.firebaseAuth = {
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
  getFirebaseToken,
  createOrder,
  listOrders
};
