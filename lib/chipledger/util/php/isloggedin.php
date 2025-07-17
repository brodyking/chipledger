<?php
function isloggedin($dbpath)
{
    if (isset($_COOKIE["username"]) && isset($_COOKIE["session"])) {
        try {

            $db = new PDO("sqlite:" . $dbpath);
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
                return false;
            }

            return true;

        } catch (PDOException $e) {
            return false;
        }

    } else {
        return false;
    }
}