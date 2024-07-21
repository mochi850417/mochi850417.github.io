const platformId = 1;
const animatorSpeed = 500;
const feeList = document.getElementById('feeList');
const userFeeList = document.getElementById('userFeeList');
const product = {
  1: {
    usd: null,
    twd: null,
  },
};
let productFeeId;
let buyType;
let nowCurrency = getExchangeRateByLanguage(); //新增i18n 匯率
product[1][localStorage.getItem];

let currencyExchange;

function getExchangeRateByLanguage() {
  let exchangeRate;
  switch (localStorage.getItem('language')) {
    case 'en_US':
      exchangeRate = 'USD';
      break;
    case 'zh_TW':
      exchangeRate = 'TWD';
      break;
    case 'zh_CH':
      exchangeRate = 'CNY';
      break;
    default:
  }
  return exchangeRate;
}
window.onload = async function () {
  await showFeeList();
  await showMyFeeList();
};

function isCheckAll() {
  if ($('#checkAll').is(':checked')) {
    $('.feeItem').each(function () {
      $(this).prop('checked', true);
    });
  } else {
    $('.feeItem').each(function () {
      $(this).prop('checked', false);
    });
  }
}

async function showFeeList() {
  const authorization = localStorage.getItem('authorization');
  feeList.innerHTML = '';

  await axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/fee/platform/1/active/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          order: 'id',
          sort: 'ASC',
          currency: nowCurrency,
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        await Promise.all(
          response.data.body.map(async (data) => {
            feeList.innerHTML += ` <div class="product-block">
            <div class="imgBlock">
                  <img src=${data.coverUri}></div>
                  <div class="product-line"></div>
                  <h2>${data.name}</h2>
                  ${
                    data.saleValue
                      ? `<p class="listPrice">List Price: ${data.amountValue} ${data.amountCurrencyCode}</p><p class="salePrice">Price: <span>${data.saleValue}</span> ${data.amountCurrencyCode}/Month</p>`
                      : `<p>&nbsp</p><p class="salePrice">Price: <span>${data.amountValue}</span> ${data.amountCurrencyCode}/Month</p>`
                  }
                  <button type="button" class="button-hover" data-toggle="modal" data-target="#buyContent" onclick="addProductFeeId(${
                    data.id
                  })"><span>${i18n('buy')}</span></button>
                </div>`;
            // `<div class="col-12 list" data-check-all="checkAll">
            //     <div class="card d-flex flex-row mb-3">
            //         <div class="d-flex flex-grow-1 min-width-zero">
            //             <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            //                 <i class="simple-icon-user w-15"></i>
            //                 <h2 class="list-item-heading mb-0 truncate w-40 w-xs-100">
            //                     ${data.name}
            //                 </h2>
            //                 <h3 class="list-item-heading mb-0 truncate w-40 w-xs-100">${
            //                   data.amountCurrencyCode
            //                 } $${data.amountValue}/Month</h3>
            //                 <div class="w-30 w-xs-100">
            //                     <span class="badge badge-pill badge-secondary">ON HOLD</span>
            //                 </div>
            //                 <div class="w-10 w-xs-100"><button type="button" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#ModalContent" onclick="getUserInfo(${
            //                   data.id
            //                 })">${i18n('buy')}</button></div>
            //             </div>

            //         </div>
            //     </div>
            // </div>`;
          }),
        );
        //  <div style="" id="smart-button-container">
        //                                           <div style="text-align: center;padding-top: 20px">
        //                                               <div id="paypal-button-container${data.id}"></div>
        //                                           </div>
        //                                       </div>

        await Promise.all(
          response.data.body.map(async (data) => {
            await initPayPalButton(data);
          }),
        );
      }
    })
    .catch((e) => {
      feeList.innerHTML = 'Check your Internet or Server Interval...';
    });
}

async function showMyFeeList() {
  const authorization = localStorage.getItem('authorization');
  userFeeList.innerHTML = '';
  await axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/platform/1/fee/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          sort: 'ASC',
          order: 'id',
          type: 'NEW',
        },
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        const completedOrder = response.data.body.filter((d) => {
          if (d.status === 'COMPLETED') {
            return d.status;
          } //攔截PENDING訂單，未來新增接續PENDING訂單購買購物車功能，將此if拿掉即可
        });
        completedOrder.forEach(async (data, i) => {
          const createdDate = moment(data.createdAt).format('YYYY-MM-DD');
          const endDate = moment(data.date).format('YYYY-MM-DD');
          userFeeList.innerHTML += `
                <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <p class="list-item-heading mb-0 truncate w-10 w-xs-100">
                                    <b>${i18n('id')}</b><br>${i + 1}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>${i18n('product_name')}</b></br>${
            data.feeName
          }
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>${i18n(
                                      'purchase_date',
                                    )}</b></br>${moment(data.createdAt).format(
            'yyyy-MM-DD hh:mm:ss',
          )}
                                </p>
                               <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>${i18n('expire')}</b></br>${
            data.date ? moment(data.date).format('yyyy-MM-DD hh:mm:ss') : null
          }
                                </p> 
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n('tracking_code')}</b></br>${
            data.paymentId
          }
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n('validity')}</b></br>${DateDiff(
            endDate,
          )}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>${i18n('price')}</b></br>${
            data.amountCurrencyCode
          } $${data.amountValue}
                                </p>

                                ${
                                  moment(data.date).subtract(30, 'day') <
                                  moment()
                                    ? `<div class="w-10 w-xs-100"><button type="button" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#buyContent" onclick="addRenewHref(${
                                        data.id
                                      })">${i18n('renew')}</button></div>`
                                    : ` <div class="w-10 w-xs-100">
                                                <span class="badge badge-pill badge-success">Free</span>
                                            </div>`
                                }

                            </div>
                        </div>
                    </div>
              `;
        }),
          {
            /* <div style="" id="smart-button-container">
                                            <div style="text-align: center;padding-top: 20px">
                                                <div id="paypal-renewbutton-container${data.id}"></div>
                                            </div>
                                        </div>
                                        ` */
          };

        await Promise.all(
          response.data.body.map(async (data) => {
            if (moment(data.date).subtract(5, 'day') < moment()) {
              // await initRenewPayPalButton(data);
            }
          }),
        );
      }
    })
    .catch((e) => {
      console.error(e);
    });
}

async function initPayPalButton(dataInfo) {
  paypal.Buttons({
    style: {
      shape: 'pill',
      color: 'white',
      layout: 'horizontal',
      label: 'paypal',
      tagline: true,
    },

    createOrder: async function (data, actions) {
      const authorization = localStorage.getItem('authorization');
      const result = await axios.get(
        `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/platform/${platformId}/userFee/canBuy`,
        {
          headers: {
            Authorization: `Bearer ${authorization} `,
          },
        },
      );
      if (result.status !== 200) {
        document.getElementById('dialog').innerHTML = result.data;
        return;
      }

      if (!result.data.body) {
        document.getElementById('dialog').innerHTML = '購買達上限';
        $('#dialog').dialog({
          height: 150,
          modal: true,
          show: { effect: 'hightlight', duration: animatorSpeed * 2 },
          hide: { effect: 'fade', duration: animatorSpeed },
          buttons: [
            {
              text: 'Close',
              click: function () {
                $(this).dialog('close');
              },
            },
          ],
        });
        return;
      }

      return actions.order.create({
        purchase_units: [
          {
            description: dataInfo.name,
            amount: {
              currency_code: dataInfo.amountCurrencyCode,
              value: dataInfo.saleValue || dataInfo.amountValue,
            },
          },
        ],
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        paypalRenew(details, dataInfo.id);
      });
    },

    onError: function (err) {
      console.log(err);
    },
  });
  // .render(`#paypal-button-container${dataInfo.id}`);
}

function addProductFeeId(feeId) {
  productFeeId = feeId;
  buyType = 'new';
}
function addRenewHref(userFeeId) {
  productFeeId = userFeeId;
  buyType = 'renew';
}

function addNewHref() {
  const buyPageId = document.getElementById('appendHref');
  buyPageId.href = `./ECpay.html?id=${productFeeId}&type=${buyType}`;
}
// async function initRenewPayPalButton(dataInfo) {
//   paypal.Buttons({
//     style: {
//       shape: 'pill',
//       color: 'white',
//       layout: 'horizontal',
//       label: 'paypal',
//       tagline: true,
//     },

//     createOrder: async function (data, actions) {
//       return await actions.order.create({
//         purchase_units: [
//           {
//             description: dataInfo.name,
//             amount: {
//               currency_code: dataInfo.amountCurrencyCode,
//               value: dataInfo.saleValue || dataInfo.amountValue,
//             },
//           },
//         ],
//       });
//     },

//     onApprove: function (data, actions) {
//       return actions.order.capture().then(function (details) {
//         paypalRenew(details, dataInfo.id);
//       });
//     },

//     onError: function (err) {
//       console.log(err);
//     },
//   });
// .render(`#paypal-renewbutton-container${dataInfo.id}`);
// }

if (!localStorage.getItem('language')) {
  window.onload = localStorage.setItem('language', 'en_US');
  nowCurrency = 'USD';
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
    nowCurrency = 'USD';
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
  showFeeList();
  showMyFeeList();
});
document.getElementById('tw').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'zh_TW') {
    nowCurrency = 'TWD';
    document.getElementById('selected-lang').innerHTML = '中文';
    localStorage.setItem('language', 'zh_TW');
    getDataI18n();
    showFeeList();
    showMyFeeList();
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

function DateDiff(endDate) {
  let remainDays = moment(endDate).diff(moment(), 'days');
  if (remainDays >= 0) {
    return remainDays;
  }

  return (remainDays = 0);
}
