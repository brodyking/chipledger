<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "View";

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
        <div class="btn-group w-100 mb-4" role="group" aria-label="Basic example">
            <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal" class="btn btn-primary"><i
                    class="bi bi-plus"></i>
                Participant</a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal" class="btn btn-success"><i
                    class="bi bi-plus"></i>
                Buy In</a>
            <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal" class="btn btn-warning"><i
                    class="bi bi-plus"></i>
                Cashout</a>

        </div>

        <div class="card">
            <h4 class="card-header"><?php echo $r["name"]; ?>
            </h4>
            <div class="card-body">

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade border" id="newgamemodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">New Game</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>



                </div>
            </div>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>