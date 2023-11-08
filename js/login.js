// 獲取密碼框元素
const passwordInput = document.querySelector('input[type="password"]');
const showPasswordButton = document.querySelector('#showPassword');

// 監聽密碼框的點擊事件
showPasswordButton.addEventListener('mousedown', function() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    showPasswordButton.setAttribute('name', 'lock-open-outline');
  }
});

// 監聽鼠標放開事件
showPasswordButton.addEventListener('mouseup', function() {
  if (passwordInput.type === 'text') {
    passwordInput.type = 'password';
    showPasswordButton.setAttribute('name', 'lock-closed-outline');
  }
});

// 監聽鼠標移出事件
showPasswordButton.addEventListener('mouseleave', function() {
  if (passwordInput.type === 'text') {
    passwordInput.type = 'password';
    showPasswordButton.setAttribute('name', 'lock-closed-outline');
  }
});


// 獲取表單元素
const form = document.querySelector('form');

// 獲取輸入框元素
const usernameInput = document.querySelector('input[name="usrname"]');

// 獲取檢查框元素
const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');

// 監聽表單提交事件
form.addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表單的默认提交行為

  // 獲取輸入數據
  const username = usernameInput.value;
  const password = passwordInput.value;

  // 檢查檢查框是否被選擇
  const rememberMe = rememberMeCheckbox.checked;

  // 如果檢查框被選擇，將輸入數據存儲在 cookie 中
  if (rememberMe) {
    document.cookie = `username=${username}; path=/`;
    document.cookie = `password=${password}; path=/`;
  } else {
    // 如果檢查框未被選擇，清除 cookie
    document.cookie = `username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  }
});