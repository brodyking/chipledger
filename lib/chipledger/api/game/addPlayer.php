<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_GET["name"]) && isset($_GET["playername"])) {

    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    if ($_GET["name"] == "" || $_GET["playername"] == "") {
        echo json_encode(array("error" => true, "errormessage" => "Name cannot be empty"));
        die();
    }


    try {

        $db = new PDO("sqlite:" . $config["database.location"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode

        $sql = "SELECT * FROM games WHERE name=:nameInput AND username=:usernameInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $name = filter_input(INPUT_GET, 'name');
        $statement->bindValue(":nameInput", $name, PDO::PARAM_STR);

        $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

        $r = $statement->fetch(PDO::FETCH_ASSOC); // Fetch as an associative array

        $db = null; // Close the database connection

        if (!$r) {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            exit();
        }

    } catch (PDOException $e) {
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        //echo "Error: " . $e->getMessage(); // Display a more user-friendly error
        die();
    }

    $data = json_decode($r["data"], true);

    if (in_array($_GET["playername"], $data["players"])) {
        echo json_encode(array("error" => true, "errormessage" => "Player already exists."));
        die();
    }


    array_push($data["players"], filter_input(INPUT_GET, "playername"));
    $data["totalPlayers"] += 1;

    if (isset($_GET["amount"]) && isset($_GET["method"])) {
        $amount = filter_input(INPUT_GET,"amount");
        $amount = (int) filter_var($amount, FILTER_SANITIZE_NUMBER_INT);
        $data["totalBuyins"] += $amount;
        $data["totalPot"] += $amount;
        $data["buyins"][filter_input(INPUT_GET,"playername")] = $amount;
        $data["methods"][filter_input(INPUT_GET,"method")."TotalPot"] += $amount;
        $data["methods"][filter_input(INPUT_GET,"method")."TotalBuyins"] += 1;
        $data["methods"][filter_input(INPUT_GET,"method")."TotalPlayers"] += 1;
    } else {
        $data["buyins"][filter_input(INPUT_GET, "playername")] = 0;
    }

    $data["cashouts"][filter_input(INPUT_GET, "playername")] = 0;

    array_push($data["totalHistory"], ["type" => "join", "message" => "<b>" . filter_input(INPUT_GET, "playername") . "</b> has joined the table!"]);

    array_push($data["totalHistory"], ["type" => "buyin", "method" => filter_input(INPUT_GET,"method"),"message" => "<b>" . filter_input(INPUT_GET, "playername") . "</b> bought in for <b>$" . $amount . "</b>"]);
    array_push($data["buyinsHistory"], ["name" => filter_input(INPUT_GET, "playername"), "value" => $amount, "method" => filter_input(INPUT_GET,"method"),]);

    $data = json_encode($data);

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $sql = "UPDATE games SET data = :dataInput WHERE (username=:usernameInput AND name=:nameInput)";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $name = filter_input(INPUT_GET, 'name');
        $statement->bindValue(":nameInput", $name, PDO::PARAM_STR);

        $statement->bindValue(":dataInput", $data, PDO::PARAM_STR);


        $success = $statement->execute();
        $db = null;

        if ($success) {
            echo $data;
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            die();
        }

    } catch (PDOException $e) {
        //echo $e;
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
    die();
}