// var serverHost = 'test.storm-control.cc';
// var serverHead = 'https';
// var serverPort = 443;
var serverHost = 'localhost';
var serverHead = 'http';
var serverPort = 5500;
const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const alertFadeOut = function () {
  window.setTimeout(function () {
    $('.alertMsg').hide(500)
  },2000);
};
const emailElement = document.getElementById('registerEmail');
const passwordElement = document.getElementById('registerPassword');
const checkPasswordElement = document.getElementById('checkRegisterPassword');
const firstnameElement = document.getElementById('firstname');
const lastnameElement = document.getElementById('lastname');
const birthdayElement = document.getElementById('birthDate');
const genderElement = document.getElementById('registerGender');
const regionElement = document.getElementById('registerRegion');
const alertEmailMsg = document.getElementById('alertMsgEM');
const alertPasswordMsg = document.getElementById('alertMsgPW');
const alertConfirmPasswordMsg = document.getElementById('alertMsgCPW');
const alertFirstnameMsg = document.getElementById('alertMsgFN');
const alertLastnameMsg = document.getElementById('alertMsgLN');
const alertBirthdayMsg = document.getElementById('alertMsgBD');
let insertAlertMsg = document.getElementById('alertMsg');

$(document).ready(async () => {
  await getRegion();
});

function doubleCheck(element) {
  const registerPassword = passwordElement.value;
  const checkRegisterPassword = checkPasswordElement.value;
  if (registerPassword === checkRegisterPassword) {
    document.getElementById('tishi').innerHTML = "<font color='green'></font>";
    document.getElementById('submit').disabled = false;
  } else {
    document.getElementById('submit').disabled = true;
  }
}

function getRegion() {
  axios
    .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/timezone/list`, {})
    .then(async (response) => {
      if (response.status === 200) {
        const data = response.data;
        regionElement.innerHTML = ``;
        await Promise.all(
          data.body.map((d) => {
            document.getElementById(
              'registerRegion',
            ).innerHTML += `<option value="${d}">${d}</option>`;
          }),
        );
      }
    });
}

function userregister() {
  const email = emailElement.value;
  const password = passwordElement.value;
  const checkRegisterPassword = checkPasswordElement.value;
  const firstname = firstnameElement.value;
  const lastname = lastnameElement.value;
  const birthday = birthdayElement.value;
  const gender = genderElement.value;
  const region = regionElement.value;
  const data = {
    email,
    password,
    firstname,
    lastname,
    gender,
    birthday,
    region,
  };

  if (
    email &&
    password &&
    firstname &&
    lastname &&
    gender &&
    birthday &&
    region &&
    checkRegisterPassword
  ) {
    if (!(email.search(emailRule) + 1)) {
      $('#alertMsg').show(),
      emailElement.style.border = '3px solid #ff0000';
      emailElement.style.borderRadius = '3px';
      alertEmailMsg.innerHTML = `<span>${i18n('email_format')} ${i18n(
        'is_wrong',
      )}</span >`;
      insertAlertMsg.innerHTML = `<div class="alert alert-danger fade show" role="alert">
                        ${i18n('please')}${i18n('check')}${i18n(
        'your',
      )}<strong>${i18n('email_format')}</strong>
                      </div>`;
      alertFadeOut();
      return;
    }

    if (password !== checkRegisterPassword) {
      passwordElement.style.border = '3px solid #ff0000';
      passwordElement.style.borderRadius = '3px';
      alertPasswordMsg.innerHTML = `<span>${i18n('password')}${i18n(
        'is_not_match',
      )}</span>`;

      checkPasswordElement.style.border = '3px solid #ff0000';
      checkPasswordElement.style.borderRadius = '3px';
      return;
    }
    if (password.length < 6 && password.length >= 1) {
      $('#alertMsg').show(),
      passwordElement.style.border = '3px solid #ff0000';
      passwordElement.style.borderRadius = '3px';
      alertPasswordMsg.innerHTML = `<span>${i18n('password_alert')}</span>`;
      insertAlertMsg.innerHTML = `<div class="alert alert-danger fade show" role="alert">
                        ${i18n('at_least')} <strong>6</strong> ${i18n(
        'character',
      )}!</div>`;
      alertFadeOut();
      return;
    }
    axios
      .post(
        `${serverHead}://${serverHost}:${serverPort}/api/v1/account/platform/1/signup`,
        data,
      )
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setTimeout(function () {
            window.location.href = 'sign_in.html';
          }, 3000);
          document.getElementById(
            'insertMsg',
          ).innerHTML = `<div class="alert alert-success alert-dismissible fade show insertMsgContent" role="alert">
           ${i18n('remember_to')}${i18n('verify')}${i18n('your')}${i18n(
            'email_address',
          )}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        }
      })
      .catch((error) => alert(error));
  } else {
    $('#alertMsg').show(),
    insertAlertMsg.innerHTML = `<div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('signup_alert')}</strong>
                      </div>`;
    alertFadeOut();
    if (!email) {
      emailElement.style.border = '3px solid #ff0000';
      emailElement.style.borderRadius = '3px';
      alertEmailMsg.innerHTML = `<span>${i18n('email')}${i18n(
        'is_missing',
      )}</span>`;
    }
    if (!password) {
      passwordElement.style.border = '3px solid #ff0000';
      passwordElement.style.borderRadius = '3px';
      alertPasswordMsg.innerHTML = `<span>${i18n('password')}${i18n(
        'is_missing',
      )}</span>`;
    }

    if (!checkRegisterPassword) {
      checkPasswordElement.style.border = '3px solid #ff0000';
      checkPasswordElement.style.borderRadius = '3px';
      alertConfirmPasswordMsg.innerHTML = `<span>${i18n('please')}${i18n(
        'confirm',
      )}${i18n('your')}${i18n('password')}</span>`;
    }
    if (!firstname) {
      firstnameElement.style.border = '3px solid #ff0000';
      firstnameElement.style.borderRadius = '3px';
      alertFirstnameMsg.innerHTML = `<span>${i18n('firstname')}${i18n(
        'is_missing',
      )}</span>`;
    }
    if (!lastname) {
      lastnameElement.style.border = '3px solid #ff0000';
      lastnameElement.style.borderRadius = '3px';
      alertLastnameMsg.innerHTML = `<span>${i18n('lastname')}${i18n(
        'is_missing',
      )}</span>`;
    }
    if (!birthday) {
      birthdayElement.style.border = '3px solid #ff0000';
      birthdayElement.style.borderRadius = '3px';
      alertBirthdayMsg.innerHTML = `<span>${i18n('birthday')}${i18n(
        'is_missing',
      )}</span>`;
    }
  }
}

function removeBorder() {
  const email = emailElement.value;
  const password = passwordElement.value;
  const checkRegisterPassword = checkPasswordElement.value;
  const firstname = firstnameElement.value;
  const lastname = lastnameElement.value;
  const birthday = birthdayElement.value;
  const gender = genderElement.value;
  const region = regionElement.value;
  if (email) {
    emailElement.style.border = '';
    emailElement.style.borderRadius = '';
    alertEmailMsg.innerHTML = ``;
  }
  if (password) {
    passwordElement.style.border = '';
    passwordElement.style.borderRadius = '';
    alertPasswordMsg.innerHTML = ``;
  }
  if (checkRegisterPassword) {
    checkPasswordElement.style.border = '';
    checkPasswordElement.style.borderRadius = '';
    alertConfirmPasswordMsg.innerHTML = ``;
  }
  if (firstname) {
    firstnameElement.style.border = '';
    firstnameElement.style.borderRadius = '';
    alertFirstnameMsg.innerHTML = ``;
  }
  if (lastname) {
    lastnameElement.style.border = '';
    lastnameElement.style.borderRadius = '';
    alertLastnameMsg.innerHTML = ``;
  }
  if (birthday) {
    birthdayElement.style.border = '';
    birthdayElement.style.borderRadius = '';
    alertBirthdayMsg.innerHTML = ``;
  }
}
