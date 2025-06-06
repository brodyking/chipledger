<?php

if (isset($_COOKIE["username"]) && isset($_COOKIE["session"]) && isset($_POST["oldname"]) && isset($_POST["newname"])) {

    include_once "scripts/isloggedin.php";

    if (!isloggedin($config["databaseLocation"])) {
        Header("Location: /login?error=Not Authenticated");
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);

        $sql = "UPDATE games SET name = :newnameInput WHERE (username=:usernameInput AND name=:oldnameInput)";

        $statement = $db->prepare($sql);

        $username = filter_input(INPUT_COOKIE, 'username');
        $statement->bindValue(":usernameInput", $username, PDO::PARAM_STR);

        $oldname = filter_input(INPUT_POST, "oldname");
        $statement->bindValue(":oldnameInput", $oldname, PDO::PARAM_STR);

        $newname = filter_input(INPUT_POST, "newname");
        $statement->bindValue(":newnameInput", $newname, PDO::PARAM_STR);

        $success = $statement->execute();
        $db = null;

        if ($success) {
            Header("Location: /view?game={$newname}");
        } else {
            Header("Location: /games?error=Unknown Error");
        }

    } catch (PDOException $e) {
        //echo $e;
        Header("Location: /games?error=Unknown Error");
        die();
    }

} else {
    Header("Location: /login?error=Unknown Error");
}