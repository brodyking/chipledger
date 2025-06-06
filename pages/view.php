<!DOCTYPE html>
<html>

<head>
    <?php

    if (isset($_GET["game"])) {
        $title = $_GET["game"];
    }

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    if (!isset($_GET["game"])) {
        Header("Location: /games?error=Invalid Game");
    } else {
        try {

            $db = new PDO("sqlite:" . $config["databaseLocation"]);
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode
    
            $sql = "SELECT * FROM games WHERE name=:nameInput AND username=:usernameInput";

            $statement = $db->prepare($sql);

            $username = filter_input(INPUT_COOKIE, 'username');
            $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

            $game = filter_input(INPUT_GET, 'game');
            $statement->bindValue(":nameInput", $game, PDO::PARAM_STR);

            $statement->execute(); // <--- YOU WERE MISSING THIS LINE!
    
            $r = $statement->fetch(PDO::FETCH_ASSOC); // Fetch as an associative array
    
            $db = null; // Close the database connection
    
            if (!$r) {
                Header("Location: /games?error=Invalid Game");
                die();
            }

        } catch (PDOException $e) {
            return false;
        }
    }

    $data = json_decode($r["data"]);

    echo "<script>let data = {$r['data']};let url = '{$config['url']}';let gameName= '{$game}';</script>";

    ?>

</head>

<body data-bs-theme="dark">
    <?php include "components/navigation.php"; ?>
    <!--

    TODO:

    - WORK IN ADDITIONAL PLAYERS, BUY INS, CASHOUTS
    - DISPLAY INFORMATION ON THIS PAGE
    - SHOW LIST OF GAMES ON GAMES PAGE.


-->
    <main id="main">
        <?php include "components/alert.php"; ?>
        <div class="alert alert-danger" id="jserrors">
            Please enable javascript or update your browser to use this page.
        </div>

        <h1 class="text-center mt-5 mb-5"><?php echo $r["name"]; ?></h1>

        <div class="d-grid gap-0 row-gap-2" style="margin: 0px!important;grid-template-columns: 1fr 1fr;">
            <div class="pt-0 p-1">
                <div class="card">
                    <h5 class="card-header">History</h5>
                    <div class="card-body">
                        <p id="history">id=history</p>
                    </div>
                </div>
            </div>
            <div class="pt-0 p-1">
                <div class="card mb-2">
                    <h5 class="card-header"><i class="bi bi-bank2"></i> Actions</h5>
                    <div class="card-body">
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newplayermodal"
                            class="btn btn-primary w-100 mb-3"><i class="bi bi-person-fill"></i>
                            Add Player</a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal"
                            class="btn btn-success w-100 mb-3"><i class="bi bi-wallet-fill"></i>
                            Buy In</a>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal"
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

                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="newplayerName" name="oldname" value="" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" onclick="addPlayer();" data-bs-dismiss="modal">Add
                            Player</button>
                    </div>


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

                    <form method="POST" action="/api/v1/game/rename">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Old Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="oldname" value="<?php echo $r["name"];
                                ?>" required readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">New Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="newname" value="<?php echo $username . "-" . date("m-d-Y");
                                ?>" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Rename</button>
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
                        You are about to delete <b><?php echo $r["name"]; ?></b>. You cannot undo this
                        action.
                    </div>
                    <div class="modal-footer">
                        <a href="/api/<?php echo $config["version"] ?>/game/delete?name=<?php echo $r["name"]; ?>"
                            class="btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/chipledger/js/view.js"></script>
</body>

</html>