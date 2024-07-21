async function renderNavigation() {
  document.getElementById('navigation').innerHTML = ` 
                    <li><a href="about.html">About</a></li>
                    <li><a href="environment.html">environment</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="buy.html">BUY</a></li>
                    <li><a href="login.html" data-toggle="modal" data-target="#login">Login</a></li>
                    `;

  document.getElementById('loginFrame').innerHTML = await `
        <div id='fb-root'></div>
        <!-- Login -->
        <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color:#302429 ;border-bottom:0px">
                        <h5 class="modal-title" id="loginLabel">LOGIN</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="background-color:#302429">
                        <div class="col-12 col-md-10 mx-auto my-auto">
                            <div class="card auth-card" style="background-color:#302429 ">


                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="loginemail" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="loginpassword" placeholder="Password">

                                    </div>
                                </form>
                                <div class="position-relative image-side ">
                                    <p class="white mb-0">
                                        Please use your credentials to login.
                                        <br>If you are not a member, please
                                        <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#register" style="color:yellow">register</a>.
                                    </p>
                                </div>
                            </div>
                            <h6 class="columns" style="text-align: center;margin: 20px 0px">Or use the thirdpart to Login</h6>
                            <button type="button" class="btn small-7 medium-7 columns" onclick="fb_login()"><img src="assets/images/icons/facebook-01.png" class="small-16 columns"></button>
                            <button type="button" id='googleSignIn' class="btn small-7 medium-7 columns"><img  src="assets/images/icons/google-01.png" class="small-16 columns"></button>
                            
                        </div>
                    </div>


                    <div class="modal-footer" style="background-color:#302429;border-top:0px ">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outlinesuccess" onclick="userlogin()" style="background-color: #C5DB3B;">LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- register -->
        <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="background-color:#302429 ;border-bottom:0px">
                        <h5 class="modal-title" id="registerLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="background-color:#302429">
                        <div class="col-12 col-md-10 mx-auto my-auto">
                            <div class="card auth-card" style="background-color:#302429 ">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="registeremail" aria-describedby="emailHelp" placeholder="Enter email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="registerpassword" placeholder="Password">
                                        <p>Storm collects and uses personal data in accordance with our <a href="terms-and-privacy.html" style="color:yellow">Privacy Policy</a> By creating an account, you agree to our
                                            <a href="terms-and-privacy.html" style="color:yellow">Terms and use</a>.
                                        </p>
                                    </div>
                                </form>
                                
                                <div class="position-relative image-side ">
                                    <p class="white mb-0">
                                        Please use this form to register.
                                        <br>If you are a member, please
                                        <a href="#" data-toggle="modal" data-dismiss="modal" data-target="#login" style="color:yellow">login</a>.
                                    </p>
                                </div>
                            </div><h6 class="columns" style="text-align: center;margin: 20px 0px">Or use the thirdpart to Register</h6>
                            <button type="button" class="btn small-7 medium-7 columns" onclick="fb_login()"><img src="assets/images/icons/facebook-01.png" class="small-16 columns"></button>
                            <button type="button" id='googleSignUp' class="btn small-7 medium-7 columns"><img  src="assets/images/icons/google-01.png" class="small-16 columns"></button>
                        </div>
                    </div>
                    <div class="modal-footer" style="background-color:#302429;border-top:0px ">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outlinesuccess" onclick="userregister()" style="background-color: #C5DB3B;">Register</button>
                    </div>
                </div>
            </div>
        </div>
        `;
}

function fb_login() {
  FB.login(function (response) {
    userFblogin(
      response.authResponse.userID,
      response.authResponse.accessToken,
    );
  });
}

function checkLoginState() {
  FB.getLoginStatus(async function (response) {
    userFblogin(
      response.authResponse.userID,
      response.authResponse.accessToken,
    );
  });
}

function onLoadGoogleCallback() {
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id:
        '862033689785-mib6repc88cv7c9oiakmv3v4po39ujo2.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile',
    });

    auth2.attachClickHandler(
      element,
      {},
      function (googleUser) {
        console.log('Signed in: ' + googleUser.getBasicProfile().getName());
        onSignIn(googleUser);
      },
      function (error) {
        console.log('Sign-in error', error);
      },
    );

    auth2.attachClickHandler(
      element2,
      {},
      function (googleUser) {
        console.log('Signed in: ' + googleUser.getBasicProfile().getName());
        onSignIn(googleUser);
      },
      function (error) {
        console.log('Sign-in error', error);
      },
    );
  });

  element = document.getElementById('googleSignIn');
  element2 = document.getElementById('googleSignUp');
}
async function onSignIn(googleUser) {
  try {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = await googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);

    await userGoogleLogin(profile.getId(), id_token, {
      email: profile.getEmail(),
      nickname: profile.getName(),
    });
  } catch (e) {
    onGoogleSignOut();
  }
}
function onGoogleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
window.fbAsyncInit = function () {
  FB.init({
    appId: '696925720898300',
    cookie: true,
    xfbml: true,
    version: 'v8.0',
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

(async function () {
  await renderNavigation();
  var e = document.createElement('script');
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  e.async = true;
  document.getElementById('fb-root').appendChild(e);
})();
