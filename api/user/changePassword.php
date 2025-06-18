<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_GET["newpassword"])) {
    try {


        if (!isloggedin($config["database.location"])) {
            echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
            die();
        }

        $db = new PDO("sqlite:" . $config["database.location"]);

        $sql = "UPDATE users SET password = :newPasswordInput WHERE username = :usernameInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $session = filter_input(INPUT_COOKIE, 'session');
        $oldpassword = filter_input(INPUT_GET, 'oldpassword');
        $newpassword = filter_input(INPUT_GET, 'newpassword');

        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);
        $statement->bindValue(":newPasswordInput", $newpassword, PDO::PARAM_STR);

        $success = $statement->execute();

        if ($success) {
            echo json_encode(array("success" => true));
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            die();
        }
        $db = null;

    } catch (PDOException $e) {
        //echo $e;
        echo $e;
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
}