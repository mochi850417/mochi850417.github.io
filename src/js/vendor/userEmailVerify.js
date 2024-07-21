var serverHost = 'test.storm-control.cc';
var serverHead = 'https';
var serverPort = 443;

userEmailVerify();

function userEmailVerify() {
  let token = new URLSearchParams(window.location.search).get('token');

  axios
    .patch(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/email/verify`,
      {
        token,
      },
    )
    .then((response) => {
      if (response.status === 200) {
        alert('Email Verify successful!');
        const data = response.data;
        localStorage.setItem('authorization', data.body.token);
        window.location.href = 'userVerify.html';
      }
    })
    .catch((error) => {
      alert(error);
      window.location.href = '../index.html';
    });
}
