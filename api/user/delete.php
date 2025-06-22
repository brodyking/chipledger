<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {
    try {


        if (!isloggedin($config["database.location"])) {
            echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
            die();
        }

        $db = new PDO("sqlite:" . $config["database.location"]);

        $sql = "DELETE FROM users WHERE username=:usernameInput AND session=:sessionInput;";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $session = filter_input(INPUT_COOKIE, 'session');

        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);
        $statement->bindValue(":sessionInput", $session, PDO::PARAM_STR);

        $success = $statement->execute();

        if ($success) {
            try {

                $db = new PDO("sqlite:" . $config["database.location"]);

                $sql = "DELETE FROM games WHERE username=:usernameInput;";

                $statement = $db->prepare($sql);

                $username = filter_input(INPUT_COOKIE, 'username');
                $session = filter_input(INPUT_COOKIE, 'session');

                $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

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