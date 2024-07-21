// var serverHost = 'test.storm-control.cc';
// var serverHead = 'https';
// var serverPort = 443;
const alertFadeOut = function () {
  window.setTimeout(function () {
    $('.alertMsg').hide(500)
  },2000);
};

var serverHost = 'localhost';
var serverHead = 'http';
var serverPort = 5500;
var channel = 'WEB';
var platformId = 1;
const emailElement = document.getElementById('loginemail');
const passwordElement = document.getElementById('loginpassword');
const emailMsg = document.getElementById('emailMsg');
const passwordMsg = document.getElementById('passwordMsg');

function userlogin() {
  const email = emailElement.value;
  const password = passwordElement.value;
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/account/platform/1/signin`,
      {
        email,
        password,
        channel,
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authorization', data.body.token);
        window.location.href = 'src/Account.html';
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
             $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_address')}</strong>${i18n(
          'or',
        )}<strong>${i18n('password')}</strong>${i18n('empty')}
                      </div>`),
          (emailElement.style.border = '3px solid #ff0000');
        emailElement.style.borderRadius = '3px';
        emailMsg.innerHTML = `<span>${i18n('email')} ${i18n(
          'is_missing',
        )}</span>`;
        passwordElement.style.border = '3px solid #ff0000';
        passwordElement.style.borderRadius = '3px';
        passwordMsg.innerHTML = `<span>${i18n('password_empty')}</span>`;
        alertFadeOut();
      }
      if (error.response.status === 403) {
             $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_address')}</strong> ${i18n(
          'or',
        )} <strong>${i18n('password')}</strong> ${i18n('is_wrong')}
                      </div>`),
          alertFadeOut();
        if (password.length <= 6) {
          passwordElement.style.border = '3px solid #ff0000';
          passwordElement.style.borderRadius = '3px';
          passwordMsg.innerHTML = `<span>${i18n('password_alert')}</span>`;
        }
      }
    });
}

function removeBorder() {
  const email = emailElement.value;
  const password = passwordElement.value;
  if (email) {
    emailElement.style.border = '';
    emailElement.style.borderRadius = '';
    emailMsg.innerHTML = ``;
  }
  if (password) {
    passwordElement.style.border = '';
    passwordElement.style.borderRadius = '';
    passwordMsg.innerHTML = ``;
  }
}
function userFblogin(userId, accessToken) {
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/account/facebook/signin`,
      {
        thirdpartyId: userId,
        thirdpartySecret: accessToken,
        type: 'FACEBOOK',
        channel,
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authorization', data.body.token);
        window.location.href = 'src/Account.html';
      }
    })
    .catch((error) => alert(error));
}
