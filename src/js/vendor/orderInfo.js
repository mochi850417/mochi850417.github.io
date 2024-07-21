$(document).ready(async () => {
  await showOrderInfo();
});

function showOrderInfo() {
  const authorization = localStorage.getItem('authorization');
  const urlParams = new URLSearchParams(window.location.search);

  axios
    //撈資料
    .get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/user/me/fee/${urlParams.get(
        'userFeeId',
      )}`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {},
      },
    )
    .then(async (response) => {
      if (response.status === 200) {
        const data = response.data.body;
        console.log(data);
        document.getElementById('userInfoTable').innerHTML = `<tbody>
                            <tr>
                                <style="vertical-align:middle; border-radius: 3px; padding:30px; background-color: #f9f9f9; border-right: 5px solid white;">
                                    <p
                                        style="color:#303030; font-size: 14px;  line-height: 1.6; margin:0; padding:0;">
                                        End Date <br>
                                        ${moment(data.date).format(
                                          'yyyy-MM-DD hh:mm:ss',
                                        )}
                                    </p>
                                        
                                <td style="text-align: right; padding-top:0px; padding-bottom:0; vertical-align:middle; padding:30px; background-color: #f9f9f9; border-radius: 3px; border-left: 5px solid white;">
                                    <p
                                        style="color:#8f8f8f; font-size: 14px; padding: 0; line-height: 1.6; margin:0; ">
                                        Created Date <br>
                                        ${moment(data.createdAt).format(
                                          'yyyy-MM-DD hh:mm:ss',
                                        )}
                                    </p>
                                </td>
                            </tr>
                        </tbody>`;
        document.getElementById('orderInfoTable').innerHTML = `<thead>
                                                <tr>
                                                    <th
                                                        style="text-align:left; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                        ITEM NAME
                                                    </th>
                                                    <th
                                                        style="text-align:right; font-size: 10px; color:#8f8f8f; padding-bottom: 15px;">
                                                        VALUE
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style="padding-top:0px; padding-bottom:5px;">
                                                        <h4
                                                            style="font-size: 16px; line-height: 1; margin-bottom:0; color:#303030; font-weight:500; margin-top: 10px;">
                                                            ID
                                                        </h4>
                                                    </td>
                                                    <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                                                        <p
                                                            style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                                            ${data.id}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:0px; padding-bottom:5px;">
                                                        <h4
                                                            style="font-size: 16px; line-height: 1; margin-bottom:0; color:#303030; font-weight:500; margin-top: 10px;">
                                                            CloudPhone Count</h4>
                                                    </td>
                                                    <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                                                        <p
                                                            style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                                            ${data.cloudPhoneCount}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:0px; padding-bottom:5px;">
                                                        <h4
                                                            style="font-size: 16px; line-height: 1; margin-bottom:0; color:#303030; font-weight:500; margin-top: 10px;">
                                                            Fee Name</h4>
                                                    </td>
                                                    <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                                                        <p
                                                            style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                                            ${data.feeName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top:0px; padding-bottom:5px;">
                                                        <h4
                                                            style="font-size: 16px; line-height: 1; margin-bottom:0; color:#303030; font-weight:500; margin-top: 10px;">
                                                            TYPE</h4>
                                                    </td>
                                                    <td style="padding-top:0px; padding-bottom:0; text-align: right;">
                                                        <p
                                                            style="font-size: 13px; line-height: 1; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap;">
                                                            ${data.type}</p>
                                                    </td>
                                                </tr>
                                            </tbody>`;
        document.getElementById('totalTable').innerHTML = `<tr>
                            <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="width: 100%">
                                    <p href="#"
                                        style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                        Subtotal : </p>
                                </td>
                                <td style="padding-top:0px; text-align: right;">
                                    <p
                                        style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                        ${data.amountCurrencyCode} $${data.amountValue}</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="width: 100%">
                                    <p href="#"
                                        style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                        Tax : </p>
                                </td>
                                <td style="padding-top:0px; text-align: right;">
                                    <p
                                        style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                        $
                                        0</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="width: 100%">
                                    <p href="#"
                                        style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                        Shipping : </p>
                                </td>
                                <td style="padding-top:0px; text-align: right;">
                                    <p
                                        style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                        $
                                        0</p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style=" width: 100%; padding-bottom:15px;">
                                    <p href="#"
                                        style="font-size: 13px; text-decoration: none; line-height: 1.6; color:#909090; margin-top:0px; margin-bottom:0; text-align: right;">
                                        <strong>Total : </strong></p>
                                </td>
                                <td style="padding-top:0px; text-align: right; padding-bottom:15px;">
                                    <p
                                        style="font-size: 13px; line-height: 1.6; color:#303030; margin-bottom:0; margin-top:0; vertical-align:top; white-space:nowrap; margin-left:15px">
                                        <strong>$
                                            ${data.amountCurrencyCode} $${data.amountValue}</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3" style="border-top:1px solid #f1f0f0">&nbsp;</td>
                            </tr>`;
      }
    })
    .catch((error) => {
      alert(error);
      //  window.location.href = '/html/index.html';
    });
}
