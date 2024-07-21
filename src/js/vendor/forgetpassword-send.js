var serverHost = 'test.storm-control.cc';
var serverHead = 'https';
var serverPort = 443;
const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const emailElement = document.getElementById('email');
const forgetElement = document.getElementById('forgetEmail');
const alertFadeOut = function () {
  window.setTimeout(function () {
    $('.alertMsg').hide(500)
  },1500);
};

function forgetPassword() {
  const email = emailElement.value;
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/password/forget`,
      {
        email,
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;

        setTimeout(function () {
          window.location.href = 'index.html';
        }, 3000);
        document.getElementById(
          'insertMsg',
        ).innerHTML = `<div class="alert alert-success alert-dismissible fade show insertMsgContent" role="alert">
           ${i18n('check')}${i18n('your')}${i18n('email')} & ${i18n(
          'reset',
        )}${i18n('password')}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
      }
    })
    .catch((error) => {
      if (error.response.status === 400) {
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_address')}</strong>${i18n(
          'is_empty',
        )}!
                      </div>`),
          (emailElement.style.border = '3px solid #ff0000');
        emailElement.style.borderRadius = '3px';
        forgetElement.innerHTML = `<span>${i18n(
          'email_address',
        )}</strong>${i18n('is_missing')}</span>`;
        alertFadeOut();

        if (!(email.search(emailRule) + 1) && email) {
           $('#alertMsg').show(),
          (document.getElementById(
            'alertMsg',
          ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_format')}</strong>${i18n(
            'is_wrong',
          )}!
                      </div>`),
            (emailElement.style.border = '3px solid #ff0000');
          emailElement.style.borderRadius = '3px';
          forgetElement.innerHTML = `<span>${i18n('wrong')}${i18n(
            'email',
          )}${i18n('format')}</span>`;
          return;
        }
      }
      if (error.response.status === 404) {
         $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_address')}</strong>${i18n(
          'is_not_found',
        )}!
                      </div>`),
          (emailElement.style.border = '3px solid #ff0000');
        emailElement.style.borderRadius = '3px';
        forgetElement.innerHTML = `<span>${i18n('please')}${i18n(
          'check',
        )}${i18n('your')}${i18n('email_address')}</span>`;
        alertFadeOut();
      }
    });
}

function removeBorder() {
  const email = emailElement.value;

  if (email) {
    emailElement.style.border = '';
    emailElement.style.borderRadius = '';
    forgetElement.innerHTML = ``;
  }
}
