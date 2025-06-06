<?php

if (isset($_GET["name"]) && isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {

    include_once "scripts/isloggedin.php";

    if (!isloggedin($config["databaseLocation"])) {
        Header("Location: /login?error=Not Authenticated");
        //echo $e;
        die();
    }

    try {

        $db = new PDO("sqlite:" . $config["databaseLocation"]);

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
            Header("Location: /games?success=Game Deleted.");
        } else {
            Header("Location: /login?error=Unknown Error");
            //echo "error";
        }
        $db = null;

    } catch (PDOException $e) {
        Header("Location: /login?error=That name has already been taken by someone.");
        die();
    }

} else {
    Header("Location: /login?error=Unknown Error");
    //echo "error";
}