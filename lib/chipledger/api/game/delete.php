<?php

if (isset($_GET["name"]) && isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {


    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        //echo $e;
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $session = random_int(0, 999999999999999999);

        $sql = "DELETE FROM games WHERE name=:nameInput AND username=:usernameInput;";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, var_name: 'username');
        $username = strtolower($username);
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $name = filter_input(INPUT_GET, 'name');
        $statement->bindValue(":nameInput", $name, PDO::PARAM_STR);

        $success = $statement->execute();
        if ($success) {
            echo json_encode(value: array("success" => true));
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
            die();
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        echo json_encode(value: array("error" => true, "errormessage" => "Unknown error"));
        die();
    }

} else {
    echo json_encode(value: array("error" => true, "errormessage" => "Unknown error"));
    //echo "error";
}