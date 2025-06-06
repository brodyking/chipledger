<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_GET["name"]) && isset($_GET["playername"])) {

    include_once "scripts/isloggedin.php";

    if (!isloggedin($config["databaseLocation"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    if ($_GET["name"] == "" || $_GET["playername"] == "") {
        echo json_encode(array("error" => true, "errormessage" => "Name cannot be empty"));
        die();
    }


    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);
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

    if (isset($data["players"][filter_input(INPUT_GET, "playername")])) {
        echo json_encode(array("error" => true, "errormessage" => "Player already exists"));
        die();
    }

    array_push($data["players"], filter_input(INPUT_GET, "playername"));
    $data["totalPlayers"] += 1;

    $data = json_encode($data);

    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);

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