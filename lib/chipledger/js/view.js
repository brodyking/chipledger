let data;
let gameName;
async function view() {
  setPage("/view");
  if (paramList["game"] === undefined) {
    setPage("/games");
    games();
  } else {
    gameName = paramList["game"];
    document.title = gameName + " - " + siteName;

    function baserender() {
      document.getElementById("main").innerHTML =
        `

        <div class="alert alert-danger" id="jserrors" style="display: none"></div>

        <h1 class="text-center mt-5 mb-5" style="font-size:3em;">` +
        gameName +
        `</h1>

        <div class="row g-2" style="margin: 0px!important;grid-template-columns: 1fr 1fr;">
            <div class="col-md ps-0 mt-0">
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-person-lines-fill"></i> Players Overview</h5>
                    <div class="card-body">
                        <p id="players">id=players</p>
                    </div>
                </div>
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-cash"></i> Buyins</h5>
                    <div class="card-body">
                        <p id="buyins">id=buyins</p>
                    </div>
                </div>
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-door-open-fill"></i> Cashouts</h5>
                    <div class="card-body">
                        <p id="cashouts">id=cashouts</p>
                    </div>
                </div>
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-clock-fill"></i> History</h5>
                    <div class="card-body">
                        <p id="history">id=history</p>
                    </div>
                </div>
            </div>
            <div class="col-md ps-0 mt-0">
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-bank2"></i> Actions</h5>
                    <div class="card-body">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newplayermodal"
                            class="btn btn-primary w-100 mb-3"><i class="bi bi-person-fill"></i>
                            Add Player</a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newbuyinmodal"
                            class="btn btn-success w-100 mb-3"><i class="bi bi-wallet-fill"></i>
                            Buy In</a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newcashoutmodal"
                            class="btn btn-warning w-100 mb-3"><i class="bi bi-piggy-bank-fill"></i>
                            Cashout</a>
                        <div class="btn-group w-100" role="group" aria-label="Basic example">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#renamegamemodal"
                                class="btn btn-primary"><i class="bi bi-pencil-fill"></i>
                                Rename Game</a>
                            <a href="#" data-bs-toggle="modal" data-bs-target="#deletegamemodal"
                                class="btn btn-danger"><i class="bi bi-trash-fill"></i>
                                Delete Game</a>

                        </div>
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header"><i class="bi bi-bar-chart-fill"></i> Stats</h5>
                    <div class="card-body">
                        <!-- Total Players -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #dee2e608!important"
                                id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                            <input type="username" class="form-control" disabled="" value="id=totalPlayers"
                                id="totalPlayers">
                        </div>
                        <!-- Total Pot -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #dee2e608!important"
                                id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                            <input type="username" class="form-control" disabled="" value="id=totalPot" id="totalPot">
                        </div>
                        <!-- Total Cashouts -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #dee2e608!important"
                                id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                            <input type="username" class="form-control" disabled="" value="id=totalCashouts"
                                id="totalCashouts">
                        </div>
                        <!-- Total Buyins -->
                        <div class="input-group mb-3">
                            <span class="input-group-text" style="background-color: #dee2e608!important"
                                id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                            <input type="username" class="form-control" disabled="" value="id=totalBuyins"
                                id="totalBuyins">
                        </div>
                    </div>

                </div>
            </div>
        </div>




        <!-- New Player -->
        <div class="modal fade border" id="newplayermodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">New Player</h1>
                    </div>
                    <form id="addPlayerForm">

                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" id="newplayerName" name="oldname" value=""
                                    required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add
                                Player</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>

        <!-- New Buyin -->
        <div class="modal fade border" id="newbuyinmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">New Buyin</h1>
                    </div>
                    <form id="addBuyinForm">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Player <span class="text-danger">*</span></label>
                                <select class="form-select" id="buyinNamesList" name="playername" required>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Amount <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="buyinAmount" name="amount"
                                        value="1" step="0.01" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Method <span class="text-danger">*</span></label>
                                <select class="form-select" id="buyinPaymentMethodsList" name="paymentMethodsList" required>
                                  <option value="cash"><span class="text-success">Cash</span></option>
                                  <option value="venmo">Venmo</option>
                                  <option value="zelle">Zelle</option>
                                  <option value="cashapp">Cash App</option>
                                  <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Add
                                Buyin</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>

        <!-- New Cashout -->
        <div class="modal fade border" id="newcashoutmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Cashout</h1>
                    </div>
                    <form id="addCashoutForm">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Player <span class="text-danger">*</span></label>
                                <select class="form-select" id="cashoutNamesList" name="playername" required>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Amount <span class="text-danger">*</span></label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="cashoutAmount" name="amount"
                                        value="1" step="0.01" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Method <span class="text-danger">*</span></label>
                                <select class="form-select" id="cashoutPaymentMethodsList" name="paymentMethodsList" required>
                                  <option value="cash"><span class="text-success">Cash</span></option>
                                  <option value="venmo">Venmo</option>
                                  <option value="zelle">Zelle</option>
                                  <option value="cashapp">Cash App</option>
                                  <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Cashout</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>

        <!-- Rename Game -->
        <div class="modal fade border" id="renamegamemodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Rename Game</h1>
                    </div>

                    <form id='renameGameForm'>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Old Name <span class="text-danger">*</span></label>
                                <input type="text" id="renameGameOldName" class="form-control" name="oldname" value="` +
        gameName +
        `" required readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">New Name <span class="text-danger">*</span></label>
                                <input type="text" id="renameGameNewName" class="form-control" name="newname" value="` +
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
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Rename</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>

        <!-- Delete Game -->
        <div class="modal fade border" id="deletegamemodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Delete Game</h1>
                    </div>
                    <div class="modal-body">
                        You are about to delete <b>` +
        gameName +
        `</b>. You cannot undo this
                        action.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <a onclick="deleteGame();" data-bs-dismiss="modal" class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    try {
      const response = await fetch("/api/game/get?name=" + gameName);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      if (json["error"] == true) {
        setPage("/games");
        games();
      } else {
        baserender();
        data = json;
        hydrate();

        document
          .querySelector("#addBuyinForm")
          .addEventListener("submit", (event) => {
            event.preventDefault();
            addBuyin();
          });

        document
          .querySelector("#addPlayerForm")
          .addEventListener("submit", (event) => {
            event.preventDefault();
            addPlayer();
          });

        document
          .querySelector("#addCashoutForm")
          .addEventListener("submit", (event) => {
            event.preventDefault();
            addCashout();
          });

        document
          .querySelector("#renameGameForm")
          .addEventListener("submit", (event) => {
            event.preventDefault();
            renameGame();
          });
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

function errorShow(error) {
  rehydrate();
  document.getElementById("jserrors").style.display = "block";
  document.getElementById("jserrors").innerText = error;
}

function hydrate() {
  let players = data["players"];
  let history = data["totalHistory"];
  let methodPretty = [];
  methodPretty["cash"] = `<span class="badge text-bg-success">Cash</span>`;
  methodPretty["venmo"] = `<span class="badge text-bg-info">Venmo</span>`;
  methodPretty["zelle"] = `<span class="badge text-bg-primary">Zelle</span>`;
  methodPretty[
    "cashapp"
  ] = `<span class="badge text-bg-success">Cash App<span class="badge text-bg-success">`;
  methodPretty["other"] = `<span class="badge text-bg-secondary">Other</span>`;
  // Sets the page url
  window.history.replaceState(
    { page: "current" },
    "current page",
    "/view?game=" + gameName
  );

  // Sets the information in the stats tab
  document.getElementById("totalPot").value = "$" + data["totalPot"];
  document.getElementById("totalCashouts").value = "$" + data["totalCashouts"];
  document.getElementById("totalBuyins").value = "$" + data["totalBuyins"];
  document.getElementById("totalPlayers").value = data["totalPlayers"];

  // History tab
  if (history.length > 0) {
    let historyList = "<table class='table table-striped border'>";
    let backgroundColor = "";
    history.forEach((element) => {
      if (element["type"] == "buyin") {
        backgroundColor = "bg-success-subtle";
      } else if (element["type"] == "join") {
        backgroundColor = "bg-info-subtle";
      } else if (element["type"] == "cashout") {
        backgroundColor = "bg-warning-subtle";
      } else {
        backgroundColor = "";
      }
      historyList +=
        "<tr><td class='" +
        backgroundColor +
        " border-right border-1'>" +
        element["type"] +
        "</td><td>" +
        element["message"] +
        "</td></tr>";
    });
    document.getElementById("history").innerHTML = historyList + "</table>";
  } else {
    document.getElementById("history").innerHTML = "No history.";
  }

  // Overview tab
  if (players.length > 0) {
    let playerList =
      "<table class='table table-striped border'><thead><td class='border-right border-1'><b>Name</b></td><td class='border-right border-1'><b>Buy in</b></td><td class='border-right border-1'><b>Cash out</b></td><td><b>Net Profit</b></td></thead>";
    players.forEach((element) => {
      let profit = data["cashouts"][element] - data["buyins"][element];
      if (profit < 0) {
        profit = "-$" + Math.abs(profit);
      } else {
        profit = "$" + Math.abs(profit);
      }
      playerList +=
        "<tr><td class='border-right border-1'><b>" +
        element +
        "</b></td><td class='border-right border-1'>$" +
        data["buyins"][element] +
        "</td><td class='border-right border-1'>$" +
        data["cashouts"][element] +
        "</td><td>" +
        profit +
        "</td></tr>";
    });
    document.getElementById("players").innerHTML = playerList + "</table>";
  } else {
    document.getElementById("players").innerHTML = "No participants.";
  }

  // Buyins tab
  if (players.length > 0) {
    let buyinListArray = data["buyinsHistory"];
    let buyinList =
      "<table class='table table-striped border'><thead><td class='border-right border-1'><b>Name</b></td><td class='border-right border-1'><b>Amount</b></td><td class='border-right border-1'><b>Method</b></td></thead>";
    buyinListArray.forEach((element) => {
      buyinList +=
        "<tr><td class='border-right border-1'><b>" +
        element["name"] +
        "</b></td><td class='border-right border-1'>$" +
        element["value"] +
        "</td>" +
        "<td>" +
        methodPretty[element["method"]] +
        "</td></tr>";
    });
    document.getElementById("buyins").innerHTML = buyinList + "</table>";
  } else {
    document.getElementById("buyins").innerHTML = "No Buyins.";
  }

  // Cashouts tab
  if (players.length > 0) {
    let buyinListArray = data["cashoutsHistory"];
    let buyinList =
      "<table class='table table-striped border'><thead><td class='border-right border-1'><b>Name</b></td><td class='border-right border-1'><b>Amount</b></td><td class='border-right border-1'><b>Method</b></td></thead>";
    buyinListArray.forEach((element) => {
      buyinList +=
        "<tr><td class='border-right border-1'><b>" +
        element["name"] +
        "</b></td><td class='border-right border-1'>$" +
        element["value"] +
        "</td>" +
        "<td>" +
        methodPretty[element["method"]] +
        "</td></tr>";
    });
    document.getElementById("cashouts").innerHTML = buyinList + "</table>";
  } else {
    document.getElementById("cashouts").innerHTML = "No Cashouts.";
  }

  // Hide alerts
  document.getElementById("jserrors").style.display = "none";

  // Buyin Names Selection
  if (players.length > 0) {
    document.getElementById("buyinNamesList").disabled = false;
    let buyinNamesList =
      "<option value='disabled'>Please select a player</option>";
    players.forEach((element) => {
      buyinNamesList +=
        "<option value='" + element + "'>" + element + "</option>";
    });
    document.getElementById("buyinNamesList").innerHTML = buyinNamesList;
  } else {
    document.getElementById("buyinNamesList").innerHTML =
      "<option value='disabled'>No participants.</option>";
    document.getElementById("buyinNamesList").disabled = true;
  }

  // Cashout Names Selection
  if (players.length > 0) {
    document.getElementById("cashoutNamesList").disabled = false;
    let cashoutNamesList =
      "<option value='disabled'>Please select a player</option>";
    players.forEach((element) => {
      cashoutNamesList +=
        "<option value='" + element + "'>" + element + "</option>";
    });
    document.getElementById("cashoutNamesList").innerHTML = cashoutNamesList;
  } else {
    document.getElementById("cashoutNamesList").innerHTML =
      "<option value='disabled'>No participants.</option>";
    document.getElementById("cashoutNamesList").disabled = true;
  }
}

function rehydrate() {
  hydrate();

  if (document.getElementById("alerterror") !== null) {
    document.getElementById("alerterror").style.display = "none";
  }

  if (document.getElementById("alertsuccess") !== null) {
    document.getElementById("alertsuccess").style.display = "none";
  }
}

// Adding players
async function addPlayer() {
  try {
    let playerName = document.getElementById("newplayerName").value;
    document.getElementById("newplayerName").value = "";
    const response = await fetch(
      "/api/game/addPlayer?name=" + gameName + "&playername=" + playerName
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      errorShow(json["errormessage"]);
    } else {
      data = json;
      rehydrate();
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Adding buyins
async function addBuyin() {
  try {
    let playerName = document.getElementById("buyinNamesList").value;
    let amount = document.getElementById("buyinAmount").value;
    let method = document.getElementById("buyinPaymentMethodsList").value;
    document.getElementById("buyinAmount").value = "1.00";
    const response = await fetch(
      "/api/game/addBuyin?name=" +
        gameName +
        "&playername=" +
        playerName +
        "&amount=" +
        amount +
        "&method=" +
        method
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      errorShow(json["errormessage"]);
    } else {
      data = json;
      rehydrate();
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Adding cashouts
async function addCashout() {
  try {
    let playerName = document.getElementById("cashoutNamesList").value;
    let amount = document.getElementById("cashoutAmount").value;
    let method = document.getElementById("cashoutPaymentMethodsList").value;
    document.getElementById("cashoutAmount").value = "1.00";
    const response = await fetch(
      "/api/game/addCashout?name=" +
        gameName +
        "&playername=" +
        playerName +
        "&amount=" +
        amount +
        "&method=" +
        method
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      errorShow(json["errormessage"]);
    } else {
      data = json;
      rehydrate();
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Rename game
async function renameGame() {
  try {
    let renameGameNewName = document.getElementById("renameGameNewName").value;
    const response = await fetch(
      "/api/game/rename?oldname=" + gameName + "&newname=" + renameGameNewName
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      errorShow(json["errormessage"]);
    } else {
      games();
      paramList["game"] = json["name"];
      view();
    }
  } catch (error) {
    console.error(error.message);
  }
}

// Delete game
async function deleteGame() {
  try {
    const response = await fetch("/api/game/delete?name=" + gameName);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    if (json["error"] == true) {
      errorShow(json["errormessage"]);
    } else {
      games();
    }
  } catch (error) {
    console.error(error.message);
  }
}
