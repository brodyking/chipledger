<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {
    
    include_once "lib/chipledger/php/isloggedin.php";

    if (!isloggedin($config["database.location"])) {
        echo json_encode(array("error" => true, "errormessage" => "Not Authenticated"));
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["database.location"]);

        $session = random_int(0, 99999999999999);

        $sql = "SELECT * FROM users WHERE username=:usernameInput AND session=:sessionInput";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $session = filter_input(INPUT_COOKIE, 'session');
        $statement->bindValue(":sessionInput", $session, PDO::PARAM_STR);

        $statement->execute();

        $r = $statement->fetch(PDO::FETCH_ASSOC);

        $db = null;

       if (!$r) {
            echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
            exit();
        }

        echo json_encode($r);

    } catch (PDOException $e) {
        //echo $e;
        echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
        die();
    }

} else {
    echo json_encode(array("error" => true, "errormessage" => "Unknown Error"));
}