<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_GET["oldname"]) && isset($_GET["newname"])) {

    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $sql = "UPDATE games SET name = :newnameInput WHERE (username=:usernameInput AND name=:oldnameInput)";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $oldname = filter_input(INPUT_GET, "oldname");
        $statement->bindValue(":oldnameInput", $oldname, PDO::PARAM_STR);

        $newname = filter_input(INPUT_GET, "newname");
        $statement->bindValue(":newnameInput", $newname, PDO::PARAM_STR);

        $success = $statement->execute();
        $db = null;

        if ($success) {
            echo json_encode(array("name" => $newname));
            die();
        } else {
            echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
            die();
        }

    } catch (PDOException $e) {
        //echo $e;
        echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown error"));
}