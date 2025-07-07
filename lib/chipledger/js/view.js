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
        <div class="card mt-2 mb-2 me-1">
        <h5 class="card-header border-bottom-0">` +
        gameName + `<span class="text-secondary nomobile"> @`+username+`</span> 
        <a class="btn btn-warning btn-sm float-end pb-0 pt-0 ps-1 pe-1" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false"><i class="bi bi-chevron-expand"></i> <span class="nomobile">Toggle All</span></a>` +
        `<a class="btn btn-primary btn-sm float-end pb-0 pt-0 ps-1 pe-1 me-1" data-bs-toggle="modal" data-bs-target="#renamegamemodal"><i class="bi bi-pencil"></i> <span class="nomobile">Rename</span></a>` +
        `<a class="btn btn-danger btn-sm float-end pb-0 pt-0 ps-1 pe-1 me-1" data-bs-toggle="modal" data-bs-target="#deletegamemodal"><i class="bi bi-trash"></i> <span class="nomobile">Delete</span></a>` +
        `</h5></div>

        <div class="row g-2" style="margin: 0px!important;grid-template-columns: 1fr 1fr;">
            <div class="col-md ps-0 mt-0">
                <div class="card mb-1">
                    <h5 class="card-header"><i class="bi bi-person-lines-fill"></i> Players Overview <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#playersBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="playersBody">
                      <div class="card-body p-0">
                          <p id="players" class="mb-1">id=players</p>
                      </div>
                    </div>
                </div>
                <div class="card mb-1">
                    <h5 class="card-header"><i class="bi bi-cash"></i> Buyins <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#buyinsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="buyinsBody">
                      <div class="card-body p-0">
                          <p id="buyins" class="mb-1">id=buyins</p>
                      </div>
                    </div>
                </div>
                <div class="card mb-1">
                    <h5 class="card-header"><i class="bi bi-door-open-fill"></i> Cashouts <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#cashoutsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="cashoutsBody">
                      <div class="card-body p-0">
                          <p id="cashouts" class="mb-1">id=cashouts</p>
                      </div>
                    </div>
                </div>
                <div class="card mb-1">
                    <h5 class="card-header"><i class="bi bi-clock-fill"></i> History <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#historyBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="historyBody">
                      <div class="card-body p-0">
                          <p id="history" class="mb-1">id=history</p>
                      </div>
                    </div>
                </div>
            </div>
            <div class="col-md ps-0 mt-0">
                <div class="card mb-1">
                  <h5 class="card-header"><i class="bi bi-bank2"></i> Actions <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#actionsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                  <div class="collapse multi-collapse show" id="actionsBody">
                    <div class="card-body p-2">
                      <a href="#" data-bs-toggle="modal" data-bs-target="#newplayermodal"
                          class="btn btn-primary w-100 mb-2"><i class="bi bi-person-fill"></i>
                          Add Player</a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#newbuyinmodal"
                          class="btn btn-success w-100 mb-2"><i class="bi bi-wallet-fill"></i>
                          Buy In</a>
                      <a href="#" data-bs-toggle="modal" data-bs-target="#newcashoutmodal"
                          class="btn btn-warning w-100"><i class="bi bi-piggy-bank-fill"></i>
                          Cashout</a>
                      </div>
                  </div>
                </div>
                <div class="card mb-1">
                    <h5 class="card-header"><i class="bi bi-bar-chart-fill"></i> Stats <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#overviewBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="overviewBody">
                      <div class="card-body p-2">
                          <!-- Total Players -->
                          <div class="input-group mb-2">
                              <span class="input-group-text" style="background-color: #dee2e608!important"
                                  id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                              <input type="username" class="form-control" disabled="" value="id=totalPlayers"
                                  id="totalPlayers">
                          </div>
                          <!-- Total Pot -->
                          <div class="input-group mb-2">
                              <span class="input-group-text" style="background-color: #dee2e608!important"
                                  id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                              <input type="username" class="form-control" disabled="" value="id=totalPot" id="totalPot">
                          </div>
                          <!-- Total Cashouts -->
                          <div class="input-group mb-2">
                              <span class="input-group-text" style="background-color: #dee2e608!important"
                                  id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                              <input type="username" class="form-control" disabled="" value="id=totalCashouts"
                                  id="totalCashouts">
                          </div>
                          <!-- Total Buyins -->
                          <div class="input-group">
                              <span class="input-group-text" style="background-color: #dee2e608!important"
                                  id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                              <input type="username" class="form-control" disabled="" value="id=totalBuyins"
                                  id="totalBuyins">
                          </div>
                      </div>
                    </div>
                </div>

                  <div class="card">
                    <h5 class="card-header"><i class="bi bi-bar-chart-fill"></i> Advanced Stats <a class="btn btn-secondary btn-sm float-end pb-0 pt-0 ps-1 pe-1 btn-auto" data-bs-toggle="collapse" href="#paymentMethodStatsBody" role="button" aria-expanded="false"><i class="bi bi-chevron-expand"></i></a></h5>
                    <div class="collapse multi-collapse show" id="paymentMethodStatsBody">
                      <div class="card-body p-2">
                        <div class="accordion accordion-flush">

                          <!--- Cash totals --->
                          <div class="accordion-item mb-2 border-0">
                            <h2 class="accordion-header">
                              <button class="btn btn-success text-start w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#methodsCash" aria-expanded="false" aria-controls="flush-collapseOne">
                                Cash <i class="bi bi-chevron-expand text-end float-end"></i>
                              </button>
                            </h2>
                            <div id="methodsCash" class="accordion-collapse collapse p-2 pt-4 border border-success border-top-0 rounded-bottom bg-body-tertiary" style="margin-top: -15px;">
                              <!-- Total Players -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashTotalPlayers"
                                      id="cashTotalPlayers">
                              </div>
                              <!-- Total Pot -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashTotalPot" id="cashTotalPot">
                              </div>
                              <!-- Total Cashouts -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashTotalCashouts"
                                      id="cashTotalCashouts">
                              </div>
                              <!-- Total Buyins -->
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashTotalBuyins"
                                      id="cashTotalBuyins">
                              </div>
                            </div>
                          </div>

                          <!--- Venmo totals --->
                          <div class="accordion-item mb-2 border-0">
                            <h2 class="accordion-header">
                              <button class="btn btn-info text-start w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#methodsVenmo" aria-expanded="false" aria-controls="flush-collapseOne">
                                Venmo <i class="bi bi-chevron-expand text-end float-end"></i>
                              </button>
                            </h2>
                            <div id="methodsVenmo" class="accordion-collapse collapse p-2 pt-4 border border-info border-top-0 rounded-bottom bg-body-tertiary" style="margin-top: -15px;">
                              <!-- Total Players -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                                  <input type="username" class="form-control" disabled="" value="id=venmoTotalPlayers"
                                      id="venmoTotalPlayers">
                              </div>
                              <!-- Total Pot -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                                  <input type="username" class="form-control" disabled="" value="id=venmoTotalPot" id="venmoTotalPot">
                              </div>
                              <!-- Total Cashouts -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                                  <input type="username" class="form-control" disabled="" value="id=venmoTotalCashouts"
                                      id="venmoTotalCashouts">
                              </div>
                              <!-- Total Buyins -->
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                                  <input type="username" class="form-control" disabled="" value="id=venmoTotalBuyins"
                                      id="venmoTotalBuyins">
                              </div>
                            </div>
                          </div>

                          <!--- Zelle totals --->
                          <div class="accordion-item mb-2 border-0">
                            <h2 class="accordion-header">
                              <button class="btn btn-primary text-start w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#methodsZelle" aria-expanded="false" aria-controls="flush-collapseOne">
                                Zelle <i class="bi bi-chevron-expand text-end float-end"></i>
                              </button>
                            </h2>
                            <div id="methodsZelle" class="accordion-collapse collapse p-2 pt-4 border border-primary border-top-0 rounded-bottom bg-body-tertiary" style="margin-top: -15px;">
                              <!-- Total Players -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                                  <input type="username" class="form-control" disabled="" value="id=zelleTotalPlayers"
                                      id="zelleTotalPlayers">
                              </div>
                              <!-- Total Pot -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                                  <input type="username" class="form-control" disabled="" value="id=zelleTotalPot" id="zelleTotalPot">
                              </div>
                              <!-- Total Cashouts -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                                  <input type="username" class="form-control" disabled="" value="id=zelleTotalCashouts"
                                      id="zelleTotalCashouts">
                              </div>
                              <!-- Total Buyins -->
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                                  <input type="username" class="form-control" disabled="" value="id=zelleTotalBuyins"
                                      id="zelleTotalBuyins">
                              </div>
                            </div>
                          </div>

                          <!--- Cashapp totals --->
                          <div class="accordion-item mb-2 border-0">
                            <h2 class="accordion-header">
                              <button class="btn text-start btn-success w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#methodsCashapp" aria-expanded="false" aria-controls="flush-collapseOne">
                                Cash App <i class="bi bi-chevron-expand text-end float-end"></i>
                              </button>
                            </h2>
                            <div id="methodsCashapp" class="accordion-collapse collapse p-2 pt-4 border border-success border-top-0 rounded-bottom bg-body-tertiary" style="margin-top: -15px;">
                              <!-- Total Players -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashappTotalPlayers"
                                      id="cashappTotalPlayers">
                              </div>
                              <!-- Total Pot -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashappTotalPot" id="cashappTotalPot">
                              </div>
                              <!-- Total Cashouts -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashappTotalCashouts"
                                      id="cashappTotalCashouts">
                              </div>
                              <!-- Total Buyins -->
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                                  <input type="username" class="form-control" disabled="" value="id=cashappTotalBuyins"
                                      id="cashappTotalBuyins">
                              </div>
                            </div>
                          </div>

                          <!--- Other totals --->
                          <div class="accordion-item mb-2 border-0">
                            <h2 class="accordion-header">
                              <button class="btn btn-auto text-start w-100 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#methodsOther" aria-expanded="false" aria-controls="flush-collapseOne">
                                Other <i class="bi bi-chevron-expand text-end float-end"></i>
                              </button>
                            </h2>
                            <div id="methodsOther" class="accordion-collapse collapse p-2 pt-4 border border-top-0 rounded-bottom bg-body-tertiary" style="margin-top: -15px;">
                              <!-- Total Players -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Players</span>
                                  <input type="username" class="form-control" disabled="" value="id=otherTotalPlayers"
                                      id="otherTotalPlayers">
                              </div>
                              <!-- Total Pot -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Pot</span>
                                  <input type="username" class="form-control" disabled="" value="id=otherTotalPot" id="otherTotalPot">
                              </div>
                              <!-- Total Cashouts -->
                              <div class="input-group mb-2">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Cashouts</span>
                                  <input type="username" class="form-control" disabled="" value="id=otherTotalCashouts"
                                      id="otherTotalCashouts">
                              </div>
                              <!-- Total Buyins -->
                              <div class="input-group">
                                  <span class="input-group-text" style="background-color: #dee2e608!important"
                                      id="basic-addon1"><i class="bi bi-piggy-bank-fill me-1"></i> Total Buyins</span>
                                  <input type="username" class="form-control" disabled="" value="id=otherTotalBuyins"
                                      id="otherTotalBuyins">
                              </div>
                            </div>
                          </div>
                          
                        </div>
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
                                <input type="text" class="form-control" id="newplayerName" name="oldname" value="" required>
                            </div>
                            <div class="mb-3">
                              <label class="form-label">Inital Buyin Amount <span class="text-secondary">(Optional)</span></label>
                              <div class="input-group">
                                  <span class="input-group-text">$</span>
                                  <input type="number" class="form-control" id="newplayerBuyinAmount" name="amount"
                                      value="0" step="0.01" required>
                              </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Payment Method <span class="text-secondary">(Optional)</span></label>
                                <select class="form-select" id="newplayerBuyinPaymentMethodsList" name="paymentMethodsList" required>
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
  refreshColorScheme();
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
    let historyList = "<table class='m-0 table table-borderless'>";
    let backgroundColor = "";
    let typePretty = "";
    history.forEach((element) => {
      if (element["type"] == "buyin") {
        backgroundColor = "bg-success-subtle";
        typePretty = `<i class="bi bi-cash-stack"></i> Buyin`;
      } else if (element["type"] == "join") {
        backgroundColor = "bg-info-subtle";
        typePretty = `<i class="bi bi-person-fill-add"></i> Join`;
      } else if (element["type"] == "cashout") {
        typePretty = `<i class="bi bi-door-open-fill"></i> Cashout`;
        backgroundColor = "bg-warning-subtle";
      } else {
        typePretty = `<i class="bi bi-question-diamond-fill"></i> Misc`;
        backgroundColor = "";
      }
      historyList +=
        "<tr><td class='" +
        backgroundColor +
        " border-end'><b>" +
        typePretty +
        "</b></td><td>" +
        element["message"] +
        "</td></tr>";
    });
    document.getElementById("history").innerHTML = historyList + "</table>";
  } else {
    document.getElementById("history").innerHTML = "<div class='p-2 pt-4 pb-4 text-center'>No history.</div>";
  }

  // Overview tab
  if (players.length > 0) {
    let playerList =
      "<table class='table table-striped table-borderless m-0'><thead><td><b>Name</b></td><td><b>Buyins</b></td><td><b>Cashouts</b></td><td><b>Net Profit</b></td></thead>";
    players.forEach((element) => {
      let profit = data["cashouts"][element] - data["buyins"][element];
      if (profit < 0) {
        profit = "-$" + Math.abs(profit);
      } else {
        profit = "$" + Math.abs(profit);
      }
      playerList +=
        "<tr><td><b>" +
        element +
        "</b></td><td>$" +
        data["buyins"][element] +
        "</td><td>$" +
        data["cashouts"][element] +
        "</td><td>" +
        profit +
        "</td></tr>";
    });
    document.getElementById("players").innerHTML = playerList + "</table>";
  } else {
    document.getElementById("players").innerHTML = "<div class='p-2 pt-4 pb-4 text-center'>No participants.</div>";
  }

  // Payment Methods Stats
  let paymentMethods = ["cash","venmo","zelle","cashapp","other"];
  paymentMethods.forEach((element) => {
    document.getElementById(element+"TotalPlayers").value = data["methods"][element+"TotalPlayers"];
    document.getElementById(element+"TotalPot").value = "$" + data["methods"][element+"TotalPot"];
    document.getElementById(element+"TotalCashouts").value = "$" + data["methods"][element+"TotalCashouts"];
    document.getElementById(element+"TotalBuyins").value = "$" + data["methods"][element+"TotalBuyins"];
    console.log("hi");
  });

  // Buyins tab
  if (players.length > 0) {
    let buyinListArray = data["buyinsHistory"];
    let buyinList =
      "<table class='table m-0 table-striped table-borderless m-0'><thead><td><b>Name</b></td><td><b>Amount</b></td><td><b>Method</b></td></thead>";
    buyinListArray.forEach((element) => {
      buyinList +=
        "<tr><td><b>" +
        element["name"] +
        "</b></td><td>$" +
        element["value"] +
        "</td>" +
        "<td>" +
        methodPretty[element["method"]] +
        "</td></tr>";
    });
    document.getElementById("buyins").innerHTML = buyinList + "</table>";
  } else {
    document.getElementById("buyins").innerHTML = "<div class='p-2 pt-4 pb-4 text-center'>No buyins.</div>";
  }

  // Cashouts tab
  if (players.length > 0) {
    let buyinListArray = data["cashoutsHistory"];
    let buyinList =
      "<table class='table m-0 table-striped table-borderless'><thead><td><b>Name</b></td><td><b>Amount</b></td><td><b>Method</b></td></thead>";
    buyinListArray.forEach((element) => {
      buyinList +=
        "<tr><td><b>" +
        element["name"] +
        "</b></td><td>$" +
        element["value"] +
        "</td>" +
        "<td>" +
        methodPretty[element["method"]] +
        "</td></tr>";
    });
    document.getElementById("cashouts").innerHTML = buyinList + "</table>";
  } else {
    document.getElementById("cashouts").innerHTML = "<div class='p-2 pt-4 pb-4 text-center'>No cashouts.</div>";
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
    let amount = document.getElementById("newplayerBuyinAmount").value;
    let method = document.getElementById("newplayerBuyinPaymentMethodsList").value;
    document.getElementById("newplayerName").value = "";
    let fetchURL = "";
    if (amount > 0) {
      fetchURL = "/api/game/addPlayer?name=" + gameName + "&playername=" + playerName + "&amount=" + amount + "&method=" + method;
    } else {
      fetchURL = "/api/game/addPlayer?name=" + gameName + "&playername=" + playerName;
    }
    const response = await fetch(fetchURL);
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
