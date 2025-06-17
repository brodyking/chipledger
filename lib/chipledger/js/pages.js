// Caches already fetched content to avoid doing so twice.
const cache = [];
// Stores Pretty versions of Page Names
const pageNamesPretty = [];
pageNamesPretty["/games"] = "Games";
pageNamesPretty["/donate"] = "Donate";
pageNamesPretty["/settings"] = "Settings";
// Stores GET params in the url
let paramList = [];

function setParams() {
  paramList = [];
  params = new URLSearchParams(window.location.search);
  keys = params.keys();
  keys.forEach((element) => {
    paramList[element] = params.get(element);
  });
}

function showError(message) {
  document.getElementById("main").innerHTML =
    `<div class="alert alert-danger" id="errorMessage">` +
    message +
    `</div>` +
    document.getElementById("main").innerHTML;
}

function deleteError() {
  document.getElementById("errorMessage").remove();
}

async function getData(dataLocation) {
  try {
    const response = await fetch("/api/data/" + dataLocation);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function setPage(pageName) {
  if (window.location.search != "") {
    setParams();
  }
  if (pageName == "/") {
    showNav("/home");
  } else {
    showNav(pageName);
  }
  if (pageNamesPretty[pageName] == undefined) {
    document.title = siteName;
  } else {
    document.title = pageNamesPretty[pageName] + " - " + siteName;
  }
  window.history.pushState({}, "", pageName);
}

document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault(); // Prevent default browser behavior for '/'

        const searchInput = document.getElementById('gamesSearchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

function gamesSearch() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('gamesSearchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("gamestable");
  li = ul.getElementsByTagName('tr');

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
          `<tr class='w-100 border-0'><td class='p-0 border-0'><a class='text-decoration-none btn btn-primary w-100 m-0 mb-2 text-start' onclick='paramList["game"]="` +
          element +
          `";view();'>` +
          element +
          `<i class='bi bi-arrow-right ms-auto'></i></a></td></tr>`;
      });
    }
    gamesTable += `</table`;
    document.getElementById("main").innerHTML =
      `<h1 class='mt-3 mb-4 text-center'>Games</h1> 
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
    `</span>.</h1><div class="card"><h5 class="card-header">Release Notes</h5><div class="card-body">` +
    cache["releaseNotes"]["data"] +
    `</div></div>`;
}

async function donate() {
  setPage("/donate");
  if (cache["donate"] == undefined) {
    try {
      const response = await fetch("/api/data/donate");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      cache["donate"] = json;
    } catch (error) {
      showError(json["errormessage"]);
    }
  }
  document.getElementById("main").innerHTML = cache["donate"]["data"];
}

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
  document.getElementById("main").innerHTML = `
      <h1 class='mt-3 mb-4 text-center'>Settings</h1>
      <div class="row g-2" style="margin: 0px!important;grid-template-columns: 1fr 1fr;">
        <div class="col-md ps-0 mt-0">
          <div class="card mb-2">
          <h5 class="card-header"><i class="bi bi-person-lines-fill"></i> Overview</h5>
            <div class="card-body">
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-person-badge-fill me-1"></i> Username</span>
                    <input type="username" class="form-control" disabled="" value="`+username+`">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-envelope-at-fill me-1"></i> Email</span>
                    <input type="username" class="form-control" disabled="" value="`+settingsData["email"]+`">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" style="background-color: #dee2e608!important" id="basic-addon1"><i class="bi bi-calendar-date-fill me-1"></i> Join Date</span>
                    <input type="text" class="form-control" disabled="" value="`+settingsData["joindate"]+`">
                </div>
            </div>
          </div>
        </div>
        <div class="col-md ps-0 mt-0">
        <div class="card mb-2">
          <h5 class="card-header"><i class="bi bi-hammer"></i> Actions</h5>
          <div class="card-body">
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#"><i class="bi bi-trash"></i> Reset Data</a>
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#"><i class="bi bi-key"></i> Change Password</a>
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#"><i class="bi bi-envelope-fill"></i> Change Email</a>
                <a class="btn btn-primary w-100 mb-3" href="#" data-bs-toggle="modal" data-bs-target="#"><i class="bi bi-trash"></i> Delete Account</a>
          </div>
          </div>
        </div>
      </div>`;
}

setPage(this.window.location.pathname.toLowerCase());

if (this.window.location.pathname.toLowerCase() == "/") {
  home();
}
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
  case "/donate":
    donate();
    break;
  case "/settings":
    settings();
    break;
  default:
    home();
    break;
}
