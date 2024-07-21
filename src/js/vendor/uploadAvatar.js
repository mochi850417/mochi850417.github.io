function uploadProfilePicture(file) {
  const authorization = localStorage.getItem('authorization');
  const formData = new FormData();
  formData.append('image', file);
  axios
    .put(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/profilePicture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        const avatar = document.querySelector('.img-thumbnail').src;
        document.getElementById(
          'profilePicture',
        ).innerHTML = `<span data-toggle="modal" data-target="#profilePictureUpload"><img alt="Profile Picture" src="${avatar}" /></span>`;
        alert('successful!');
      }
    })
    .catch((error) => alert(error));
}
