<?php

if (isset($_GET["name"]) && isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {

    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        //echo $e;
        die();
    }

    if ($_GET["name"] == "" || $_GET["name"] == null) {
        echo json_encode(array("error" => true, "errormessage" => "Game name cannot be blank."));
        //echo $e;
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $session = random_int(0, 999999999999999999);

        $sql = "INSERT INTO games (name,username,data) VALUES (:nameInput,:usernameInput,:dataInput);";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $username = strtolower($username);
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $name = filter_input(INPUT_GET, 'name');
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
            echo json_encode(array("name" => $name));
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
        }
        $db = null;
        die();

    } catch (PDOException $e) {
        echo json_encode(array("error" => true, "errormessage" => "That name is already in use."));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
    //echo "error";
}