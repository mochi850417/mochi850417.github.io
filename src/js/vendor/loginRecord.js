function loginRecord(pages = 1, size = 2) {
  document.getElementById('modal-detail-body').innerHTML = '';
  const authorization = localStorage.getItem('authorization');
  axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/loginRecord`,
      {
        params: {
          page: pages,
          size,
          order: 'id',
          sort: 'DESC',
          search: document.getElementById('searchbar').value,
        },
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        const data = response.data;
        const totalpage = Math.ceil(data.total / size) || 1;

        const nowpage = pages;
        console.log(data, nowpage);

        pageCount(totalpage);
        await Promise.all(
          data.body.map(async (d) => {
            document.getElementById(
              'modal-detail-body',
            ).innerHTML += `<table class="table table-borderless">
                          <tbody>
                            <tr>
                              <th scope="col">${i18n('login_time')}</th>
                              <th scope="col" class="right_col">${moment(
                                d.createdAt,
                              ).format('YYYY-MM-DD hh:mm:ss')}</th>
                            </tr>
                            <tr>
                              <th scope="row">${i18n('login_ip')}</th>
                              <th scope="row" class="right_col">${
                                d.loginIp
                              }</th>
                            </tr>
                            <tr>
                              <th scope="row">${i18n('login_platform')}</th>
                              <th scope="row" class="right_col">${
                                d.channel
                              }</th>
                            </tr>
                            <tr>
                              <th scope="row">MAC</th>
                              <th scope="row" class="right_col">${
                                d.macAddress
                              }</th>
                            </tr>
                            <div class="line"></div>
                          </tbody>
                        </table>`;
          }),
        );
        document.getElementById(
          'modal-detail-foot',
        ).innerHTML = `<nav aria-label="...">
                              <ul class="pagination pagination-sm">
                              ${pageCount(totalpage)}
                              </ul>
                            </nav>`;
        document
          .getElementById(`page${nowpage}`)
          .setAttribute('class', 'page-item active');
      }
    })
    .catch((error) => alert(error));
}

function pageCount(count) {
  let string = '';
  for (let i = 1; i <= count; i++) {
    string += `<li class="page-item" id="page${i}" aria-current="page">
                                <a class="page-link" href="#" aria-current="page" onclick="loginRecord(${i})">${i}</a>
                            </li>`;
  }

  return string;
}
