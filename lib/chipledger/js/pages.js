// Caches already fetched content to avoid doing so twice.
const cache = [];
// Stores Pretty versions of Page Names
const pageNamesPretty = [];
pageNamesPretty["/games"] = "Games";
pageNamesPretty["/settings"] = "Settings";
// Stores GET params in the url
let paramList = [];

// This function puts all params in the URL into the paramList[] array.
function setParams() {
  paramList = [];
  params = new URLSearchParams(window.location.search);
  for (const element of params.keys()) {
    paramList[element] = params.get(element);
  }
}

// Shows an error at the top of the page. NOT used by the game view screen.
function showError(message) {
  document.getElementById("main").innerHTML =
    `<div class="alert alert-danger" id="errorMessage">` +
    message +
    `</div>` +
    document.getElementById("main").innerHTML;
}

// Removes the error
function deleteError() {
  document.getElementById("errorMessage").remove();
}

// Sets the page in the URL on browser, adds to history.
function setPage(pageName) {
  if (window.location.search != "") {
    setParams();
  }
  showNav(pageName);
  if (pageNamesPretty[pageName] == undefined) {
    document.title = siteName;
  } else {
    document.title = pageNamesPretty[pageName] + " - " + siteName;
  }
  window.history.pushState({}, "", pageName);
}

// Press "/" to activate the search bar on the games screen
document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    event.preventDefault(); // Prevent default browser behavior for '/'

    const searchInput = document.getElementById("gamesSearchInput");
    if (searchInput) {
      searchInput.focus();
    }
  }
});

// Search for games screen.
function gamesSearch() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("gamesSearchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("gamestable");
  li = ul.getElementsByTagName("tr");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("td")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Games screen and rendering
async function games() {
  setPage("/games");
  try {
    const response = await fetch("/api/game/list");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    gamesTable = `<table class="table w-100 border-0" style="font-size:1.15em;" id="gamestable">`;
    if (json["error"] !== undefined) {
      gamesTable += `<tr class='w-100 border-0'><td class='p-0 border-0 text-center pt-5 pb-5'>No games found.</td></tr>`;
    } else {
      json.forEach((element) => {
        gamesTable +=
          `<tr class='w-100 border-0'><td class='p-0 border-0'><a class='text-decoration-none btn btn-auto w-100 m-0 mb-2 text-start' onclick='paramList["game"]="` +
          element +
          `";view();'>` +
          element +
          `<i class='bi bi-arrow-right float-end'></i></a></td></tr>`;
      });
    }
    gamesTable += `</table`;
    document.getElementById("main").innerHTML =
      `<h1 class="text-center mt-5 mb-5" style="font-size:3em;">Games</h1> 
         <div class="card">
            <h2 class="card-header p-2"><input type="text" id="gamesSearchInput" class="form-control w-auto d-inline align-middle" onkeyup="gamesSearch()" placeholder="Search games">
 <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal"
                    class="btn btn-primary float-end"><i class="bi bi-plus"></i>
                    New Game</a>
            </h2>
            <div class="card-body">` +
      gamesTable +
      `
        </div></div>
        <!-- New Game Modal -->
        <div class="modal fade border" id="newgamemodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">New Game</h1>
                    </div>

                    <form id="newgameForm">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Game Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="name" id="newgameNameInput" value="` +
      username +
      "-" +
      d.getDay() +
      "-" +
      d.getMonth() +
      "-" +
      d.getFullYear() +
      `" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>`;

    refreshColorScheme();

    document
      .querySelector("#newgameForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        newgame();
      });
  } catch (error) {
    console.error(error.message);
  }
}

// API calls for a new game.
async function newgame() {
  try {
    let newgameName = document.getElementById("newgameNameInput").value;
    const response = await fetch("/api/game/new?name=" + newgameName);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      showError(json["errormessage"]);
      document.getElementById("newgamemodal").style.display = "none";
    } else {
      paramList["game"] = newgameName;
      view();
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Homepage (NOT SPLASH). Calls API to get releasenotes.
async function home() {
  setPage("/");
  if (cache["releaseNotes"] == undefined) {
    try {
      const response = await fetch("/api/data/releaseNotes");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      cache["releaseNotes"] = json;
    } catch (error) {
      showError(json["errormessage"]);
    }
  }
  document.getElementById("main").innerHTML =
    `<h1 class="text-center mt-5 mb-5" style="font-size:3em;">Welcome back, <span class="text-info">` +
    username +
    `</span>.</h1>
    <div class="card mb-4 onlymobile">
      <h5 class="card-header"><i class="bi bi-link-45deg"></i> Quick Links <a class="btn btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto btn-dark" data-bs-toggle="collapse" href="#actionsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
      <div class="collapse multi-collapse show" id="actionsBody">
        <div class="card-body p-2">
          <a href="#" onclick="games()" class="btn btn-lg btn-primary w-100 mb-2 text-start"><i class="bi bi-suit-spade"></i>
              Games</a>
          <a href="#" onclick="settings()" class="btn btn-lg btn-warning w-100 text-start"><i class="bi bi-gear"></i>
            Settings</a>
              </div>
      </div>
    </div>
    <div class="card">
      <h5 class="card-header">
      <i class="bi bi-newspaper me-1"></i> News <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#newsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a>
      </h5>
      <div class="collapse multi-collapse show" id="newsBody">
        <div class="card-body">` +
    cache["releaseNotes"]["data"] +
    `   </div></div>`;
    refreshColorScheme();
}

// Error 404 page.
function error404() {
  document.title = "Error 404 - " + siteName;
  document.getElementById("main").innerHTML = `
            <h2 class="mt-5 border-bottom border-1 pb-2">Error 404.</h2>
        <p>The page you have requested cannot be found. Here are some troubleshooting steps:
            <ol>
                <li>The page may have moved to a new URLThe page may have moved to a new URL.</li>
                <li>You may have an extra <code class="border p-1 rounded">/</code> at the end of the URL.</li>
            </ol>
            Sorry for the inconvenience.
        </p>`;
}

// Settings page
async function settings() {
  setPage("/settings");
  let settingsData;
  try {
    const response = await fetch("/api/user/get");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    settingsData = json;
    if (settingsData["email"] == "") {
      settingsData["email"] = "N/A";
    }
  } catch (error) {
    showError(json["errormessage"]);
  }
  document.getElementById("main").innerHTML =
    `
      <h1 class="text-center mt-5 mb-5" style="font-size:3em;">Settings</h1>
      <div class="row g-2" style="margin: 0px!important;grid-template-columns: 1fr 1fr;">
        <div class="col-md ps-0 mt-0">
          <div class="card mb-2">
          <h5 class="card-header"><i class="bi bi-person-lines-fill"></i> Overview</h5>
            <div class="card-body">
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-person-badge-fill me-1"></i> Username</span>
                    <input type="username" class="form-control" disabled="" value="` +
    username +
    `">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-envelope-at-fill me-1"></i> Email</span>
                    <input type="username" class="form-control" disabled="" value="` +
    settingsData["email"] +
    `">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-calendar-date-fill me-1"></i> Join Date</span>
                    <input type="text" class="form-control" disabled="" value="` +
    settingsData["joindate"] +
    `">
                </div>
            </div>
          </div>
        </div>
        <div class="col-md ps-0 mt-0">
        <div class="card mb-2">
          <h5 class="card-header"><i class="bi bi-hammer"></i> Actions</h5>
          <div class="card-body">
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#changepasswordmodal"><i class="bi bi-key"></i> Change Password</a>
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#changeemailmodal"><i class="bi bi-envelope-fill"></i> Change Email</a>
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#deleteaccountmodal"><i class="bi bi-trash"></i> Delete Account</a>
          </div>
          </div>
        </div>
      </div>
      
        <!-- Change Password -->
        <div class="modal fade border" id="changepasswordmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Change Password</h1>
                    </div>
                    <form id="changepasswordForm">
                        <div class="modal-body">
                          <div class="mb-3">
                              <label class="form-label">New Password <span class="text-danger">*</span></label>
                              <input type="password" class="form-control" name="username" id="changepasswordNewInput" required>
                          </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Change Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Change Email -->
        <div class="modal fade border" id="changeemailmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Change Email</h1>
                    </div>
                    <form id="changeemailForm">
                        <div class="modal-body">
                            <div class="mb-3">
                              <label class="form-label">New Email <span class="text-danger">*</span></label>
                              <input type="email" class="form-control" name="username" id="changeemailNewInput">
                          </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Change Email</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Delete Account -->
        <div class="modal fade border" id="deleteaccountmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Delete Account</h1>
                    </div>
                    <form id="deleteAccountForm">
                        <div class="modal-body">
                          You are about to delete your account. This is permanent and cannot be undone. Continue?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" onclick="deleteAccount();" data-bs-dismiss="modal">Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;

  async function changePassword() {
    document.getElementById("changepasswordmodal").style.display = "none";
    let newPassword = document.getElementById("changepasswordNewInput").value;
    newPassword = encodeURIComponent(newPassword);
    try {
      const response = await fetch(
        "/api/user/changePassword?newpassword=" + newPassword
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if (json["error"] == true) {
        showError(json["errormessage"]);
      } else {
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async function changeEmail() {
    document.getElementById("changeemailmodal").style.display = "none";
    let newEmail = document.getElementById("changeemailNewInput").value;
    newEmail = encodeURIComponent(newEmail);
    try {
      const response = await fetch(
        "/api/user/changeEmail?newemail=" + newEmail
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if (json["error"] == true) {
        showError(json["errormessage"]);
      } else {
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async function deleteAccount() {
    document.getElementById("deleteaccountmodal").style.display = "none";
    try {
      const response = await fetch("/api/user/delete");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if (json["error"] == true) {
        showError(json["errormessage"]);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  document
    .querySelector("#changepasswordForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      changePassword();
      settings();
    });

  document
    .querySelector("#changeemailmodal")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      changeEmail();
      settings();
    });

  document
    .querySelector("#deleteAccountForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      deleteAccount();
    });
}

// Sets the current page.
setPage(this.window.location.pathname.toLowerCase());

// Switch case for current URL in place.
switch (this.window.location.pathname.toLowerCase()) {
  case "/":
    home();
    break;
  case "/games":
    games();
    break;
  case "/view":
    view();
    break;
  case "/settings":
    settings();
    break;
  default:
    error404();
    break;
}
