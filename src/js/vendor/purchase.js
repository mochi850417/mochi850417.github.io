window.onload = async function () {
    await showFeeList();
    await showMyFeeList();
};

function isCheckAll() {
    if ($("#checkAll").is(':checked')) {
        $(".feeItem").each(function () {
            $(this).prop('checked', true);
        });
    } else {
        $(".feeItem").each(function () {
            $(this).prop('checked', false);
        });
    }
}

async function showFeeList() {
    const authorization = localStorage.getItem('authorization');
    await axios
        .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/fee/active/list`, {
            headers: {
                Authorization: `Bearer ${authorization} `,
            },
        })
        .then(async response => {
            if (response.status === 200) {
                document.getElementById("feeList").innerHTML = `<!--結合方塊-->
                            <div class="text-zero top-left-button-container mb-4">
                                <div class="btn-group">
                                    <div class="btn btn-primary btn-lg pl-4 pr-0 check-button">
                                        <label class="custom-control custom-checkbox mb-0 d-inline-block">
                                            <input type="checkbox" class="custom-control-input" id="checkAll" onclick="isCheckAll()">
                                            <span class="custom-control-label">&nbsp;</span>
                                        </label>
                                    </div>
                                    <button type="button" class="btn btn-lg btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                    </div>
                                </div>
                            </div>
                            <!--//結合方塊-->`
                await Promise.all(
                    response.data.body.map(async data => {
                        const checkSaleValueIsExist = `${data.saleValue
              ? `<p class="mb-2 text-default"><del>${data.amountCurrencyCode} $${data.amountValue}</del></p>
                                        <p class="text-large mb-2 text-default">${data.amountCurrencyCode} $${data.saleValue}</p>`
              : `<p class="text-large mb-2 text-default">${data.amountCurrencyCode} $${data.amountValue}</p>
                                        `}`;
                        const setCloudPhoneAmountIcon = `${data.cloudPhoneAmount >= 10
              ? data.cloudPhoneAmount >= 50 ? 'iconsminds-mens' : 'iconsminds-male-female'
              : 'iconsminds-male'}`;

                        document.getElementById('feeList').innerHTML += `
                        <div class="col-12 list" data-check-all="checkAll">

                            <div class="card d-flex flex-row mb-3">
                                <div class="d-flex flex-grow-1 min-width-zero">
                                    <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                        <i class="simple-icon-user w-15"></i>
                                        <h2 class="list-item-heading mb-0 truncate w-40 w-xs-100">
                                            1 CONTROL
                                        </h2>
                                        <h3 class="list-item-heading mb-0 truncate w-40 w-xs-100">USD $0/Month</h3>
                                        <div class="w-30 w-xs-100">
                                            <span class="badge badge-pill badge-secondary">ON HOLD</span>
                                        </div>

                                        <div style="" id="smart-button-container">
                                            <div style="text-align: center;padding-top: 20px">
                                                <div id="paypal-button-container${data.id}"></div>
                                            </div>
                                        </div>

                                    </div>
                                    <label class="custom-control custom-checkbox mb-1 align-self-center pr-4">
                                        <input type="checkbox" class="feeItem custom-control-input">
                                        <span class="custom-control-label">&nbsp;</span>
                                    </label>


                                </div>
                            </div>
                        </div>`;
                    })
                );

                await Promise.all(
                    response.data.body.map(async data => {
                        await initPayPalButton(data);
                    })
                );
            }
        })
        .catch(e => {
            document.getElementById('feeList').innerHTML = 'Check your Internet or Server Interval...';
        });
}

async function showMyFeeList() {
    const authorization = localStorage.getItem('authorization');
    await axios
        .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/fee/list`, {
            headers: {
                Authorization: `Bearer ${authorization} `,
            },
            params: {
                sort: 'ASC',
                order: 'id',
            },
        })
        .then(async response => {
            if (response.status === 200) {
                await Promise.all(
                    response.data.body.map(async data => {
                        document.getElementById('userFeeList').innerHTML += `
                <div class="card d-flex flex-row mb-3">
                        <div class="d-flex flex-grow-1 min-width-zero">
                            <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                <p class="list-item-heading mb-0 truncate w-20 w-xs-100">
                                    ${data.id}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    ${data.feeName}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    ${moment(data.createdAt).format('yyyy-MM-DD hh:mm:ss')}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    ${moment(data.date).format('yyyy-MM-DD hh:mm:ss')}
                                </p>
                                <p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    ${data.amountCurrencyCode} $${data.amountValue}
                                </p>
                                ${moment(data.date) < moment()
                                  ? `<p class="mb-0 text-primary w-20 w-xs-100 text-center">
                                    <a class="btn btn-outline-primary" href="Invoice.html">
                                        Info</a>
                                </p>`
                                  : `<p class="mb-0 text-primary w-20 w-xs-100 text-center">    
                                </p>`}
                                
                            </div>
                        </div>
                    </div>
              `;
                    })
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

            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: dataInfo.name,
                            amount: {
                                currency_code: dataInfo.amountCurrencyCode,
                                value: dataInfo.saleValue || dataInfo.amountValue
                            },
            },
          ],
                });
            },

            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    paypalReceive(details, dataInfo.id);
                });
            },

            onError: function (err) {
                console.log(err);
            },
        })
        .render(`#paypal-button-container${dataInfo.id}`);
}
