var serverHost = 'test.storm-control.cc';
var serverHead = 'https';
var serverPort = 443;

// var serverHost = 'localhost';
// var serverHead = 'http';
// var serverPort = 7009;

window.onload = async function () {
  await getMeOrderList();
  await getFeeActiveList();
};

async function renderLoginPage() {
  alert('登入憑證失效');
  window.location.href = 'Login.html';
}

async function userPayment() {
  const authorization = localStorage.getItem('authorization');
  const selected = document.getElementById('product').value;
  const donation = document.querySelector('input[name="donation"]:checked')
    .value;
  const taxID = document.getElementById('taxID').value;
  const CustomerAddr = document.getElementById('customerAddr').value;
  const quota = $('#quota').is(':checked');
  const quantity = document.getElementById('quantity').value;

  try {
    const result = await axios.post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/ecpay/Cashier/AioCheckout`,
      {
        feeId: parseInt(selected),
        TradeDesc: '促銷方案',
        ChoosePayment: 'ALL',
        InvoiceItemCount: quantity,
        Donation: donation,
        CustomerIdentifier: taxID || undefined,
        CustomerAddr,
        useQuota: quota,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
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
    }
  } catch (e) {
    console.error('\x1b[35m', 'e = ', e, e.status, '\x1b[0m');
  }
}

async function getMeOrderList() {
  const authorization = localStorage.getItem('authorization');

  try {
    const result = await axios.get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/fee/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      },
    );

    if (result.status === 200) {
      const table = document.getElementById('orderTable');
      const controller = document.getElementById('controller');
      await Promise.all(
        result.data.body.map(async (d) => {
          const row = document.createElement('tr');
          row.id = 'dataRow';
          row.class = 'dataRow';

          const id = row.insertCell(0);
          const amountValue = row.insertCell(1);
          const paymentId = row.insertCell(2);
          const feeName = row.insertCell(3);
          const createdAt = row.insertCell(4);
          const paymentType = row.insertCell(5);
          const status = row.insertCell(6);

          id.innerHTML = d.id;
          amountValue.innerHTML = d.amountValue;
          paymentId.innerHTML = d.paymentId;
          feeName.innerHTML = d.feeName;
          createdAt.innerHTML = d.createdAt;
          paymentType.innerHTML = d.paymentType;
          status.innerHTML = d.status;

          controller.appendChild(row);
        }),
      );
      table.appendChild(controller);
    } else if (result.status === 401) {
      renderLoginPage();
    }
  } catch (e) {
    console.error('\x1b[35m', 'e = ', e, '\x1b[0m');
  }
}

async function getFeeActiveList() {
  const authorization = localStorage.getItem('authorization');

  try {
    const result = await axios.get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/fee/active/list`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      },
    );

    if (result.status === 200) {
      const select = document.getElementById('product');
      const data = result.data.body;

      result.data.body.map((d) => {
        select.add(
          new Option(`${d.name} ${d.salesValue || d.amountValue}元`, d.id),
        );
      });
    } else if (result.status === 401) {
      renderLoginPage();
    }
  } catch (e) {
    console.error('\x1b[35m', 'e = ', e, '\x1b[0m');
  }
}
