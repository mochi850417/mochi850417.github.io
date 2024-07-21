var serverHost = 'test.storm-control.cc';
var serverHead = 'https';
var serverPort = 443;

let donateValue = 0;
let quotaValue = true;
let carruer = '';
let count = '1';
let nowFeeId;
let currencyType;
const CarruerType = {
  NATURE: '3',
  CELLPHONE: '2',
  NO_DEVICE: '',
};

class NewFeeDetail {
  constructor() {
    this.token = localStorage.getItem('authorization');
    this.id = parseInt(new URL(location.href).searchParams.get('id'));
    this.urlType = new URL(location.href).searchParams.get('type');
  }

  getUrlType() {
    return this.urlType;
  }

  getUrlId() {
    return this.id;
  }

  newFeeContent() {
    if (this.urlType === 'new') {
      this.newFee();
    } else if (this.urlType === 'renew') {
      this.renewFee();
    }
  }

  async newFee() {
    try {
      const result = await axios.get(
        `${serverHead}://${serverHost}:${serverPort}/api/v1/fee/${this.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token} `,
          },
          params: {
            currency: currencyType,
          },
        },
      );

      if (result.status === 200) {
        const newFeeData = result.data.body;
        const newFeeECpay = new ECpayContent(this.id, this.urlType);
        newFeeECpay
          .setFeeName(newFeeData.name)
          .setUnitPrice(newFeeData.saleValue || newFeeData.amountValue);
        newFeeECpay.feeContent(newFeeData);
      } else if (result.status === 401) {
        console.log('new fee error');
      }
    } catch (e) {
      console.error('\x1b[35m', 'e = ', e, e.status, '\x1b[0m');
    }
  }

  async renewFee() {
    try {
      const result = await axios.get(
        `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/fee/${this.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token} `,
          },
          params: {
            currency: currencyType,
          },
        },
      );

      if (result.status === 200) {
        const renewFeeData = result.data.body;
        count = renewFeeData.quantity;
        const renewFeeECpay = new ECpayContent(this.id, this.urlType);
        renewFeeECpay
          .setFeeName(renewFeeData.feeName)
          .setUnitPrice(
            renewFeeData.feeSaleValue || renewFeeData.feeAmountValue,
          );
        renewFeeECpay.renewCount();
      } else if (result.status === 401) {
        console.log('renew fee error');
      }
    } catch (e) {
      console.error('\x1b[35m', 'e = ', e, e.status, '\x1b[0m');
    }
  }
}

class ECpayContent {
  constructor(id, urlType) {
    this.authorization = localStorage.getItem('authorization');
    this.donation = donateValue.toString();
    this.taxID = document.getElementById('taxID').value;
    this.CustomerAddr = document.getElementById('customerAddr').value;
    this.quota = quotaValue;
    this.id = id;
    this.urlType = urlType;
    this.unitPrice = 0;
    this.feeName = null;
  }

  setUnitPrice(price) {
    this.unitPrice = price;
    return this;
  }
  setFeeName(feeName) {
    this.feeName = feeName;
    return this;
  }
  async feeContent() {
    document.querySelector('.minus-btn').setAttribute('disabled', 'disabled');
    document.querySelector('.plus-btn').addEventListener('click', () => {
      count = document.getElementById('changedInput').value;
      count++;
      document.getElementById('changedInput').value = count;
      if (count > 1) {
        document.querySelector('.minus-btn').removeAttribute('disabled');
        document.querySelector('.minus-btn').classList.remove('disabled');
      }
      if (count === 9) {
        document
          .querySelector('.plus-btn')
          .setAttribute('disabled', 'disabled');
      }
      count = count.toString();
      totalPrice(count);
    });
    document.querySelector('.minus-btn').addEventListener('click', () => {
      count = document.getElementById('changedInput').value;
      count--;
      document.getElementById('changedInput').value = count;
      if (count === 1) {
        document
          .querySelector('.minus-btn')
          .setAttribute('disabled', 'disabled');
      }
      if (count < 9) {
        document.querySelector('.plus-btn').removeAttribute('disabled');
        document.querySelector('.plus-btn').classList.remove('disabled');
      }
      count = count.toString();
      totalPrice(count);
    });
    const totalPrice = (count) => {
      let totalPrice = count * this.unitPrice;
      document.getElementById('totalPrice').innerHTML = `
  總共 <span class="priceTag">${totalPrice}</span> 元`;
    };

    document.getElementById(
      'productName',
    ).innerHTML = `<h2>${this.feeName}</h2>`;
    document.getElementById(
      'totalPrice',
    ).innerHTML = `總共 <span class="priceTag">${this.unitPrice}</span> 元`;
    document.getElementById('sendBtnImg').addEventListener('click', () => {
      this.feeBtn(this.urlType);
    });
  }
  async renewCount() {
    document.getElementById('changedInput').value = count;
    document.getElementById('count').classList.add('countDisabled');
    document.querySelector('.minus-btn').setAttribute('disabled', 'disabled');
    document.querySelector('.plus-btn').setAttribute('disabled', 'disabled');
    document.getElementById(
      'productName',
    ).innerHTML = `<h2>${this.feeName}</h2>`;
    document.getElementById(
      'totalPrice',
    ).innerHTML = `總共 <span class="priceTag">${this.unitPrice}</span> 元`;
    document.getElementById('sendBtnImg').addEventListener('click', () => {
      this.feeBtn(this.urlType);
    });
  }
  // async renewFeeContent(renewFeeData) {
  //   unitPrice = renewFeeData.feeSaleValue || renewFeeData.feeAmountValue;
  //   document.getElementById(
  //     'productName',
  //   ).innerHTML = `<h2>${renewFeeData.feeName}</h2>`;
  //   document.getElementById(
  //     'totalPrice',
  //   ).innerHTML = `總共 <span class="priceTag">${unitPrice}</span> 元`;
  //   document.getElementById('sendBtnImg').addEventListener('click', () => {
  //     this.feeBtn(this.urlType);
  //   });
  // }
  async setCountBtn() {}
  async feeBtn(type) {
    const key = type === 'new' ? 'feeId' : 'userFeeId';
    const obj = {
      TradeDesc: '促銷方案',
      ChoosePayment: 'ALL',
      InvoiceItemCount: count,
      Donation: this.donation,
      CustomerIdentifier: this.taxID || undefined,
      CustomerAddr: this.CustomerAddr,
      useQuota: this.quota,
    };
    obj[key] = this.id;
    console.log(obj);
    try {
      const result = await axios.post(
        `${serverHead}://${serverHost}:${serverPort}/api/v1/ecpay/Cashier/AioCheckout/${type}`,
        obj,
        {
          headers: {
            Authorization: `Bearer ${this.authorization} `,
          },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        },
      );

      if (result.status === 200) {
        document.write(result.data.body);
      } else if (result.status === 401) {
        renderLoginPage();
      } else if (result.status === 403) {
        console.log(123);
      }
    } catch (e) {
      console.error('\x1b[35m', 'e = ', e, e.status, '\x1b[0m');
    }
  }
}

function sendBtnConditionPass() {
  document.getElementById('paybtn').style.filter = 'grayscale(0)';
  document.getElementById('paybtn').style.pointerEvents = 'auto';
  document.getElementById('sendBtnImg').removeAttribute('disabled');
}
function resultChecking() {
  const natureInputValue = document.getElementById('natureInput').value;
  const cellInputValue = document.getElementById('cellInput').value;
  const taxIdNumberInput = document.getElementById('taxID').value;

  if (carruer === CarruerType.CELLPHONE) {
    if (!regCell(cellInputValue)) {
      return;
    }
  } else if (carruer === CarruerType.NATURE) {
    if (!regNature(natureInputValue)) {
      return;
    }
  }

  if (document.getElementById('taxCheck').checked) {
    if (!regTax(taxIdNumberInput)) {
      return;
    }
  }

  // can buy
  sendBtnConditionPass();
}
window.onload = async function () {
  await noCheck();
  const feeDetail = new NewFeeDetail();
  feeDetail.newFeeContent();
};

async function renderLoginPage() {
  alert('登入憑證失效');
  window.location.href = 'Login.html';
}

// async function userPayment() {
//   const authorization = localStorage.getItem('authorization');
//   const donation = donateValue.toString();
//   const taxID = document.getElementById('taxID').value;
//   const CustomerAddr = document.getElementById('customerAddr').value;
//   const quota = quotaValue;

//   try {
//     const result = await axios.post(
//       `${serverHead}://${serverHost}:${serverPort}/api/v1/ecpay/Cashier/AioCheckout/new`,
//       {
//         feeId: parseInt(nowFeeId),
//         TradeDesc: '促銷方案',
//         ChoosePayment: 'ALL',
//         InvoiceItemCount: count,
//         Donation: donation,
//         CustomerIdentifier: taxID || undefined,
//         CustomerAddr,
//         useQuota: quota,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${authorization} `,
//         },
//         validateStatus: function (status) {
//           return status >= 200 && status < 500;
//         },
//       },
//     );

//     if (result.status === 200) {
//       document.write(result.data.body);
//     } else if (result.status === 401) {
//       renderLoginPage();
//     }
//   } catch (e) {
//     console.error('\x1b[35m', 'e = ', e, e.status, '\x1b[0m');
//   }
// }

function promptMsg() {
  document.getElementById('promptMsg').style.opacity = '1';
}

function removePromptMsg() {
  document.getElementById('promptMsg').style.opacity = '0';
}

function promptNature() {
  document.getElementById('promptNature').style.opacity = '1';
}

function removePromptNature() {
  document.getElementById('promptNature').style.opacity = '0';
}

function promptCell() {
  document.getElementById('promptCell').style.opacity = '1';
}

function removePromptCell() {
  document.getElementById('promptCell').style.opacity = '0';
}
function promptTax() {
  document.getElementById('promptTaxId').style.opacity = '1';
}
function removePromptTax() {
  document.getElementById('promptTaxId').style.opacity = '0';
}
function isChecked() {
  if (document.getElementById('donateCheck').checked) {
    donateValue = 1;
    document.getElementById('invoiceWrap').style.height = '0';
    document.getElementById('invoiceWrap').style.opacity = '0';
    document.getElementById('paybtn').style.filter = 'grayscale(0)';
    document.getElementById('device').style.pointerEvents = 'none';
    document.getElementById('taxIdNumber').style.pointerEvents = 'none';
    document.getElementById('taxId').style.pointerEvents = 'none';
    document.getElementById('sendBtnImg').removeAttribute('disabled');
    document.getElementById('noDevice').checked = false;
    document.getElementById('nature').checked = false;
    document.getElementById('cellphone').checked = false;
  } else {
    donateValue = 0;
    document.getElementById('invoiceWrap').style.height = 'auto';
    document.getElementById('invoiceWrap').style.opacity = '1';
    document.getElementById('device').style.pointerEvents = 'auto';
    document.getElementById('taxIdNumber').style.pointerEvents = 'auto';
    document.getElementById('taxId').style.pointerEvents = 'auto';
    document.getElementById('taxCheck').checked = false;
    noCheck();
    taxChecked();
  }
}
function taxChecked() {
  if (document.getElementById('taxCheck').checked) {
    document.getElementById('taxId').style.height = 'auto';
    document.getElementById('taxId').style.opacity = '1';
    document.getElementById('taxId').style.pointerEvents = 'auto';
    document.getElementById('nature').setAttribute('disabled', 'true');
    disBtn();
    resultChecking();
  } else {
    document.getElementById('taxId').style.height = '0';
    document.getElementById('taxId').style.opacity = '0';
    document.getElementById('taxId').style.pointerEvents = 'none';
    document.getElementById('nature').removeAttribute('disabled');
    actBtn();
  }
}
function noCheck() {
  carruer = CarruerType.NO_DEVICE;
  document.getElementById('radioCell').style.height = '0';
  document.getElementById('radioCell').style.opacity = '0';
  document.getElementById('radioNature').style.height = '0';
  document.getElementById('radioNature').style.opacity = '0';
  document.getElementById('radioNature').style.pointerEvents = 'none';
  document.getElementById('paybtn').style.filter = 'grayscale(0)';
  document.getElementById('sendBtnImg').removeAttribute('disabled');
  document.getElementById('noDevice').checked = true;
  document.getElementById('radioCell').style.pointerEvents = 'none';

  if (document.getElementById('taxCheck').checked) {
    document.getElementById('taxId').style.pointerEvents = 'auto';
    regTax();
  } else {
    document.getElementById('taxId').style.pointerEvents = 'none';
  }
  resultChecking();
}

function naturalbtn() {
  carruer = CarruerType.NATURE;
  document.getElementById('paybtn').style.filter = 'grayscale(1)';
  document.getElementById('sendBtnImg').setAttribute('disabled', 'true');
  document.getElementById('radioNature').style.display = 'block';
  document.getElementById('natureInput').style.display = 'block';
  document.getElementById('radioNature').style.height = 'auto';
  document.getElementById('radioNature').style.opacity = '1';
  document.getElementById('radioNature').style.pointerEvents = 'auto';
  document.getElementById('radioCell').style.pointerEvents = 'none';
  document.getElementById('radioCell').style.display = 'none';
  document.getElementById('cellInput').style.display = 'none';
  document.getElementById('radioCell').style.height = '0';
  document.getElementById('radioCell').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('radioCell').style.display = 'block';
    document.getElementById('cellInput').style.display = 'none';
  }, 300);
  resultChecking();
}

function cellbtn() {
  carruer = CarruerType.CELLPHONE;
  document.getElementById('paybtn').style.filter = 'grayscale(1)';
  document.getElementById('sendBtnImg').setAttribute('disabled', 'true');
  document.getElementById('radioCell').style.height = 'auto';
  document.getElementById('radioCell').style.opacity = '1';
  document.getElementById('cellInput').style.display = 'block';
  document.getElementById('radioCell').style.pointerEvents = 'auto';
  document.getElementById('radioNature').style.pointerEvents = 'none';
  document.getElementById('radioNature').style.height = '0';
  document.getElementById('radioNature').style.opacity = '0';
  document.getElementById('radioNature').style.display = 'none';
  setTimeout(() => {
    document.getElementById('radioNature').style.display = 'block';
    document.getElementById('natureInput').style.display = 'none';
  }, 300);
  resultChecking();
}

function regNature(natureInputValue) {
  const regEx = /[A-Z]{2}[0-9]{14}/;

  if (!regEx.test(natureInputValue)) {
    document.getElementById('paybtn').style.filter = 'grayscale(1)';
    document.getElementById('paybtn').style.pointerEvents = 'none';
    document.getElementById('sendBtnImg').setAttribute('disabled', 'true');
    return false;
  }

  return true;
}
function regCell(cellInputValue) {
  const regEx = /\/[A-Z0-9\+\.-]{7}/;

  if (!regEx.test(cellInputValue)) {
    document.getElementById('paybtn').style.filter = 'grayscale(1)';
    document.getElementById('paybtn').style.pointerEvents = 'none';
    document.getElementById('sendBtnImg').setAttribute('disabled', 'true');
    return false;
  }

  return true;
}

function regTax(taxInputValue) {
  const regEx = /[0-9]{8}/;
  if (!regEx.test(taxInputValue)) {
    document.getElementById('paybtn').style.filter = 'grayscale(1)';
    document.getElementById('paybtn').style.pointerEvents = 'none';
    document.getElementById('sendBtnImg').setAttribute('disabled', 'true');
    return false;
  }
  return true;
}

function periodicCheck() {
  quotaValue = !quotaValue;
}

if (!localStorage.getItem('language')) {
  window.onload = localStorage.setItem('language', 'en_US');
}
if (localStorage.getItem('language') === 'zh_TW') {
  const css = document.getElementById('fakecss-selected');
  const c = css.sheet;
  c.insertRule(
    '#selected-lang#selected-lang:before{background-image: url(https://www.countryflags.io/tw/flat/32.png)}',
    0,
  );
}

document.getElementById('us').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'en_US') {
    localStorage.setItem('language', 'en_US');
    currencyType = 'USD';
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
    localStorage.setItem('language', 'zh_TW');
    currencyType = 'TWD';
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

function disBtn() {
  document.getElementById('natureControl').style.filter = 'grayscale(100%)';
  document.getElementById('natureLabel').style.cursor = 'not-allowed';

  if (document.getElementById('nature').checked) {
    document.getElementById('nature').checked = false;
    document.getElementById('radioNature').style.height = '0';
    document.getElementById('radioNature').style.opacity = '0';
    document.getElementById('radioNature').style.pointerEvents = 'none';
    document.getElementById('noDevice').checked = true;
  }
}
function actBtn() {
  document.getElementById('natureControl').style.filter = 'grayscale(0)';
  document.getElementById('natureLabel').style.cursor = 'pointer';

  noCheck();
}

//count
$('.buttons-only').inputSpinner({ buttonsOnly: true });
var $changedInput = $('#changedInput');
var $valueOnInput = $('#valueOnInput');
