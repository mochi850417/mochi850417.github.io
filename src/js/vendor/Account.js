function doubleCheck(element) {
  const rulesPassword = document.getElementById('rulesPassword').value;
  const rulesPasswordConfirm = document.getElementById('rulesPasswordConfirm')
    .value;
  if (rulesPassword === rulesPasswordConfirm) {
    document.getElementById('tishi').innerHTML = "<font color='green'></font>";
    document.getElementById('submit').disabled = false;
  } else {
    document.getElementById('tishi').innerHTML =
      "<font color='red'>Please enter the same value again.</font>";
    document.getElementById('submit').disabled = true;
  }
}

function setAccount() {
  const nickname = document.getElementById('nickname').value;
  const birthday = document.getElementById('birthday').value;
  const gender = document.getElementById('changeGender').value.toUpperCase();
  const authorization = localStorage.getItem('authorization');
  axios
    .patch(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/profile`,
      {
        nickname,
        birthday,
        gender,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        const data = response.data;
        alert('successful!');
      }
    })
    .catch((error) => alert(error));
}

function setAccountPassWord() {
  const rulesPasswordConfirmElement = document.getElementById(
    'rulesPasswordConfirm',
  );
  const rulesPasswordConfirm = rulesPasswordConfirmElement.value;
  const rulesPasswordElement = document.getElementById('rulesPassword');
  const rulesPassword = rulesPasswordElement.value;
  const passwordElement = document.getElementById('password');
  const password = passwordElement.value;
  const authorization = localStorage.getItem('authorization');

  if (rulesPassword !== rulesPasswordConfirm) {
    return;
  }
  axios
    .patch(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/password/change`,
      {
        password: password,
        newPassword: rulesPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        alert('successful!');
        // window.location.href = '../index.html';
      }
    })
    .catch((error) => alert(error));
}

if (!localStorage.getItem('language')) {
  window.onload = localStorage.setItem('language', 'en_US');
}
if (localStorage.getItem('language') === 'zh_TW') {
  document.getElementById('selected-lang').innerHTML = '中文';
  const css = document.getElementById('fakecss-selected');
  const c = css.sheet;
  c.insertRule(
    '#selected-lang#selected-lang:before{background-image: url(https://www.countryflags.io/tw/flat/32.png)}',
    0,
  );
}

document.getElementById('us').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'en_US') {
    document.getElementById('selected-lang').innerHTML = 'English';
    localStorage.setItem('language', 'en_US');
    const css = document.getElementById('fakecss-selected');
    const c = css.sheet;
    if (c.cssRules.length !== 0) {
      c.deleteRule(0);
      c.insertRule(
        '#selected-lang#selected-lang:before{background-image: url(https://www.countryflags.io/us/flat/32.png)}',
        0,
      );
    }
  }
  getDataI18n();
});
document.getElementById('tw').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'zh_TW') {
    document.getElementById('selected-lang').innerHTML = '中文';
    localStorage.setItem('language', 'zh_TW');
    getDataI18n();
    const css = document.getElementById('fakecss-selected');
    const c = css.sheet;
    if (c.cssRules.length !== 0) {
      c.deleteRule(0);
      c.insertRule(
        '#selected-lang#selected-lang:before{background-image: url(https://www.countryflags.io/tw/flat/32.png)}',
        0,
      );
    }
    if (c.cssRules.length === 0) {
      c.insertRule(
        '#selected-lang#selected-lang:before{background-image: url(https://www.countryflags.io/tw/flat/32.png)}',
        0,
      );
    }
  }
});
