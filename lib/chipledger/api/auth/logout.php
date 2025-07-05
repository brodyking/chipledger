<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {
    try {

        $db = new PDO("sqlite:" . $config["database.location"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode

        $sql = "SELECT * FROM users WHERE username=:usernameInput AND session=:sessionInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $session = filter_input(INPUT_COOKIE, 'session');
        $statement->bindValue(":sessionInput", $session, PDO::PARAM_STR);

        $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

        $r = $statement->fetch(PDO::FETCH_ASSOC); // Fetch as an associative array

        $db = null; // Close the database connection

        if (!$r) {
            Header("Location: /");
            //echo "invalid creds";
            exit();
        }

    } catch (PDOException $e) {
        Header("Location: /");
        //echo "Error: " . $e->getMessage(); // Display a more user-friendly error
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $session = random_int(0, 999999999999999999);

        $sql = "UPDATE users SET session = :sessionInput WHERE username=:usernameInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $statement->bindValue(":sessionInput", $session, PDO::PARAM_INT);

        $success = $statement->execute();
        if ($success) {
            Header("Location: /");
            //echo "Cookies unset.";
        } else {
            Header("Location: /");
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        Header("Location: /");
        //echo $e;
        die();
    }

} else {
    Header("Location: /");
    //echo "error";
}