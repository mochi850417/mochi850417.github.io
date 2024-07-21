const platformId = 2;
const animatorSpeed = 500;
window.onload = async function() {
  await showFeeList();
  await showMyFeeList();
};

function isCheckAll() {
  if ($('#checkAll').is(':checked')) {
    $('.feeItem').each(function() {
      $(this).prop('checked', true);
    });
  } else {
    $('.feeItem').each(function() {
      $(this).prop('checked', false);
    });
  }
}

async function showFeeList() {
  const authorization = localStorage.getItem('authorization');
  await axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/fee/platform/2/active/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then(async response => {
      if (response.status === 200) {
        await Promise.all(
          response.data.body.map(async data => {
            document.getElementById('feeList').innerHTML += `
                        <div class="col-12 list" data-check-all="checkAll">

                            <div class="card d-flex flex-row mb-3">
                                <div class="d-flex flex-grow-1 min-width-zero">
                                    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                        <i class="simple-icon-user w-15"></i>
                                        <h2 class="list-item-heading mb-0 truncate w-40 w-xs-100">
                                            ${data.name}
                                        </h2>
                                        <h3 class="list-item-heading mb-0 truncate w-40 w-xs-100">${data.amountCurrencyCode} $${data.amountValue}/Month</h3>
                                        <div class="w-30 w-xs-100">
                                            <span class="badge badge-pill badge-secondary">ON HOLD</span>
                                        </div>
                                        <div style="" id="smart-button-container">
                                            <div style="text-align: center;padding-top: 20px">
                                                <div id="paypal-button-container${data.id}"></div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>`;
          }),
        );

        await Promise.all(
          response.data.body.map(async data => {
            await initPayPalButton(data);
          }),
        );
      }
    })
    .catch(e => {
      document.getElementById('feeList').innerHTML =
        'Check your Internet or Server Interval...';
    });
}

async function showMyFeeList() {
  const authorization = localStorage.getItem('authorization');
  await axios
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/platform/2/fee/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          sort: 'ASC',
          order: 'id',
        },
      },
    )
    .then(async response => {
      if (response.status === 200) {
        await Promise.all(
          response.data.body.map(async data => {
            document.getElementById('userFeeList').innerHTML += `
                <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <p class="list-item-heading mb-0 truncate w-20 w-xs-100">
                                    <b>ID: </b>${data.id}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>Fee Name:</b></br>${data.feeName}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>Purchase date:</b></br>${moment(
                                      data.createdAt,
                                    ).format('yyyy-MM-DD hh:mm:ss')}
                                </p>
                               <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <b>Product Deadline:</b></br>${data.date
                                      ? moment(data.date).format(
                                          'yyyy-MM-DD hh:mm:ss',
                                        )
                                      : null}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                   <b>Price:</b></br>${data.amountCurrencyCode} $${data.amountValue}
                                </p>

                                ${moment(data.date).subtract(5, 'day') <
                                moment()
                                  ? `
                                  <div style="" id="smart-button-container">
                                            <div style="text-align: center;padding-top: 20px">
                                                <div id="paypal-renewbutton-container${data.id}"></div>
                                            </div>
                                        </div>`
                                  : ``}

                            </div>
                        </div>
                    </div>
              `;
          }),
        );
        await Promise.all(
          response.data.body.map(async data => {
            if (moment(data.date).subtract(5, 'day') < moment()) {
              await initRenewPayPalButton(data);
            }
          }),
        );
      }
    })
    .catch(e => {
      console.error(e);
    });
}

async function initPayPalButton(dataInfo) {
  paypal
    .Buttons({
      style: {
        shape: 'pill',
        color: 'white',
        layout: 'horizontal',
        label: 'paypal',
        tagline: true,
      },

      createOrder: async function(data, actions) {
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
                click: function() {
                  $(this).dialog('close');
                },
              },
            ],
          });
          return;
        }

        return await actions.order.create({
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

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          paypalReceive(details, dataInfo.id);
        });
      },

      onError: function(err) {
        console.log(err);
      },
    })
    .render(`#paypal-button-container${dataInfo.id}`);
}

async function initRenewPayPalButton(dataInfo) {
  paypal
    .Buttons({
      style: {
        shape: 'pill',
        color: 'white',
        layout: 'horizontal',
        label: 'paypal',
        tagline: true,
      },

      createOrder: async function(data, actions) {
        return await actions.order.create({
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

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          paypalRenew(details, dataInfo.id);
        });
      },

      onError: function(err) {
        console.log(err);
      },
    })
    .render(`#paypal-renewbutton-container${dataInfo.id}`);
}
