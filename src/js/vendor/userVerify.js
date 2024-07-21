const smsCD = 5;
const emailCD = 1; // minutes
const fileMaxSize = 20;
const inputEmail = localStorage.getItem('userEmail');
const VerifyState = {
  SUCCESS: 1,
  FAILURE: 0,
  PENDING: 9,
};
const alertFadeOut = function () {
  window.setTimeout(function () {
    $('.alertMsg').hide(500)
  },1500);
};

$(document).ready(async () => {
  await getKYCData();
  await getVerifyData();

  Dropzone.options.myDropzone = {
    url: '#',
    autoProcessQueue: true,
    uploadMultiple: true,
    parallelUploads: 1,
    maxFiles: 1,
    maxFilesize: fileMaxSize,
    acceptedFiles: 'image/*',
    addRemoveLinks: false,
    /*
     * If `null`, the ratio of the image will be used to calculate it.
     */
    thumbnailWidth: 120,

    /**
     * The same as `thumbnailWidth`. If both are null, images will not be resized.
     */
    thumbnailHeight: 120,

    /**
     * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
     * Can be either `contain` or `crop`.
     */
    thumbnailMethod: 'crop',
    dictFileTooBig: `File is too big. Max filesize: ${fileMaxSize}MiB.`,
    dictInvalidFileType: "You can't upload files of this type.",
    init: function () {
      document.getElementById('saveKycPicture').innerHTML = '';
    },
    success: function (file, done) {
      Dropzone.options.myDropzone.init();
      submitKYCIdPicture(file);
    },
  };
});
window.onload = inputEmailVerify;

function inputEmailVerify() {
  if (document.getElementById('input-group')) {
    document.getElementById(
      'input-group',
    ).innerHTML = `<input type="email" class="form-control col-12" id="emailVerify" value=${inputEmail}>
                                <div class="input-group-append">
                                    <button class="btn btn-primary btn-multiple-state" type="button" onclick="checkEmailVerify()" id="emailVerifyButton">${i18n(
                                      'send',
                                    )}</button>
                                </div>`;
  }
}

function recipprocal(second = 60, elementId) {
  document.getElementById(elementId).disabled = true;
  setInterval(function () {
    second -= 1;
    if (second < 0) {
      document.getElementById(elementId).innerHTML = 'Send';

      return;
    }

    document.getElementById(elementId).innerHTML = second;
  }, 1000);
  setTimeout(function () {
    document.getElementById(elementId).disabled = false;
  }, second * 1000);
}

function getKYCData() {
  const authorization = localStorage.getItem('authorization');

  axios
    .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/kyc`, {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = response.data;

        if (document.getElementById('inputIDName')) {
          document.getElementById('inputIDName').value = data.body.name;
        }
        if (document.getElementById('inputIDNo')) {
          document.getElementById('inputIDNo').value = data.body.idNo;
        }
        if (document.getElementById('inputIssuedDate')) {
          document.getElementById('inputIssuedDate').value = moment(
            data.body.issuedDate,
          ).format('yyyy-MM-DD');
        }
        if (document.getElementById('inputIssuedLocation')) {
          document.getElementById('inputIssuedLocation').value =
            data.body.issuedLocation;
        }
        if (document.getElementById('myDropzone')) {
          document.getElementById('myDropzone').innerHTML = `
           
            <div id="saveKycPicture" class="d-flex flex-row ">
                <div class="p-0 w-30 position-relative">
                    <div class="preview-container">
                        <img data-dz-thumbnail="" class="img-thumbnail border-0" alt="user-default.png" src="${data.body.idNoPictureUri}">
                        <i class="simple-icon-doc preview-icon"></i>
                    </div>
                </div>
            </div>

          `;
        }
      }
    });
}

function getVerifyData() {
  const userLevel = localStorage.getItem('userLevel');
  if (userLevel !== 'UNAUTHORIZATION_USER') {
    $('.list-unstyled li').removeClass('notActivate')
    document
      .getElementById('profilePicture')
      .setAttribute('data-target', '#exampleModal');
    document.getElementById('verifyAlert').style.display = 'none';
  }
  const authorization = localStorage.getItem('authorization');
  axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/verification`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data.body.smsVerify) {
          document.getElementById(
            'smsCertified',
          ).innerHTML = `<div class="card dashboard-sq-banner justify-content-end h-100">
                        <div class="card-body justify-content-end d-flex flex-column">
                            <span class="badge badge-pill badge-theme-3 align-self-start mb-3"></span>
                            <p class="lead text-white">${i18n('phone')}</p>
                            <p class="text-white">${i18n(
                              'verification',
                            )} ${i18n('successful')} !</p>
                        </div>
                    </div>`;
        } else if (localStorage.getItem('smsSendDate')) {
          const verifyDate = localStorage.getItem('smsSendDate');

          const apart =
            moment().valueOf() -
            moment(verifyDate).add(smsCD, 'minutes').valueOf();

          if (apart < 0) {
            recipprocal(Math.round(Math.abs(apart) / 1000), 'sendID');
          }
        }
        if (response.data.body.emailVerify) {
          document.getElementById(
            'emailCertified',
          ).innerHTML = `<div class="card dashboard-sq-banner justify-content-end h-100">
                        <div class="card-body justify-content-end d-flex flex-column">
                            <span class="badge badge-pill badge-theme-3 align-self-start mb-3"></span>
                            <p class="lead text-white">${i18n('email')}</p>
                            <p class="text-white">${i18n(
                              'verification',
                            )} ${i18n('successful')} !</p>
                        </div>
                    </div>`;
        } else if (localStorage.getItem('emailSendDate')) {
          const verifyDate = localStorage.getItem('emailSendDate');

          const apart =
            moment().valueOf() -
            moment(verifyDate).add(emailCD, 'minutes').valueOf();

          if (apart < 0) {
            recipprocal(
              Math.round(Math.abs(apart) / 1000),
              'emailVerifyButton',
            );
          }
        }
        if (response.data.body.KYCVerify === VerifyState.SUCCESS) {
          document.getElementById(
            'KYCCertified',
          ).innerHTML = `<div class="card dashboard-sq-banner justify-content-end h-100">
                        <div class="card-body justify-content-end d-flex flex-column">
                            <span class="badge badge-pill badge-theme-3 align-self-start mb-3"></span>
                            <p class="lead text-white">Certificate Verify</p>
                            <p class="text-white">Yes, it is Certified!</p>
                        </div>
                    </div>`;
        } else if (response.data.body.KYCVerify === VerifyState.FAILURE) {
          if (document.getElementById('waitingCertification')) {
            document.getElementById(
              'waitingCertification',
            ).innerHTML = `<div class="mb-2" style="color: red">Waiting for certification</div>`;
          }
        }
      }
    });
}

function sendSmsVerify() {
  const authorization = localStorage.getItem('authorization');
  let phoneCountryCode = document.getElementById('phoneCountryCode').value;
  let phoneNumber = document.getElementById('phoneNumber').value;
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/sms/send`,
      {
        phoneCountryCode,
        phoneNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-success fade show" role="alert">
                        <strong>${i18n('verify_code')} </strong>${i18n(
          'has_been_sent',
        )}
                      </div>`),
          alertFadeOut(),
          localStorage.setItem('smsSendDate', moment());
        recipprocal(smsCD * 60, 'sendID');
      }
    })
    .catch(
      (error) =>
        $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('phone')} ${i18n(
          'number',
        )} </strong>${i18n('empty')}
                      </div>`),

      alertFadeOut(),
    );
}

function checkSmsVerify() {
  const authorization = localStorage.getItem('authorization');
  const smsCode = document.getElementById('smsCode').value;

  axios
    .patch(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/sms/verify`,
      {
        verificationCode: smsCode,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        document.getElementById('checkSmsVerifyButton').disabled = true;
         $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-success fade show" role="alert">
                        ${i18n('verification')} ${i18n('accomplished')}
                      </div>`),
          alertFadeOut(),
          (document.getElementById('checkSmsVerifyButton').innerHTML =
            'Successful!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    })
    .catch((error) => {
      $('#alertMsg').show()
      if (error.response.status === 400) {
        document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('phone_verify_code')} </strong>${i18n(
          'empty',
        )}
                      </div>`,
        alertFadeOut()
      }
      if (error.response.status === 404) {
        document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('phone_verify_code')} </strong>${i18n(
          'is_wrong',
        )}
                      </div>`,
        alertFadeOut()
      }
    }
    );
}

function checkEmailVerify() {
  const authorization = localStorage.getItem('authorization');
  const emailVerify = document.getElementById('emailVerify').value;
  console.log(emailVerify);
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/email/send`,
      {
        email: emailVerify,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
         $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-success fade show" role="alert">
                        <strong>${i18n('verification')} ${i18n(
          'email',
        )} </strong>${i18n('has_been_sent')}
                      </div>`),
          alertFadeOut(),
          localStorage.setItem('emailSendDate', moment());
        recipprocal(emailCD * 60, 'emailVerifyButton');
      }
    })
    .catch(
      (error) =>
         $('#alertMsg').show(),
        (document.getElementById(
          'alertMsg',
        ).innerHTML = ` <div class="alert alert-danger fade show" role="alert">
                        <strong>${i18n('email_format')} </strong>${i18n(
          'is_wrong',
        )}
                      </div>`),

      alertFadeOut(),
    );
}

// function checkKYCVerify() {
//   const authorization = localStorage.getItem('authorization');
//   const inputIDName = document.getElementById('inputIDName').value;
//   const inputIDNo = document.getElementById('inputIDNo').value;
//   const inputIssuedDate = document.getElementById('inputIssuedDate').value;
//   const inputIssuedLocation = document.getElementById('inputIssuedLocation')
//     .value;

//   axios
//     .patch(
//       `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/kyc/verify`,
//       {
//         name: inputIDName,
//         idNo: inputIDNo,
//         issuedDate: inputIssuedDate,
//         issuedLocation: inputIssuedLocation,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${authorization} `,
//         },
//       },
//     )
//     .then((response) => {
//       if (response.status === 200) {
//         alert(`Waiting for certification`);

//         document.getElementById(
//           'waitingCertification',
//         ).innerHTML = `<div class="mb-2" style="color: red">Waiting for certification</div>`;
//       }
//     })
//     .catch((error) => alert(error));
// }

// function submitKYCIdPicture(file) {
//   if (!file) {
//     return;
//   }
//   const authorization = localStorage.getItem('authorization');
//   const formData = new FormData();
//   formData.append('file', file);
//   axios
//     .put(
//       `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/kyc/idNoPicture`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${authorization} `,
//           'Content-Type': 'multipart/form-data',
//         },
//       },
//     )
//     .then((response) => {
//       if (response.status === 200) {
//       }
//     })
//     .catch((error) => alert(error));
// }

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
  inputEmailVerify();
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
    inputEmailVerify();
  }
});
