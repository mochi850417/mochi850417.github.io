/**
 *
 *
 * 此前端網頁 code 可被 修正,訂正,更改 且不負任何追究責任
 *
 */

let size = 50;
let total = 0;
let nowpages = 1;
let from_date = null;
let to_date = null;
let userDataId = null;
let platformSettingResult = {
  行銷帳號管理: '',
  群體帳戶貼文管理: '',
  社團與粉絲團管理: '',
  FB開關: '',
  Message開關: '',
  FB留言: '',
  用戶功能管理: '',
};
const userControl = document.getElementById('mainUserControl');
const userDetail = document.getElementById('mainUserDetail');
const authorizationCenterPlatformId = 2;
const SR_PlatformSetting = {
  好友名單加好友: 1,
  同意交友邀請: 2,
  加入臉書推薦好友: 3,
  添加粉專好友: 4,
  新增關係鏈指定名稱好友: 5,
  加入多社團: 6,
  新增指定社團好友: 7,
  指定或大量刪除好友: 8,
  群體帳戶同步貼文: 12,
  行銷動態分享貼文: 13,
  行銷貼文群發社團: 14,
  粉絲團追蹤: 15,
  邀請朋友加入粉絲團: 17,
  粉絲團直播操作: 18,
  社團直播操作: 20,
  大量邀請好友入社團: 21,
  行銷任務查核: 22,
  FB開關: 23,
  Messager開關: 24,
  Po文設定: 25,
  帳號管理: 26,
  暫存清理: 27,
  應用元件安裝: 28,
  Proxy設定: 29,
  模擬器監看: 30,
  模擬器同步操作: 31,
  WIFI開關: 32,
  語系設定: 33,
  手機設定: 34,
  提升帳號在線互動_按讚: 35,
  提升帳號在線互動_留言: 36,
  提升帳號在線互動_分享: 37,
  粉絲團PO文操作_按讚: 38,
  粉絲團PO文操作_留言: 39,
  粉絲團PO文操作_分享: 40,
  粉絲團PO文操作_表情: 41,
  社團發文操作_按讚: 42,
  社團發文操作_留言: 43,
  社團發文操作_分享: 44,
  社團發文操作_表情: 45,
  提升關係鏈強度_按讚: 46,
  提升關係鏈強度_留言: 47,
  提升關係鏈強度_分享: 48,
  滲透特定對象互動_按讚: 49,
  滲透特定對象互動_留言: 50,
  滲透特定對象互動_分享: 51,
};

const modalHeader = document.getElementById('modal-header');
const modalBody = document.getElementById('modal-body');
let userFeePlatformSelectedValue;

initEnvironment();
async function initEnvironment() {
  await adminUserControl();
}

async function putUserPlatformSetting(userId, platformSettingId) {
  const authorization = localStorage.getItem('authorization');
  if (document.getElementById(`platformSetting${platformSettingId}`).checked) {
    await axios.post(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}/platform/setting`,
      {
        platformSettingId,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    );
  } else {
    await axios.delete(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/platform/${authorizationCenterPlatformId}/setting`,
      {
        platformSettingId,
      },
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
      },
    );
  }
}

async function platformSetting(userId) {
  const authorization = localStorage.getItem('authorization');
  const result = await axios.get(
    `${serverHead}://${serverHost}:${serverPort}/api/v1/platform/${authorizationCenterPlatformId}/setting`,
    {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    },
  );

  if (result.status === 200) {
    await Promise.all(
      result.data.body.map((d) => {
        switch (d.id) {
          case SR_PlatformSetting.好友名單加好友:
          case SR_PlatformSetting.同意交友邀請:
          case SR_PlatformSetting.加入臉書推薦好友:
          case SR_PlatformSetting.添加粉專好友:
          case SR_PlatformSetting.新增關係鏈指定名稱好友:
          case SR_PlatformSetting.加入多社團:
          case SR_PlatformSetting.新增指定社團好友:
          case SR_PlatformSetting.指定或大量刪除好友:
          case SR_PlatformSetting.群體帳戶同步貼文:
          case SR_PlatformSetting.提升帳號在線互動_按讚:
          case SR_PlatformSetting.提升帳號在線互動_留言:
          case SR_PlatformSetting.提升帳號在線互動_分享:
          case SR_PlatformSetting.提升關係鏈強度_按讚:
          case SR_PlatformSetting.提升關係鏈強度_留言:
          case SR_PlatformSetting.提升關係鏈強度_分享:
          case SR_PlatformSetting.滲透特定對象互動_按讚:
          case SR_PlatformSetting.滲透特定對象互動_留言:
          case SR_PlatformSetting.滲透特定對象互動_分享:
            platformSettingResult.行銷帳號管理 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                  `;
            break;

          case SR_PlatformSetting.群體帳戶同步貼文:
          case SR_PlatformSetting.行銷動態分享貼文:
          case SR_PlatformSetting.行銷貼文群發社團:
            platformSettingResult.群體帳戶貼文管理 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.粉絲團追蹤:
          case SR_PlatformSetting.邀請朋友加入粉絲團:
          case SR_PlatformSetting.粉絲團直播操作:
          case SR_PlatformSetting.社團直播操作:
          case SR_PlatformSetting.大量邀請好友入社團:
          case SR_PlatformSetting.行銷任務查核:
          case SR_PlatformSetting.粉絲團PO文操作_按讚:
          case SR_PlatformSetting.粉絲團PO文操作_留言:
          case SR_PlatformSetting.粉絲團PO文操作_分享:
          case SR_PlatformSetting.粉絲團PO文操作_表情:
          case SR_PlatformSetting.社團發文操作_按讚:
          case SR_PlatformSetting.社團發文操作_留言:
          case SR_PlatformSetting.社團發文操作_分享:
          case SR_PlatformSetting.社團發文操作_表情:
            platformSettingResult.社團與粉絲團管理 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.行銷任務查核:
            platformSettingResult.行銷任務查核 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.FB開關:
            platformSettingResult.FB開關 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.Messager開關:
            platformSettingResult.Message開關 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.Po文設定:
            platformSettingResult.FB留言 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
          case SR_PlatformSetting.帳號管理:
          case SR_PlatformSetting.暫存清理:
          case SR_PlatformSetting.應用元件安裝:
          case SR_PlatformSetting.Proxy設定:
          case SR_PlatformSetting.模擬器監看:
          case SR_PlatformSetting.模擬器同步操作:
          case SR_PlatformSetting.WIFI開關:
          case SR_PlatformSetting.語系設定:
          case SR_PlatformSetting.手機設定:
            platformSettingResult.用戶功能管理 += `              <br>
                                                    <input type="checkbox" id="platformSetting${d.id}" onclick="putUserPlatformSetting(${userId},${d.id})">
                                                        <label for="message-text" class="col-form-label"> ${d.name} </label>
                                                    
                                                  `;
            break;
        }
      }),
    );
  }
}

function adminUserControl(pages = 1) {
  nowpages = pages;
  document.getElementById('userlist').innerHTML = '';
  const authorization = localStorage.getItem('authorization');

  axios
    .get(`${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/list`, {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
      params: {
        page: pages,
        size,
        order: 'id',
        sort: 'ASC',
        search: document.getElementById('searchbar').value,
      },
    })
    .then(async (response) => {
      if (response.status === 200) {
        let data = response.data;

        if (data.body.length) {
          total = data.total;
          await userlistControl();
          document.getElementById(`page${pages}`).className += ' active';
        }

        await Promise.all(
          data.body.map(async (d) => {
            document.getElementById('userlist').innerHTML += `
              <div class="card d-flex flex-row mb-3">
              <div class="d-flex flex-grow-1 min-width-zero">
              <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
              <p class="mb-0 text-muted text-small w-10 w-xs-100">${d.id}</p>
              <p class="list-item-heading mb-0 truncate w-20 w-xs-100">${
                d.nickname
              }</p>
              <p class="mb-0 text-muted text-small w-30 w-xs-100">${d.uuid}</p>
              <p class="mb-0 text-muted text-small w-25 w-xs-100">${
                d.userEmail
              }</p>
              <p class="mb-0 text-muted text-small w-15 w-xs-100">${
                d.userType
              }</p>
              <p class="mb-0 text-muted text-small w-20 w-xs-100">${
                d.region
              }</p>
              <div class="w-10 w-xs-100"><button type="button" class="btn btn-outline-primary mb-2" data-toggle="modal" data-target="#ModalContent" onclick="getUserInfo(${
                d.id
              })">${i18n('details')}</button></div>
              </div></div></div>`;
          }),
        );
      }
    });
}

// async function getAuthorizationCenter(
//   userId,
//   platformId = authorizationCenterPlatformId,
// ) {
//   document.getElementById('datepickerwrap').style.cssText = 'display: none;';
//   await cleanModalPanel();
//   await platformSetting(userId);

//   const authorization = localStorage.getItem('authorization');
//   let result;
//   try {
//     result = await axios.get(
//       `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}/platform/${platformId}/setting`,
//       {
//         headers: {
//           Authorization: `Bearer ${authorization} `,
//         },
//       },
//     );
//   } catch (e) {
//     modalHeader.innerHTML = `<b>${e.response.status}</b>`;
//     modalBody.innerHTML = e.response.data.body;
//   }

//   if (result.status === 200) {
//     modalHeader.innerHTML = `
//       <h5 class="modal-title" id="allPlatformData">User: ${userId}   Authorization Center</h5>
//     `;

//     await Promise.all(
//       Object.keys(platformSettingResult).map((platformSetting) => {
//         modalBody.innerHTML += `<b>${platformSetting}</b>`;
//         modalBody.innerHTML += `${platformSettingResult[platformSetting]}<br><br>`;
//       }),
//     );

//     await Promise.all(
//       result.data.body.map((userPlatformSetting) => {
//         $(
//           `input[id=platformSetting${userPlatformSetting.platformSettingId}]`,
//         ).attr('checked', true);
//       }),
//     );
//   }
// }

let allPlatformDetailRender = '';
let selectedSGDetailRender = '';
let selectedSRDetailRender = '';
let platformSelectedValue = '';
const buyDevicesDetails = {
  id: '',
  userFeeDate: '',
  uuid: '',
  createdAt: '',
};

async function changePage() {
  if (
    platformSelectedValue === 'allPlatformDataPage' ||
    platformSelectedValue === 'SGPage' ||
    platformSelectedValue === 'SRPage'
  ) {
    $('#fromDate').val('').datepicker('update');
    $('#toDate').val('').datepicker('update');
  }
}

async function drawUserFeePlatformSelected(userId) {
  const authorization = localStorage.getItem('authorization');
  platformSelectedValue = document.getElementById('platformSelectedList').value;
  const getHtmlId = document.getElementById('productlistDetails');
  if (platformSelectedValue === 'allPlatformDataPage') {
    const allPlatformDetails = await axios.get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}/feeList`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          order: 'id',
          sort: 'ASC',
          startDate: from_date,
          endDate: to_date,
        },
      },
    );

    let allPlatformDetailsObj = allPlatformDetails.data.body;
    allPlatformDetailsObj.forEach((e) => {
      let insertHtml = ``;
      e.cloudPhones.forEach((d) => {
        insertHtml += `
          <div class="content">
            <label for="message-text" class="col-form-label"><p data-localize="title">${i18n(
              'uuid',
            )} </p></label>&emsp;${d.uuid}<br>
            <label for="message-text" class="col-form-label" data-localize="allPlatformDetail.createdAt">${i18n(
              'created_at',
            )} </label>&emsp;${d.createdAt}
          </div>`;
      });
      allPlatformDetailRender += `<div class="underline"></div><br><div><form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">${i18n(
                  'sn',
                )} </label>&emsp;${e.id}
            </div>
            <div class="contentBox">
              <div class="form-group">
                  <label for="message-text" class="col-form-label">${i18n(
                    'fee_mame',
                  )} </label>&emsp;${e.feeName}
              </div>
              ${insertHtml}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'created_at',
                )} </label>&emsp;${e.createdAt}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'expiration',
                )} </label>&emsp;${e.date}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'amount',
                )} </label>&emsp;${e.amountValue}
            </div>
          </form>
          </div>`;
    });
    if (!allPlatformDetailRender.length) {
      allPlatformDetailRender += `<div class="underline"></div><br><div>無購買紀錄</div>`;
    }
    getHtmlId.innerHTML = allPlatformDetailRender;

    cleanPlatformDetail();
    cleanDate();
  } else if (platformSelectedValue === 'SGPage') {
    await cleanPlatformDetail();
    let platformId = 1;
    const selectedPlatformDetail = await axios.get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}/platform/${platformId}/feeList`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          order: 'id',
          sort: 'ASC',
          startDate: from_date,
          endDate: to_date,
        },
      },
    );
    const selectedSGDetailsObj = selectedPlatformDetail.data.body;
    if (selectedSGDetailsObj.length) {
      selectedSGDetailsObj.forEach((e) => {
        let insertHtml = ``;
        e.cloudPhones.forEach((d) => {
          insertHtml += `
           <div class="content">
            <label for="message-text" class="col-form-label"><p data-localize="title">${i18n(
              'uuid',
            )} </p></label>&emsp;${d.uuid}<br>
            <label for="message-text" class="col-form-label" data-localize="allPlatformDetail.createdAt">${i18n(
              'created_at',
            )} </label>&emsp;${d.createdAt}
          </div>`;
        });
        selectedSGDetailRender += `<div class="underline"></div><br><div><form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">${i18n(
                  'sn',
                )} </label>&emsp;${e.id}
            </div>
            <div class="contentBox">
              <div class="form-group">
                  <label for="message-text" class="col-form-label">${i18n(
                    'fee_mame',
                  )} </label>&emsp;${e.feeName}
              </div>
              ${insertHtml}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'created_at',
                )} </label>&emsp;${e.createdAt}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'expiration',
                )} </label>&emsp;${e.date}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'amount',
                )} </label>&emsp;${e.amountValue}
            </div>
          </form>
          </div>`;
      });
    } else {
      selectedSGDetailRender += `<div class="underline"></div><br><div>無購買紀錄</div>`;
    }
    getHtmlId.innerHTML = selectedSGDetailRender;
    cleanDate();
  } else if (platformSelectedValue === 'SRPage') {
    await cleanPlatformDetail();
    platformId = 2;
    const selectedPlatformDetail2 = await axios.get(
      `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}/platform/${platformId}/feeList`,
      {
        headers: {
          Authorization: `Bearer ${authorization} `,
        },
        params: {
          order: 'id',
          sort: 'ASC',
          startDate: from_date,
          endDate: to_date,
        },
      },
    );

    const selectedSRDetailsObj = selectedPlatformDetail2.data.body;
    if (selectedSRDetailsObj.length) {
      selectedSRDetailsObj.forEach((e) => {
        let insertHtml = ``;
        e.cloudPhones.forEach((d) => {
          insertHtml += `
           <div class="content">
            <label for="message-text" class="col-form-label"><p data-localize="title">${i18n(
              'uuid',
            )} </p></label>&emsp;${d.uuid}<br>
            <label for="message-text" class="col-form-label" data-localize="allPlatformDetail.createdAt">${i18n(
              'created_at',
            )} </label>&emsp;${d.createdAt}
          </div>`;
        });
        selectedSRDetailRender += `<div class="underline"></div><br><div><form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">${i18n(
                  'sn',
                )} </label>&emsp;${e.id}
            </div>
            <div class="contentBox">
              <div class="form-group">
                  <label for="message-text" class="col-form-label">${i18n(
                    'fee_mame',
                  )} </label>&emsp;${e.feeName}
              </div>
              ${insertHtml}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'created_at',
                )} </label>&emsp;${e.createdAt}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'expiration',
                )} </label>&emsp;${e.date}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'amount',
                )} </label>&emsp;${e.amountValue}
            </div>
          </form>
          </div>`;
      });
    } else {
      selectedSRDetailRender += `<div class="underline"></div><br><div>無購買紀錄</div>`;
    }
    getHtmlId.innerHTML = selectedSRDetailRender;

    cleanDate();
  }
  const accordion = document.getElementsByClassName('contentBox');
  for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
      this.classList.toggle('active');
    });
  }
}

async function getUserInfo(userId) {
  userDataId = userId;
  $('#fromDate').val('').datepicker('update');
  $('#toDate').val('').datepicker('update');
  await cleanModalPanel();
  document.getElementById('datepickerwrap').style.cssText = 'display: none;';
  const authorization = localStorage.getItem('authorization');
  const userInfoResult = await axios.get(
    `${serverHead}://${serverHost}:${serverPort}/api/v1/admin/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    },
  );

  const platform = await axios.get(
    `${serverHead}://${serverHost}:${serverPort}/api/v1/platform/list`,
    {
      headers: {
        Authorization: `Bearer ${authorization} `,
      },
    },
  );

  if (userInfoResult.status === 200) {
    modalHeader.innerHTML = `
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="home-tab ModalContentLabel" data-toggle="tab" href="#ModalContentLabel" role="tab" aria-controls="ModalContentLabel" aria-selected="true" onclick="hideDatePicker()">${i18n(
            'user_info',
          )}</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="profile-tab ProductList" data-toggle="tab" href="#ProductList" role="tab" aria-controls="ProductList" aria-selected="false" onclick="showDatePicker()">${i18n(
            'product_list',
          )}</a>
        </li>
      </ul>
    `;
    modalBody.innerHTML = `
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="ModalContentLabel" role="tabpanel" aria-labelledby="ModalContentLabel-tab">
          <form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">${i18n(
                  'id_detail',
                )} </label>&emsp;${userInfoResult.data.body.id}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'nickname',
                )} </label>&emsp;${userInfoResult.data.body.nickname}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'phone_country_code',
                )} </label>&emsp;${userInfoResult.data.body.phoneCountryCode}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'phone_number',
                )} </label>&emsp;${userInfoResult.data.body.phoneNumber}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'region_detail',
                )} </label>&emsp;${userInfoResult.data.body.region}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'email_detail',
                )} </label>&emsp;${userInfoResult.data.body.userEmail}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'suspension',
                )} </label>&emsp;${userInfoResult.data.body.userIsSuspension}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'level',
                )} </label>&emsp;${userInfoResult.data.body.userLevel}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'loginType',
                )} </label>&emsp;${userInfoResult.data.body.userLoginType}
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">${i18n(
                  'uuid',
                )} </label>&emsp;${userInfoResult.data.body.uuid}
            </div>
            ${await Promise.all(
              userInfoResult.data.body.userPlatforms.map((platform) => {
                return `
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">${i18n(
                              'platformId',
                            )}  &emsp;${platform.platformId} </label><br>
                            <label for="message-text" class="col-form-label">${i18n(
                              'status',
                            )}  &emsp;${platform.status} </label>
                        </div>
                      `;
              }),
            )}
          </form>
        </div>
        <div class="tab-pane fade" id="ProductList" role="tabpanel" aria-labelledby="ProductList-tab">
          <select id="platformSelectedList" class="custom-select" onchange="drawUserFeePlatformSelected(${userId}), changePage()">
            <option selected value="allPlatformDataPage">ALL</option>
            <option value="SGPage">${platform.data.body[0].name}</option>
            <option value="SRPage">${platform.data.body[1].name}</option>
          </select>
          
          <div id="productlistDetails"></div>
        </div>
      </div>
      `;
    drawUserFeePlatformSelected(userDataId);
  }
}

async function cleanModalPanel() {
  modalHeader.innerHTML = ``;
  modalBody.innerHTML = ``;
  allPlatformDetailRender = '';

  platformSettingResult = {
    行銷帳號管理: '',
    群體帳戶貼文管理: '',
    社團與粉絲團管理: '',
    FB開關: '',
    Message開關: '',
    FB留言: '',
    用戶功能管理: '',
  };
}

async function cleanPlatformDetail() {
  allPlatformDetailRender = '';
  selectedSGDetailRender = '';
  selectedSRDetailRender = '';
}

async function cleanDate() {
  from_date = null;
  to_date = null;
}
function userlistControl() {
  const page = Math.ceil(total / size);

  document.getElementById(
    'userlistControl',
  ).innerHTML = `<ul class="pagination justify-content-center align-item-center mb-0">
                            <li class="page-item ">
                                <a class="page-link first" href="#" id="first" onclick="adminUserControl(1)">
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
                                <a class="page-link last" href="#" id="last" onclick="adminUserControl(${page})">
                                    <i class="simple-icon-control-end"></i>
                                </a>
                            </li>
                        </ul>`;
}

function pageCount(count = 5) {
  let string = '';
  for (let i = 1; i <= count; i++) {
    string += `<li class="page-item" id="page${i}">
                                <a class="page-link" href="#" onclick="adminUserControl(${i})">${i}</a>
                            </li>`;
  }
  return string;
}

function next() {
  nowpages += 1;
  if (total && nowpages > Math.ceil(total / size)) {
    nowpages = Math.ceil(total / size);
  }
  adminUserControl(nowpages);
}

function prev() {
  nowpages -= 1;
  if (nowpages < 1) {
    nowpages = 1;
  }
  adminUserControl(nowpages);
}

function hideDatePicker() {
  document.getElementById('datepickerwrap').style.cssText = 'display: none;';
}
function showDatePicker() {
  document.getElementById('datepickerwrap').style.cssText = 'display: flex;';
}
$('.datepicker').datepicker('option', 'dateFormat', 'yy-mm-dd ');
$('#fromDate').datepicker();
$('#toDate').datepicker();
$('#sendDate').click(function () {
  from_date = $('#fromDate').val() + ' 00:00:00';
  to_date = $('#toDate').val() + ' 23:59:59';
  if (from_date === ' 00:00:00' && to_date === ' 23:59:59') {
    from_date = null;
    to_date = null;
    drawUserFeePlatformSelected(userDataId);
  } else {
    drawUserFeePlatformSelected(userDataId);
  }
});
$('#cleanDate').click(function () {
  $('#fromDate').val('').datepicker('update');
  $('#toDate').val('').datepicker('update');
  drawUserFeePlatformSelected(userDataId);
});
function UControl() {
  const css = document.getElementById('fakecss');
  const c = css.sheet;
  userControl.style.display = 'block';
  userDetail.style.display = 'none';
  if (c.cssRules.length !== 0) {
    c.deleteRule(0);
  }
}
function UDetail() {
  const css = document.getElementById('fakecss');
  const c = css.sheet;
  c.insertRule('#control#control::after{top: 68%}', 0);
  userControl.style.display = 'none';
  userDetail.style.display = 'block';
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
  adminUserControl(nowpages);
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
    adminUserControl(nowpages);
  }
});
