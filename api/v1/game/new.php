<?php

if (isset($_POST["name"]) && isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {

    include_once "scripts/isloggedin.php";

    if (!isloggedin($config["databaseLocation"])) {
        Header("Location: /login?error=Not Authenticated");
        //echo $e;
        die();
    }

    if ($_POST["name"] == "" || $_POST["name"] == null) {
        Header("Location: /games?error=Game name cannot be blank.");
        //echo $e;
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);

        $session = random_int(0, 999999999999999999);

        $sql = "INSERT INTO games (name,username,data) VALUES (:nameInput,:usernameInput,:dataInput);";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $username = strtolower($username);
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $name = filter_input(INPUT_POST, 'name');
        $statement->bindValue(":nameInput", $name, PDO::PARAM_STR);



        $data = [
            // List of individual players.
            "players" => [],
            // Array of players and their total buyins
            "buyins" => [],
            // Array of players and their total cashouts 
            "cashouts" => [],
            // Total values for the game, summed up.
            // Pot changes depending on buyins and cashouts.
            "totalPot" => 0,
            "totalCashouts" => 0,
            "totalBuyins" => 0,
            "totalPlayers" => 0,
            // Logs of just each action
            "buyinsHistory" => [],
            "cashoutsHistory" => [],
            "totalHistory" => [],
        ];
        $data = json_encode($data);
        $statement->bindValue(":dataInput", $data, PDO::PARAM_STR);

        $success = $statement->execute();
        if ($success) {
            Header("Location: /view?game={$name}&success=Game Created.");
        } else {
            Header("Location: /login?error=Unknown Error");
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        Header(header: "Location: /games?error=That name has already been taken by someone.");
        die();
    }

} else {
    Header("Location: /login?error=Unknown Error");
    //echo "error";
}