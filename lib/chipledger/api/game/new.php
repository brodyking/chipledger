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
        $data["methods"] = [
            // Cash totals
            "cashTotalPot" => 0,
            "cashTotalBuyins" => 0,
            "cashTotalCashouts" => 0,
            // Venmo totals
            "venmoTotalPot" => 0,
            "venmoTotalBuyins" => 0,
            "venmoTotalCashouts" => 0,
            // Zelle totals
            "zelleTotalPot" => 0,
            "zelleTotalBuyins" => 0,
            "zelleTotalCashouts" => 0,
            // Cashapp totals
            "cashappTotalPot" => 0,
            "cashappTotalBuyins" => 0,
            "cashappTotalCashouts" => 0,
            // Other totals
            "otherTotalPot" => 0,
            "otherTotalBuyins" => 0,
            "otherTotalCashouts" => 0,
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