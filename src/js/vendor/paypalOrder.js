function paypalReceive(data, feeId) {
  const authorization = localStorage.getItem('authorization');
  const callObj = {
    feeId,
    linksHref: data.links[0].href,
    addressCountryCode: data.payer.address.country_code,
    amountValue: data.purchase_units[0].amount.value,
    amountCurrencyCode: data.purchase_units[0].amount.currency_code,
    address: Object.values(data.purchase_units[0].shipping.address).reduce(
      (e, n) => e + ' ' + n,
    ),
    name: Object.values(data.payer.name).reduce((e, n) => e + ' ' + n),
    paypalId: data.id,
    payerId: data.payer.payer_id,
    status: data.status,
  };

  axios
    .post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/paypal/buy/new`,
      callObj,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        alert('Successful purchase!');
      }
    })
    .catch((error) => alert(error));
}
function paypalRenew(data, userFeeId) {
  const authorization = localStorage.getItem('authorization');
  const callObj = {
    linksHref: data.links[0].href,
    addressCountryCode: data.payer.address.country_code,
    amountValue: data.purchase_units[0].amount.value,
    amountCurrencyCode: data.purchase_units[0].amount.currency_code,
    address: Object.values(data.purchase_units[0].shipping.address).reduce(
      (e, n) => e + ' ' + n,
    ),
    name: Object.values(data.payer.name).reduce((e, n) => e + ' ' + n),
    paypalId: data.id,
    payerId: data.payer.payer_id,
    status: data.status,
  };

  axios
    .put(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/paypal/${userFeeId}/renew`,
      callObj,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    )
    .then((response) => {
      if (response.status === 200) {
        alert('Successful renewal!');
      }
    })
    .catch((error) => alert(error));
}
