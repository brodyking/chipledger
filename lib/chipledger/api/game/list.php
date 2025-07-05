<?php
if (isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {



    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode

        $sql = "SELECT * FROM games WHERE username=:usernameInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

        $r = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetch as an associative array

        $db = null; // Close the database connection

        $json = [];

        if ($r) {
            foreach ($r as $game) {
                array_push($json, $game["name"]);
            }
            echo json_encode($json);
        } else {
            echo json_encode(array("error" => true, "waraningmessage" => "No games found."));
        }

    } catch (PDOException $e) {
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        //echo "Error: " . $e->getMessage(); // Display a more user-friendly error
        die();
    }
} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
}




?>