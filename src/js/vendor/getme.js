// var serverHost = 'test.storm-control.cc';
// var serverHead = 'https';
// var serverPort = 443;

var serverHost = 'localhost';
var serverHead = 'http';
var serverPort = 5500;

$(document).ready(async () => {
  await getmedetail();
});

async function getmedetail() {
  const authorization = localStorage.getItem('authorization');

  axios
    .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        data = response.data;
        const userLevel = data.body.userLevel;
        const hrefSplit = window.location.href.split('/');
        if (
          userLevel === 'UNAUTHORIZATION_USER' &&
          hrefSplit[hrefSplit.length - 1] !== 'userVerify.html'
        ) {
          window.location.href = 'userVerify.html';
        }
        localStorage.setItem('userEmail', data.body.userEmail);
        localStorage.setItem('userLevel', data.body.userLevel);
        if (document.getElementById('email')) {
          document.getElementById('email').value = data.body.userEmail;
        }
        if (document.getElementById('userEmail')) {
          document.getElementById(
            'userEmail',
          ).innerHTML = `<span> ${data.body.userEmail}</span>`;
        }
        if (document.getElementById('profilePicture')) {
          document.getElementById(
            'profilePicture',
          ).innerHTML = `<span data-toggle="modal" data-target="#profilePictureUpload"><img alt="Profile Picture" src="${data.body.profilePictureUri}" /></span>`;
        }

        if (document.getElementById('uuid')) {
          document.getElementById('uuid').value = data.body.uuid;
        }
        if (document.getElementById('nickname')) {
          document.getElementById('nickname').value = data.body.nickname;
        }
        if (document.getElementById('firstName')) {
          document.getElementById('firstName').value = data.body.firstname;
        }
        if (document.getElementById('lastName')) {
          document.getElementById('lastName').value = data.body.lastname;
        }
        if (document.getElementById('birthday')) {
          document.getElementById('birthday').value = data.body.birthday;
        }
        if (document.getElementById('gender') && data.body.gender) {
          document.getElementById(
            'gender',
          ).text = data.body.gender.toLowerCase();
        }
        if (document.getElementById('region')) {
          document.getElementById('region').value = data.body.region;
        }

        //                document.getElementById("userEmail").innerHTML = "<span>" + data.body.userEmail + "</span>";
        //                document.getElementById("uuid").value = data.body.id;
      }
    })
    .catch((error) => {
      alert(error);
      window.location.href = '../index.html';
    });
}

function userLogout() {
  localStorage.removeItem('authorization');
  window.location.href = '../index.html';
  localStorage.removeItem('loginType');
}
