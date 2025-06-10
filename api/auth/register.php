<?php

if (isset($_GET["username"]) && isset($_GET["email"]) && isset($_GET["password"])) {

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $session = random_int(0, 999999999999999999);

        $sql = "INSERT INTO users (username,email,password,session) VALUES (:usernameInput,:emailInput,:passwordInput,:sessionInput);";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_GET, 'username');
        $username = strtolower($username);
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $email = filter_input(INPUT_GET, 'email');
        $statement->bindValue(":emailInput", $email, PDO::PARAM_STR);

        $password = filter_input(INPUT_GET, 'password');
        $statement->bindValue(":passwordInput", $password, PDO::PARAM_STR);

        $statement->bindValue(":sessionInput", $session, PDO::PARAM_INT);

        $success = $statement->execute();
        if ($success) {
            setcookie("session", $session, time() + (86400 * 30), "/");
            setcookie("username", $username, time() + (86400 * 30), "/");
            //echo "Registred.";
            echo json_encode(array("username" => $username, "session" => $session));
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            die();
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        //echo $e;
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
    die();
    //echo "error";
}