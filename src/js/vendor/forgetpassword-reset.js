var serverHost = 'test.storm-control.cc';
var serverHead = 'https';
var serverPort = 443;

function doubleCheck(element) {
  const password = document.getElementById('password').value;
  const checkPassword = document.getElementById('checkPassword').value;
  if (password === checkPassword) {
    document.getElementById('tishi').innerHTML = "<font color='green'></font>";
    document.getElementById('submit').disabled = false;
  } else {
    document.getElementById('submit').disabled = true;
  }
}

function forgetPasswordReset() {
  let urlParams = new URLSearchParams(window.location.search);
  const password = document.getElementById('password').value;
  const checkPassword = document.getElementById('checkPassword').value;
  if (password !== checkPassword) {
    alert('Password does not match');
    return;
  }
  axios
    .patch(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/password/reset`,
      {
        token: urlParams.get('token'),
        password,
      },
      {},
    )
    .then((response) => {
      if (response.status === 200) {
        alert('Reset Password!');
        window.location.href = 'index.html';
      }
    })
    .catch((error) => alert(error));
}
