<?php

if (isset($_GET["username"]) && isset($_GET["password"])) {
    try {

        $db = new PDO("sqlite:" . $config["database.location"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode

        $sql = "SELECT * FROM users WHERE username=:usernameInput AND password=:passwordInput";

        $statement = $db->prepare($sql);

        $username = urldecode(filter_input(INPUT_GET, 'username'));
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $password = urldecode(filter_input(INPUT_GET, 'password'));
        $statement->bindValue(":passwordInput", $password, PDO::PARAM_STR);

        $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

        $r = $statement->fetch(PDO::FETCH_ASSOC); // Fetch as an associative array

        $db = null; // Close the database connection

        if (!$r) {
            echo json_encode(array("error" => true, "errormessage" => "Incorrerct Login Details"));
            exit();
        }

    } catch (PDOException $e) {
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        //echo "Error: " . $e->getMessage(); // Display a more user-friendly error
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $session = random_int(0, 99999999999999);

        $sql = "UPDATE users SET session = :sessionInput WHERE username=:usernameInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_GET, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $statement->bindValue(":sessionInput", $session, PDO::PARAM_INT);

        $success = $statement->execute();
        if ($success) {
            setcookie("session", $session, time() + (86400 * 30), "/");
            setcookie("username", $username, time() + (86400 * 30), "/");
            echo json_encode(array("username" => $username, "session" => $session));
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            die();
        }
        $db = null;

    } catch (PDOException $e) {
        //echo $e;
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
}