<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_GET["name"]) && isset($_GET["playername"]) && isset($_GET["amount"]) && isset($_GET["method"]) && isset($_GET["buyinId"])) {

    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    if ($_GET["playername"] == "" || $_GET["playername"] == "" || $_GET["playername"] == "disabled") {
        echo json_encode(array("error" => true, "errormessage" => "You must select a valid player."));
        die();
    }

    if ($_GET["amount"] <= 0) {
        echo json_encode(array("error" => true, "errormessage" => "You must buy in for a positive amount."));
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


    if (!in_array($_GET["playername"], $data["players"])) {
        echo json_encode(array("error" => true, "errormessage" => "Player does not exist."));
        die();
    }

    $oldAmount = $data["buyinsHistory"][$_GET["buyinId"]]["value"];
    $oldMethod = $data["buyinsHistory"][$_GET["buyinId"]]["method"];

    // Remove old amounts
    $data["totalBuyins"] -= $oldAmount;
    $data["totalPot"] -= $oldAmount;
    $data["methods"][$oldMethod."TotalPot"] -= $oldAmount;
    $data["methods"][$oldMethod."TotalBuyins"] -= $oldAmount;
    $data["buyins"][filter_input(INPUT_GET, "playername")] -= $oldAmount;

    $amount = filter_input(INPUT_GET,"amount");
    $data["totalBuyins"] += $amount;
    $data["totalPot"] += $amount;
    $data["buyins"][filter_input(INPUT_GET, "playername")] += $amount;
    $data["methods"][filter_input(INPUT_GET,"method")."TotalPot"] += $amount;
    $data["methods"][filter_input(INPUT_GET,"method")."TotalBuyins"] += $amount;

    array_push($data["totalHistory"], ["type" => "edit", "method" => filter_input(INPUT_GET,"method"),"message" => "<b>" . filter_input(INPUT_GET, "playername") . "</b>'s buyin was changed from <b>$" . $oldAmount . "</b> with <b>".$oldMethod."</b> to <b>$" . $amount . "</b> with <b>".filter_input(INPUT_GET,"method")."</b>"]);
    $data["buyinsHistory"][$_GET["buyinId"]] = ["name" => filter_input(INPUT_GET, "playername"), "value" => $amount, "method" => filter_input(INPUT_GET,"method")];

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