// $(document).ready(async () => {
//   await TermsOfUse();
// });

window.onload = () => {
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'en_US');
  }
  langColor();
};

const innerhtmlPolicy = document.getElementById('TermsOfUse');
function TermsOfUse() {
  innerhtmlPolicy.innerHTML = '';
  innerhtmlPolicy.innerHTML += `<div class="modal fade" id="termofuse" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">${i18n(
                  'terms_of_use_inner.title',
                )}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <b><p>${i18n('terms_of_use_inner.paragraph1')}</p></b><br>
                <p>${i18n('terms_of_use_inner.subtitle1')}</p>
                <p>${i18n('terms_of_use_inner.paragraph2')}</p>
                <p>${i18n('terms_of_use_inner.paragraph3')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle2')}</p>
                <p>${i18n('terms_of_use_inner.paragraph4')}</p>
                <p>${i18n('terms_of_use_inner.paragraph5')}</p>
                <p>${i18n('terms_of_use_inner.paragraph6')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle3')}</p>
                <p>${i18n('terms_of_use_inner.paragraph7')}</p>
                <p>${i18n('terms_of_use_inner.paragraph8')}</p>
                <p>${i18n('terms_of_use_inner.paragraph9')}</p>
                <p>${i18n('terms_of_use_inner.paragraph10')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle4')}</p>
                <p>${i18n('terms_of_use_inner.paragraph11')}</p>
                <span>${i18n('terms_of_use_inner.paragraph12')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph13')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph14')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph15')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph16')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph17')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph18')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph19')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph20')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph21')}</span><br><br>
                <p>${i18n('terms_of_use_inner.paragraph22')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle5')}</p>
                <p>${i18n('terms_of_use_inner.paragraph23')}<br>
                <span>${i18n('terms_of_use_inner.paragraph24')}</span><br>
                <span>${i18n('terms_of_use_inner.paragraph25')}</span><br></p>
                <p>${i18n('terms_of_use_inner.paragraph26')}</p>
                <p>${i18n('terms_of_use_inner.paragraph27')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle6')}</p>
                <p>${i18n('terms_of_use_inner.paragraph28')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle7')}</p>
                <p>${i18n('terms_of_use_inner.paragraph29')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle8')}</p>
                <p>${i18n('terms_of_use_inner.paragraph30')}<br>
                ${i18n('terms_of_use_inner.paragraph31')}<br>
                ${i18n('terms_of_use_inner.paragraph32')}<br>
                ${i18n('terms_of_use_inner.paragraph33')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle9')}</p>
                <p>${i18n('terms_of_use_inner.paragraph34')}<br>
                ${i18n('terms_of_use_inner.paragraph35')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle10')}</p>
                <p>${i18n('terms_of_use_inner.paragraph36')}<br>
                ${i18n('terms_of_use_inner.paragraph37')}<br>
                ${i18n('terms_of_use_inner.paragraph38')}<br>
                ${i18n('terms_of_use_inner.paragraph39')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle11')}</p>
                <p>${i18n('terms_of_use_inner.paragraph40')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle12')}</p>
                <p>${i18n('terms_of_use_inner.paragraph41')}</p>
                <p>1. <b>${i18n('terms_of_use_inner.bill')}</b> 
                ${i18n('terms_of_use_inner.paragraph42')}<br>
                ${i18n('terms_of_use_inner.paragraph43')}</p>
                <p>2. <b>${i18n('terms_of_use_inner.payment_method')}</b> 
                ${i18n('terms_of_use_inner.paragraph44')}</p>
                <p>3. <b>${i18n(
                  'terms_of_use_inner.current_information_require',
                )}</b> 
                ${i18n('terms_of_use_inner.paragraph45')}</p>
                <p>4. <b>${i18n('terms_of_use_inner.change_in_amount')}</b> 
                ${i18n('terms_of_use_inner.paragraph46')}</p>
                <p>5. <b>${i18n('terms_of_use_inner.reaffirmation_of')}</b> 
                ${i18n('terms_of_use_inner.paragraph47')}</p>
                <p>6. <b>${i18n(
                  'terms_of_use_inner.subscription_service',
                )}</b></p>
                I. <b>${i18n('terms_of_use_inner.good_standing')}</b> 
                ${i18n('terms_of_use_inner.paragraph48')}<br>
                (a) ${i18n('terms_of_use_inner.paragraph49')}<br>
                (b) ${i18n('terms_of_use_inner.paragraph50')}<br>
                (c) ${i18n('terms_of_use_inner.paragraph51')}<br>
                II.	<b>${i18n('terms_of_use_inner.fee_and_payments')}</b> 
                ${i18n('terms_of_use_inner.paragraph52')}<br>
                III. <b>${i18n('terms_of_use_inner.cancellation')}</b> 
                ${i18n('terms_of_use_inner.paragraph53')}<br>
                IV.	<b>${i18n('terms_of_use_inner.refund')}</b> 
                ${i18n('terms_of_use_inner.paragraph54')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle13')}</p>
                <p>${i18n('terms_of_use_inner.paragraph55')}<br>
                ${i18n('terms_of_use_inner.paragraph56')}<br>
                ${i18n('terms_of_use_inner.paragraph57')}<br>
                ${i18n('terms_of_use_inner.paragraph58')}</p><br>
                <p>${i18n('terms_of_use_inner.subtitle14')}</p>
                <p>${i18n('terms_of_use_inner.warranty_disclaimer')}<br>
                ${i18n('terms_of_use_inner.paragraph59')}</p>
                <p>${i18n('terms_of_use_inner.limitation')}<br>
                ${i18n('terms_of_use_inner.paragraph60')}<br>
                (A)	${i18n('terms_of_use_inner.paragraph61')}<br>
                (B)	${i18n('terms_of_use_inner.paragraph62')}<br>
                (C)	${i18n('terms_of_use_inner.paragraph63')}</p>
                <p><b>${i18n('terms_of_use_inner.indemnity')}</b>
                ${i18n('terms_of_use_inner.paragraph64')}<br>
                (a) ${i18n('terms_of_use_inner.paragraph65')}<br>
                (b) ${i18n('terms_of_use_inner.paragraph66')}</p>
                <p>${i18n('terms_of_use_inner.assignment')}<br>
                <b>${i18n('terms_of_use_inner.transfer')}</b>
                ${i18n('terms_of_use_inner.paragraph67')}</p>
                <p>${i18n('terms_of_use_inner.choice_of_law')}<br>
                ${i18n('terms_of_use_inner.paragraph68')}
                 ${i18n('terms_of_use_inner.paragraph69')}<br></p>
                <p>${i18n('terms_of_use_inner.miscellaneous')}<br>
                ${i18n('terms_of_use_inner.paragraph70')}<br>
                ${i18n('terms_of_use_inner.paragraph71')}<br>
                ${i18n('terms_of_use_inner.paragraph72')}<br></p>
            </div>
        </div>
    </div>
</div>`;
}
function privacyPolicy() {
  innerhtmlPolicy.innerHTML = '';
  innerhtmlPolicy.innerHTML += `<div class="modal fade" id="privacypolicy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">${i18n(
                  'privacy_inner.title',
                )}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <b>${i18n('privacy_inner.privacy_policy')}</b><br>
                <p>${i18n('privacy_inner.paragraph1')}
                <b>${i18n('privacy_inner.paragraph2')}</b><br>
                ${i18n('privacy_inner.paragraph3')}</p><br>
                <p>${i18n('privacy_inner.subtitle1')}</p>
                <p>${i18n('privacy_inner.paragraph4')}<br>
                ${i18n('privacy_inner.paragraph5')}</p><br>
                <p>${i18n('privacy_inner.subtitle2')}</p>
                <p>${i18n('privacy_inner.paragraph6')}</p><br>
                <p>${i18n('privacy_inner.subtitle3')}</p>
                <p><b>${i18n('privacy_inner.information_you')}</b><br>
                ${i18n('privacy_inner.paragraph7')}<br>
                ${i18n('privacy_inner.paragraph8')}</p>
                <p><b>${i18n('privacy_inner.information_collected')}</b><br>
                 ${i18n('privacy_inner.paragraph9')}<br>
                1.	${i18n('privacy_inner.paragraph10')}<br>
                2.	${i18n('privacy_inner.paragraph11')}<br>
                <b>${i18n('privacy_inner.paragraph12')}</b><br>
                • ${i18n('privacy_inner.paragraph13')}<br>
                • ${i18n('privacy_inner.paragraph14')}<br>
                • ${i18n('privacy_inner.paragraph15')}<br>
                • ${i18n('privacy_inner.paragraph16')}<br>
                • ${i18n('privacy_inner.paragraph17')}<br>
                <b>${i18n('privacy_inner.paragraph18')}</b><br>
                • ${i18n('privacy_inner.paragraph19')}<br>
                • ${i18n('privacy_inner.paragraph20')}<br>
                • ${i18n('privacy_inner.paragraph21')}</p>
                <p><b>Cookies: </b><br>
                ${i18n('privacy_inner.paragraph22')}<br>
                ${i18n('privacy_inner.paragraph23')}<br>
                • ${i18n('privacy_inner.paragraph24')}<br>
                • ${i18n('privacy_inner.paragraph25')}<br>
                • ${i18n('privacy_inner.paragraph26')}<br>
                ${i18n('privacy_inner.paragraph27')}<br>
                1.	${i18n('privacy_inner.paragraph28')}<br>
                2.	${i18n('privacy_inner.paragraph29')}</p>
                <p><b>${i18n('privacy_inner.paragraph30')}</b><br>
                ${i18n('privacy_inner.paragraph31')}</p> <br>
                <p>${i18n('privacy_inner.subtitle4')}</p>
                <p>${i18n('privacy_inner.paragraph32')}</p>
                <p><b>${i18n('privacy_inner.information_that')}</b>
                ${i18n('privacy_inner.paragraph33')}<br>
                ${i18n('privacy_inner.paragraph34')}</p>
                <p><b>${i18n('privacy_inner.advertisers')}</b> 
                ${i18n('privacy_inner.paragraph35')}</p>
                <p><b>${i18n('privacy_inner.affiliated_businesses')}</b> 
                ${i18n('privacy_inner.paragraph36')}</p>
                <p><b>${i18n('privacy_inner.agents')}</b> 
                ${i18n('privacy_inner.paragraph37')}</p>
                <p><b>${i18n('privacy_inner.user_profiles')}</b> 
                ${i18n('privacy_inner.paragraph38')}<br>
                <p><b>${i18n('privacy_inner.business_transfers')}</b> 
                ${i18n('privacy_inner.paragraph39')}</p>
                <p><b>${i18n('privacy_inner.protection_of')}</b> 
                ${i18n('privacy_inner.paragraph40')}<br>
                ${i18n('privacy_inner.protection_a')}<br>
                ${i18n('privacy_inner.protection_b')}<br>
                ${i18n('privacy_inner.protection_c')}<br>
                ${i18n('privacy_inner.protection_d')}<br>
                <p>${i18n('privacy_inner.subtitle5')}</p>
                <p>${i18n('privacy_inner.paragraph41')}<br>
                ${i18n('privacy_inner.paragraph42')}<br></p>
                <br><p>${i18n('privacy_inner.subtitle6')}</p>
                <p>${i18n('privacy_inner.paragraph43')}<br>
                ${i18n('privacy_inner.nickname')}<br>
                ${i18n('privacy_inner.phone_number')}<br>
                ${i18n('privacy_inner.email_address')}<br>
                ${i18n('privacy_inner.paragraph44')}</p><br>
                <p>${i18n('privacy_inner.subtitle7')}</p>
                <p>${i18n('privacy_inner.paragraph45')}<br>
                ${i18n('privacy_inner.paragraph46')}</p><br>
               <p>${i18n('privacy_inner.subtitle8')}</p>
                <p>${i18n('privacy_inner.paragraph47')}</p>
            </div>
        </div>
    </div>
</div>`;
  console.log(innerhtmlPolicy);
}
function cookiePolicy() {
  innerhtmlPolicy.innerHTML = '';
  innerhtmlPolicy.innerHTML = `<div class="modal fade" id="cookiepolicy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">${i18n(
                  'cookie_inner.title',
                )}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <b><p>${i18n('cookie_inner.paragraph1')}</p></b>
                <br><p>${i18n('cookie_inner.subtitle1')}</p>
                <p>${i18n('cookie_inner.paragraph2')}<br>
                ${i18n('cookie_inner.paragraph3')}<br>
                ${i18n('cookie_inner.paragraph4')}</p><br>
                <p>${i18n('cookie_inner.subtitle2')}</p>
                <p>${i18n('cookie_inner.paragraph5')}<br>
                <img src="assets/images/cookie.jpg">
                </p>
                <br><p>${i18n('cookie_inner.subtitle3')}</p>
                <p>${i18n('cookie_inner.paragraph6')}</p>
                <br><p>${i18n('cookie_inner.subtitle4')}</p>
                <p>${i18n('cookie_inner.paragraph7')}</p>
                <br><p>${i18n('cookie_inner.subtitle5')}</p>
                <p>${i18n('cookie_inner.paragraph8')}</p>
                <br><p>${i18n('cookie_inner.subtitle6')}</p>
                <p>${i18n('cookie_inner.paragraph9')}</p>
                <br><p>${i18n('cookie_inner.subtitle7')}</p>
                <p>${i18n('cookie_inner.paragraph10')}</p>
                <br><p>${i18n('cookie_inner.subtitle8')}</p>
                <p>${i18n('cookie_inner.paragraph11')}</p>
                <br><p>${i18n('cookie_inner.subtitle9')}</p>
                <p>${i18n('cookie_inner.paragraph12')}<br>
                ${i18n('cookie_inner.paragraph13')}<br>
                ${i18n('cookie_inner.paragraph14')}</p>
            </div>
        </div>
    </div>
</div>`;
}

document.getElementById('us').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'en_US') {
    localStorage.setItem('language', 'en_US');
  }
  getDataI18n();
  langColor();
});
document.getElementById('tw').addEventListener('click', function () {
  if (localStorage.getItem('language') !== 'zh_TW') {
    localStorage.setItem('language', 'zh_TW');
    getDataI18n();
    langColor();
  }
});

function langColor() {
  if (localStorage.getItem('language') === 'en_US') {
    document.querySelector('#us p').classList.add('langOn');
    document.querySelector('#tw p').classList.remove('langOn');
    loginClearAlert();
  } else {
    document.querySelector('#tw p').classList.add('langOn');
    document.querySelector('#us p').classList.remove('langOn');
    loginClearAlert();
  }
}

//Login, Sign up and Forget Password page clean alert when changing language
function loginClearAlert() {
  if (document.getElementsByClassName('thirdParty').length) {
    document.getElementById('loginemail').style.border = '';
    document.getElementById('loginemail').style.borderRadius = '';
    document.getElementById('emailMsg').innerHTML = ``;
    document.getElementById('loginpassword').style.border = '';
    document.getElementById('loginpassword').style.borderRadius = '';
    document.getElementById('passwordMsg').innerHTML = ``;
  }
  if (document.getElementsByClassName('sign_up').length) {
    document.getElementById('registerEmail').style.border = '';
    document.getElementById('registerEmail').style.borderRadius = '';
    document.getElementById('alertMsgEM').innerHTML = ``;
    document.getElementById('registerPassword').style.border = '';
    document.getElementById('registerPassword').style.borderRadius = '';
    document.getElementById('alertMsgPW').innerHTML = ``;
    document.getElementById('checkRegisterPassword').style.border = '';
    document.getElementById('checkRegisterPassword').style.borderRadius = '';
    document.getElementById('alertMsgCPW').innerHTML = ``;
    document.getElementById('firstname').style.border = '';
    document.getElementById('firstname').style.borderRadius = '';
    document.getElementById('alertMsgFN').innerHTML = ``;
    document.getElementById('lastname').style.border = '';
    document.getElementById('lastname').style.borderRadius = '';
    document.getElementById('alertMsgLN').innerHTML = ``;
    document.getElementById('birthDate').style.border = '';
    document.getElementById('birthDate').style.borderRadius = '';
    document.getElementById('alertMsgBD').innerHTML = ``;
  }
  if (document.getElementsByClassName('forget_block').length) {
    document.getElementById('email').style.border = '';
    document.getElementById('email').style.borderRadius = '';
    document.getElementById('forgetEmail').innerHTML = ``;
  }
}
