document.getElementById("main").innerHTML = `<style>
    body {
        opacity: 0;
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>
<nav class="navbar fixed-top bg-body-tertiary p-1 border-0 ps-3 pe-3">
    <div class="container-fluid p-0 text-secondary">
        <span class="me-auto"><a href="/" class="text-decoration-none me-3"><i class="bi bi-bank"></i> Chipledger</a></span>
        <span class="ms-auto"><a href="/docs" class="text-decoration-none me-3 border-end border-1 p-0 pe-3 m-0 nomobile"><i class="bi bi-book-fill me-1"></i> Docs</a> 
        <a href="#" data-bs-toggle="modal" data-bs-target="#loginmodal" class="text-decoration-none me-3 border-end border-1 p-0 pe-3 m-0" onclick="setPage('login');"><i class="bi bi-door-open-fill me-1"></i> Login</a> 
        <a href="#" data-bs-toggle="modal" data-bs-target="#registermodal" class="text-decoration-none" onclick="setPage('register');"><i class="bi bi-person-plus-fill me-1"></i> Register</a></span>
    </div>
    </div>
</nav>
    <div style="max-width:800px;" class="ms-auto mt-5 me-auto">
        <?php include_once "components/alert.php"; ?>
    </div>


    <h1 class="mb-3 fw-semibold lh-1 text-center text-gradient splash-title-primary splash-title-mobile"
        style="margin-top:25vh;font-size:60pt;">
        Tired of managing <span class="text-info">poker buyins</span>?
    </h1>


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
                            By clicking Register, you agree you have read and agreed to the <a target="_blank"x href="/docs/tos">Terms of Service</a> and <a target="_blank"x href="/docs/cookies">Cookie Policy</a> before registration.
                            Please read both fully, as they are short. The link will open in a new tab.
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
  window.history.pushState({}, "", pageName);
}

if (document.location.pathname == "/login") {
  const loginModal = new bootstrap.Modal("#loginmodal", {
    keyboard: false,
  });
  loginModal.show();
}

if (document.location.pathname == "/register") {
  const registerModal = new bootstrap.Modal("#registermodal", {
    keyboard: false,
  });
  registerModal.show();
}
