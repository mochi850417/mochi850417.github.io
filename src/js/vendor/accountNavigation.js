// $(window).load(function () {
getMeLevel();

async function getMeLevel() {
  const authorization = localStorage.getItem('authorization');

  axios
    .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        if (
          response.data.body.userLevel === 'ROOT' ||
          response.data.body.userLevel === 'ADMIN'
        ) {
          const AuthorizationCenter = document.getElementsByClassName(
            'AuthorizationCenter',
          )[0].innerHTML;
          document.getElementsByClassName('AuthorizationCenter')[0].innerHTML =
            `<a class="btn btn-sm btn-outline-primary ml-3 d-none d-md-inline-block" href="../src/admin/adminControl.html">&nbsp;
Authorization Center&nbsp;</a>` + AuthorizationCenter;
        }
      }
    });
}
// });
