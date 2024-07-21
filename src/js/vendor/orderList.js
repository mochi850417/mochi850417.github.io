//設定全預值
let size = 5;
let total = 0;
let nowpages = 1;
let filterStartDate;
let filterEndDate;

//自動執行orderhistory()
orderhistory();

function orderhistory(pages = 1) {
  nowpages = pages;
  document.getElementById('orderlist').innerHTML = '';
  document.getElementById('noContent').innerHTML = '';
  const authorization = localStorage.getItem('authorization');
  //顯示資料

  axios
    //撈資料
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/platform/1/fee/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          page: pages,
          size,
          type: 'ALL',
          startDate: filterStartDate,
          endDate: filterEndDate,
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
        } else {
          document.getElementById('noContent').innerHTML += `<h1>${i18n(
            'noContent',
          )}</h1>`;
        }
        const completedOrder = data.body.filter((d) => {
          if (d.status === 'COMPLETED') {
            return d.status;
          } //攔截PENDING訂單，未來新增接續PENDING訂單購買購物車功能，將此if拿掉即可
        });

        completedOrder.forEach(async (d, i) => {
          let license = d.paymentType === 'trial' ? 'Trail' : 'Active';

          document.getElementById('orderlist').innerHTML += `
            <div class="card d-flex flex-row mb-3">
              <div class="d-flex flex-grow-1 min-width-zero">
                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                  <p class="list-item-heading mb-0 truncate w-10 w-xs-100">
                    <b>${i18n('id')}</b><br>${i + 1}
                  </p>
                  <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                    <b>${i18n('product_name')}</b></br>${d.feeName}
                  </p>
                  <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                    <b>${i18n('purchase_date')}</b></br>${moment(
            d.createdAt,
          ).format('YYYY-MM-DD')}
                                </p>
                               <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>${i18n('expire')}</b></br>${
            d.date ? moment(d.date).format('YYYY-MM-DD') : null
          }
                                </p> 
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n('reference')}</b></br>${
            d.paymentId
          }
                                </p>
      
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n('price')}</b></br>${
            d.amountCurrencyCode
          } $${d.amountValue}
                                </p>
                                  <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n(
                                     'license',
                                   )}</b></br><span class="badge badge-pill badge-success">${license}</span>
                                </p>

                                ${`<div class="w-10 w-xs-100" >
                                <button type="button" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#ModalContent" onclick="showOrderInfo(${
                                  d.id
                                })">${i18n('details')}</button></div>`}

                            </div>
                        </div>
                    </div>`;
        });
      }
    });
}

function showOrderInfo(userFeeId) {
  const authorization = localStorage.getItem('authorization');
  const urlParams = new URLSearchParams(window.location.search);

  axios
    //撈資料
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/fee/${userFeeId}`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {},
      },
    )
    .then(async (response) => {
      document.getElementById('modal-body').innerHTML = '';
      if (response.status === 200) {
        const data = response.data.body;
        document.getElementById(
          'modalTitle',
        ).innerHTML = `訂單編號： ${data.paymentId}`;

        data.cloudPhones.map((d) => {
          document.getElementById('modal-body').innerHTML += `<h3>手機編號 ${
            d.idNo
          }</h3>
          <p>手機購買時間 ${moment(d.createdAt).format(
            'YYYY-MM-DD hh:mm:ss',
          )}</p>
          <p>手機到期時間 ${moment(d.userFeeDate).format(
            'YYYY-MM-DD hh:mm:ss',
          )}</p>
          <p>手機授權碼 ${d.uuid}</p><hr>`;
        });
      }
    })
    .catch((error) => {
      alert(error);
      //  window.location.href = '/html/index.html';
    });
}
//  onclick="orderInfo(${d.id})"
// async function showOrderInfo(userFeeId) {
//   location.assign(`./OrderInfo.html?userFeeId=${userFeeId}`);
//   //顯示資料
// }

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
  orderhistory(nowpages);
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
    orderhistory(nowpages);
  }
});

function focusCalendar(obj, target2) {
  const target = document.getElementById(target2);
  if (obj.value) {
    target.focus();
  }
  return;
}

function fitlerData() {
  if (
    document.getElementById('fromDate').value &&
    document.getElementById('toDate').value
  ) {
    filterStartDate = document.getElementById('fromDate').value + ' 00:00:00';
    filterEndDate = document.getElementById('toDate').value + ' 23:59:59';
    orderhistory();
  }
}
function clearDate() {
  filterStartDate = null;
  filterEndDate = null;
  $('#fromDate').val('').datepicker('clearDates');
  $('#toDate').val('').datepicker('clearDates');
  orderhistory();
}
