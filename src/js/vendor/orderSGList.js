//設定全預值
let size = 5;
let total = 0;
let nowpages = 1;
const platformId = 1;

//自動執行orderhistory()
orderhistory();

function orderhistory(pages = 1) {
  nowpages = pages;
  document.getElementById('orderlist').innerHTML = '';
  const authorization = localStorage.getItem('authorization');
  //顯示資料

  axios
    //撈資料
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/platform/${platformId}/fee/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          page: pages,
          size,
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        data = response.data;

        if (data.body.length) {
          total = data.total;
          await orderControl();
          document.getElementById(`page${pages}`).className += ' active';
        }

        await Promise.all(
          data.body.map(async (d) => {
            document.getElementById('orderlist').innerHTML += `
<div class="card d-flex flex-row mb-3">
<div class="d-flex flex-grow-1 min-width-zero">
<div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
<p class="list-item-heading mb-0 truncate w-40 w-xs-100">
${i18n(`SG email and sms verify finish`)}
 </p>
<p class="mb-0 text-muted text-small w-15 w-xs-100">${moment(d.date).format(
              'YYYY-MM-DD A hh:mm:ss',
            )}</p>
<p class="mb-0 text-muted text-small w-15 w-xs-100">${d.amountCurrencyCode}${
              d.amountValue
            }</p>
<div class="w-15 w-xs-100"><span class="badge badge-pill badge-secondary">ON HOLD</span>
</div><a class="btn btn-outline-primary" href="#" onclick="orderInfo(${d.id})">
                                    Details</a></div></div></div>`;
          }),
        );
      }
    });
}

async function orderInfo(userFeeId) {
  location.assign(`./OrderInfo.html?userFeeId=${userFeeId}`);
  //顯示資料
}

function orderControl() {
  const page = Math.ceil(total / size);

  document.getElementById(
    'orderControl',
  ).innerHTML = `<ul class="pagination justify-content-center mb-0">
                            <li class="page-item ">
                                <a class="page-link first" href="#" id="first" onclick="orderhistory(1)">
                                    <i class="simple-icon-control-start"></i>
                                </a>
                            </li>
                            <li class="page-item ">
                                <a class="page-link prev" href="#" id="prev" onclick="prev()">
                                    <i class="simple-icon-arrow-left"></i>
                                </a>
                            </li>
                            ${pageCount(page)}
                            <li class="page-item">
                                <a class="page-link next" href="#" aria-label="Next" id="next" onclick="next()">
                                    <i class="simple-icon-arrow-right"></i>
                                </a>
                            </li>
                            <li class="page-item ">
                                <a class="page-link last" href="#" id="last" onclick="orderhistory(${page})">
                                    <i class="simple-icon-control-end"></i>
                                </a>
                            </li>
                        </ul>`;
}

function pageCount(count = 5) {
  let string = '';
  for (let i = 1; i <= count; i++) {
    string += `<li class="page-item" id="page${i}">
                                <a class="page-link" href="#" onclick="orderhistory(${i})">${i}</a>
                            </li>`;
  }
  return string;
}

function next() {
  nowpages += 1;
  if (total && nowpages > Math.ceil(total / size)) {
    nowpages = Math.ceil(total / size);
  }
  orderhistory(nowpages);
}

function prev() {
  nowpages -= 1;
  if (nowpages < 1) {
    nowpages = 1;
  }
  orderhistory(nowpages);
}

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
  }
});
