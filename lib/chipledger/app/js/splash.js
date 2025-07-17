document.getElementById("nav").innerHTML = `
    <nav class="navbar fixed-top navbar-expand-lg p-0 bg-primary" id="navbar">
        <div class="container-fluid">
        <span class="navbar-brand text-body-tertiary">
            <a href="/" class="text-white text-decoration-none"><i class="bi bi-bank me-1"></i> Chipledger</a>
        </span>
        <div class="navbar-toggler p-0 border-0">
          <li class="nav-item dropdown" style="list-style: none; display: inline-block;">
              <a class="bg-white btn btn-light p-0 ps-2 pe-2 align-middle" type="button" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list fs-5"></i>
                </a>
                <ul class="dropdown-menu bg-body dropdown-menu-end" id="navdropdown">
                  <li>
                    <a class="dropdown-item text-body p-2 ps-3" data-bs-toggle="modal" data-bs-target="#registermodal" onclick="setPage('register');"><i class="bi bi-person-plus me-1"></i>
                      Register
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item text-body p-2 ps-3" data-bs-toggle="modal" data-bs-target="#loginmodal" onclick="setPage('login');"><i class="bi bi-door-open me-1"></i>
                      Login
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item text-body p-2 ps-3" href="/blog"><i class="bi bi-pencil me-1"></i>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item text-body p-2 ps-3" href="/docs"><i class="bi bi-book me-1"></i>
                      Docs
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item text-body p-2 ps-3" href="/donate"><i class="bi bi-heart me-1"></i>
                      Donate
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item text-body" onclick="window.location.reload(true);"><i class="bi bi-arrow-clockwise me-1"></i>
                    Reload</a>
                  </li>
              </ul>
          </li>
          </div>
          <div class="collapse navbar-collapse" id="navbarSplashToggled">
              <ul class="navbar-nav me-auto">
              <li class="nav-item">
    <a href="/blog" class="nav-link" style="color:#ffffff8c;"><i class="bi bi-pencil-fill me-1"></i> Blog</a> 
              </li>
              <li class="nav-item">
    <a href="/docs" class="nav-link" style="color:#ffffff8c;"><i class="bi bi-book-fill me-1"></i> Docs</a> 
              </li>
                <li class="nav-item">
                  <a href="/donate" class="nav-link" style="color:#ffffff8c;"><i class="bi bi-heart-fill me-1"></i> Donate</a> 
                </li>
              </ul>
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
        <a href="#" data-bs-toggle="modal" data-bs-target="#loginmodal" class="nav-link" style="color:#ffffff8c;" onclick="setPage('login');"><i class="bi bi-door-open-fill me-1"></i> Login</a> 
                  </li>
                  <li class="nav-item">
        <a href="#" data-bs-toggle="modal" data-bs-target="#registermodal" class="nav-link" style="color:#ffffff8c;" onclick="setPage('register');"><i class="bi bi-person-plus-fill me-1"></i> Register</a></span>
                  </li>
                </ul>
            </div>
        </div>
    </nav>
    <style>
      .nav-link:hover {
        color:white!important;
      }
    </style>
`;
refreshColorScheme();
document.getElementById("main").innerHTML = `
    <div style="max-width:800px;" class="ms-auto mt-5 me-auto">
        <?php include_once "components/alert.php"; ?>
    </div>


    <h1 class="mb-3 lh-1 text-center text-gradient splash-title-primary splash-title-mobile"
        style="margin-top:25vh;font-size:60pt;">
        Tired of managing<br><span class="typewrite text-info" data-period="2000" data-type='[ "Poker buyins", "Blackjack buyins", "Blackjack cashouts", "Poker rebuys"]'></span>?
    </h1>

    <div class="text-center" style="margin-top:100px!important;margin-bottom:75px!important">
      <div class="btn-group" role="group" aria-label="...">
          <a href="#" data-bs-toggle="modal" data-bs-target="#registermodal" class="btn btn-primary" onclick="setPage('register');">Register</a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#loginmodal" class="btn btn-secondary" onclick="setPage('login');">Login</a>
      </div>
    </div>


    <p class="text-center" style="font-size:20pt;margin-top:50px">
        We have a solution!
    </p>
    


    <p class="text-center" style="font-size:20pt;margin-top:180px;opacity:50%;">
        <i class="bi bi-arrow-down"></i> Keep Scrolling! <i class="bi bi-arrow-down"></i>
    </p>

    <h1 class="fw-semibold text-center" style="margin-top:180px!important;"><i class="bi bi-cash align-middle text-success"></i> Free to use <i class="bi bi-cash align-middle text-success"></i></h1>
    <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
        We wont charge you a single penny for using this service. This project is fully independent, with no ads or tracking.
    </p>

    <h1 class="fw-semibold text-center" style="margin-top:100px!important;"><i class="bi bi-bank align-middle text-primary"></i> Be the house <i class="bi bi-bank align-middle text-primary"></i></h1>
    <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
        Keep track of buyins, cashouts, and participants with ease.
        Gone are the days of missing or extra money, writing down transactions in your notes, etc. You can track payments with Zelle, Cashapp, Venmo, and cash.
    </p>

    <h1 class="fw-semibold text-center" style="margin-top:100px!important;"><i class="bi bi-key align-middle text-warning"></i> Keep it Secure <i class="bi bi-key align-middle text-warning"></i></h1>
    <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
        We are open source! Meaning, you can host chipledger on your own server, disconnected from the internet.
        Prevent people from modifying
        values, stealing data, and more by taking matters into your own hands.
    </p>

    <div class="text-center" style="margin-top:100px!important;margin-bottom:50px!important">
        <div class="btn-group" role="group" aria-label="...">
            <a href="#" data-bs-toggle="modal" data-bs-target="#registermodal" class="btn btn-primary" onclick="setPage('register');">Register</a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#loginmodal" class="btn btn-secondary" onclick="setPage('login');">Login</a>
        </div>
    </div>

    <!-- Login -->
    <div class="modal fade border" id="loginmodal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width:350px;margin:auto;">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Login</h1>
                </div>

                <form id="loginForm">
                    <div class="modal-body">
                        <div class="alert alert-danger" id="loginAlert" style="display: none;"></div>
                        <div class="mb-3">
                            <label class="form-label">Username <span class="text-danger">*</span></label>
                            <input type="text" onclick="loginAlert('hide','');" class="form-control" name="username" id="loginUsernameInput" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password <span class="text-danger">*</span></label>
                            <input type="password" onclick="loginAlert('hide','');" class="form-control" name="password" id="loginPasswordInput" required>
                        </div>
                        <div class="mb-3">
                            <span>Dont have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#registermodal">Register</a>.</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="mb-3">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form> 
            </div>
        </div>
    </div>


    <!-- Register -->
    <div class="modal fade border" id="registermodal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width:350px;margin:auto;">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Register</h1>
                </div>

                <form id="registerForm">
                    <div class="modal-body">
                        <div class="alert alert-danger" id="registerAlert" style="display: none;"></div>
                        <div class="mb-3">
                            <label class="form-label">Username <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" name="username" id="registerUsernameInput" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" id="registerEmailInput">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password <span class="text-danger">*</span></label>
                            <input type="password" class="form-control" name="password" id="registerPasswordInput" required>
                        </div>
                        <div class="mb-3">
                          <span>Already have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#loginmodal">Log in</a>.</span>
                        </div>
                        <div class="mb-3">
                            By clicking Register, you agree you have read and agreed to the <a target="_blank"x href="/policy/tos">Terms of Service</a> and <a target="_blank"x href="/policy/cookies">Cookie Policy</a> before registration.
                            Please read both fully. They are short. The link will open in a new tab on desktop.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="mb-3">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        document.body.appendChild(css);
    };


async function login() {
  try {
    let loginUsername = document.getElementById("loginUsernameInput").value;
    let loginPassword = document.getElementById("loginPasswordInput").value;
    // URL Encoding
    loginUsername = encodeURIComponent(loginUsername);
    loginPassword = encodeURIComponent(loginPassword);
    const response = await fetch(
      "/api/auth/login?username=" + loginUsername + "&password=" + loginPassword
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      loginAlert("show", json["errormessage"]);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error.message);
  }
}

function loginAlert(action, value) {
  if (action == "show") {
    document.getElementById("loginAlert").style.display = "block";
    document.getElementById("loginAlert").innerText = value;
  } else if (action == "hide") {
    document.getElementById("loginAlert").style.display = "none";
  } else {
    document.getElementById("loginAlert").style.display = "block";
    document.getElementById("loginAlert").innerText =
      "loginAlert() action is invalid";
  }
}

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  login();
});

document.getElementById("loginmodal").addEventListener("shown.bs.modal", () => {
  document.getElementById("loginUsernameInput").focus();
});

document.getElementById("loginmodal").addEventListener("hide.bs.modal", () => {
  setPage("/");
});

async function register() {
  try {
    let registerUsername = document.getElementById(
      "registerUsernameInput"
    ).value;
    let registerEmail = document.getElementById("registerEmailInput").value;
    let registerPassword = document.getElementById(
      "registerPasswordInput"
    ).value;
    registerUsername = encodeURIComponent(registerUsername);
    registerEmail = encodeURIComponent(registerEmail);
    registerPassword = encodeURIComponent(registerPassword);
    const response = await fetch(
      "/api/auth/register?username=" +
        registerUsername +
        "&email=" +
        registerEmail +
        "&password=" +
        registerPassword
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      registerAlert("show", json["errormessage"]);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error.message);
  }
}

function registerAlert(action, value) {
  if (action == "show") {
    document.getElementById("registerAlert").style.display = "block";
    document.getElementById("registerAlert").innerText = value;
  } else if (action == "hide") {
    document.getElementById("registerAlert").style.display = "none";
  } else {
    document.getElementById("registerAlert").style.display = "block";
    document.getElementById("registerAlert").innerText =
      "registerAlert() action is invalid";
  }
}

document.querySelector("#registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  register();
});

document
  .getElementById("registermodal")
  .addEventListener("shown.bs.modal", () => {
    document.getElementById("registerUsernameInput").focus();
  });

document
  .getElementById("registermodal")
  .addEventListener("hide.bs.modal", () => {
    setPage("/");
  });

function setPage(pageName) {
  // This code below checks if the user is in sub directories, and redirects back to base.
  let slashcount = 0;
  let oldurl = window.location.pathname;
  for (var i = 0; i < oldurl.length;i++) {
    if (oldurl.charAt(i) == "/") {
      slashcount++;
    }
    if (slashcount > 2) {
      if (pageName == "login") {
        window.location.replace("/login");
      } else if (pageName == "register") {
        window.location.replace("/register");
      } else {
        window.location.replace("/");
      }
    }
  }
  window.history.pushState({}, "", pageName);
}

switch (this.window.location.pathname.toLowerCase()) {
  case "/login":
    const loginModal = new bootstrap.Modal("#loginmodal", {
      keyboard: false,
    });
    loginModal.show();
    break;
  case "/register":
    const registerModal = new bootstrap.Modal("#registermodal", {
      keyboard: false,
    });
    registerModal.show();
    break;
  case "/":
    break;
  default:
    document.title = "Error 404 - Chipledger";
    document.getElementById("main").innerHTML = `
      <h2 class="mt-5 border-bottom border-1 pb-2">Error 404.</h2>
      <p>
        The page you have requested cannot be found. Here are some troubleshooting steps:
        <ol>
            <li>The page may have moved to a new URL.</li>
            <li>You may have an extra <code class="border p-1 rounded">/</code> at the end of the URL.</li>
        </ol>
        Sorry for the inconvenience.
      </p>`;
    break;
}
