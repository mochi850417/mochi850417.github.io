let thirdPartyLang = localStorage.getItem('language');

//FACEBOOK Login
window.fbAsyncInit = function () {
  FB.init({
    appId: '696925720898300',
    cookie: true,
    xfbml: true,
    version: 'v9.0',
  });

  FB.AppEvents.logPageView();
};

window.onload = facebookLogin(thirdPartyLang);

function facebookLogin(thirdPartyLang) {
  var js,
    fjs = document.getElementsByTagName('script')[0];
  if (document.getElementById('facebook-jssdk')) {
    return;
  }
  js = document.createElement('script');
  js.id = 'facebook-jssdk';
  js.src = `https://connect.facebook.net/${thirdPartyLang}/sdk.js`;
  fjs.parentNode.insertBefore(js, fjs);
}
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    const temporaryAccessToken = response.authResponse.accessToken;
    const userId = response.authResponse.userID;
    sendLoginInformation(temporaryAccessToken);
  });
}
function sendLoginInformation(temporaryAccessToken) {
  FB.api('/me', { fields: 'name, email' }, function (response) {
    const accessToken = temporaryAccessToken;
    const userName = response.name;
    const userEmail = response.email;
    const userId = response.id;
    userFacebookLogin(userId, accessToken, userName, userEmail);
  });
}
function userFacebookLogin(userId, accessToken, nickname, email) {
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/account/platform/1/facebook/signin`,
      {
        thirdpartyId: userId,
        thirdpartySecret: accessToken,
        email,
        nickname,
        type: 'FACEBOOK',
        channel: 'WEB',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authorization', data.body.token);
        localStorage.setItem('loginType', 'facebook');
        verifyFinished('Facebook');
      }
    })
    .catch((error) => alert(error));
}

//GOOGLE Login
window.onbeforeunload = function (e) {
  gapi.auth2.getAuthInstance().signOut();
};

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  const accessToken = googleUser.getAuthResponse().id_token;
  const userId = profile.getId();
  const userName = profile.getName();
  const userEmail = profile.getEmail();
  const firstName = profile.getGivenName();
  const lastName = profile.getFamilyName();
  userGoogleLogin(
    userId,
    accessToken,
    userName,
    userEmail,
    firstName,
    lastName,
  );
}

function userGoogleLogin(
  userId,
  accessToken,
  nickname,
  email,
  firstname,
  lastname,
) {
  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/account/platform/1/google/signin`,
      {
        thirdpartyId: userId,
        thirdpartySecret: accessToken,
        email,
        firstname,
        lastname,
        nickname,
        type: 'GOOGLE',
        channel: 'WEB',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('authorization', data.body.token);
        verifyFinished('Google');
      }
    })
    .catch((error) => alert(error));
}

function verifyFinished(loginType) {
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
        const data = response.data.body;
        if (data.emailVerify && data.smsVerify) {
          window.location.href = 'src/Account.html';
        } else {
          document.getElementById(
            'alertMsg',
          ).innerHTML = ` <div class="alert alert-success fade show" role="alert">
                        <h4 class="alert-heading">${loginType}登入成功</h4>
                        <p class="alertColor">請驗證信箱及手機，以獲得完整用戶功能</p>
                      </div>`;
          setTimeout(() => {
            window.location.href = 'src/Account.html';
          }, 3000);
        }
      }
    })
    .catch((error) => alert(error));
}
