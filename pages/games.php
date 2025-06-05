<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "Games";

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

</head>

<body data-bs-theme="dark">
    <?php include "components/navigation.php"; ?>
    <main id="main">
        <?php include "components/alert.php"; ?>
        <div class="card">
            <h2 class="card-header">Games <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal"
                    class="btn btn-primary float-end"><i class="bi bi-plus"></i>
                    New Game</a>
            </h2>
            <div class="card-body">

                <table class="table w-100 table-striped border" style="font-size:1.15em;">
                    <?php


                    try {

                        $db = new PDO("sqlite:" . $config["databaseLocation"]);
                        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode
                    
                        $sql = "SELECT * FROM games WHERE username=:usernameInput";

                        $statement = $db->prepare($sql);

                        $username = filter_input(INPUT_COOKIE, 'username');
                        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

                        $statement->execute(); // <--- YOU WERE MISSING THIS LINE!
                    
                        $r = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetch as an associative array
                    
                        $db = null; // Close the database connection
                    
                        $table = "";

                        if ($r) {
                            foreach ($r as $game) {
                                $table = "<tr class='w-100'><td><a class='text-decoration-none' href='/view?game={$game["name"]}'>{$game['name']} <i class='bi bi-arrow-right-circle-fill'></i></a></td></tr>" . $table;
                            }
                            echo $table;
                        }

                    } catch (PDOException $e) {
                        Header("Location: /login?error=Unknown Error");
                        //echo "Error: " . $e->getMessage(); // Display a more user-friendly error
                        die();
                    }





                    ?>
                </table>

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

                    <form method="POST" action="/api/v1/game/new">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Game Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="name" value="<?php echo $username . "-" . date("m-d-Y");
                                ?>" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>