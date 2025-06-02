<?php

if (isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"])) {

    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);

        $session = random_int(0, 999999999999999999);

        $sql = "INSERT INTO users (username,email,password,session) VALUES (:usernameInput,:emailInput,:passwordInput,:sessionInput);";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_POST, 'username');
        $username = strtolower($username);
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $email = filter_input(INPUT_POST, 'email');
        $statement->bindValue(":emailInput", $email, PDO::PARAM_STR);

        $password = filter_input(INPUT_POST, 'password');
        $statement->bindValue(":passwordInput", $password, PDO::PARAM_STR);

        $statement->bindValue(":sessionInput", $session, PDO::PARAM_INT);

        $success = $statement->execute();
        if ($success) {
            setcookie("session", $session, time() + (86400 * 30), "/");
            setcookie("username", $username, time() + (86400 * 30), "/");
            //echo "Registred.";
            Header("Location: /?success=Account Created.");
        } else {
            Header("Location: /login?error=Unknown Error");
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        Header("Location: /login?error=Unknown Error");
        //echo $e;
        die();
    }

} else {
    Header("Location: /login?error=Unknown Error");
    //echo "error";
}