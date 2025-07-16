<!DOCTYPE html>
<html>

<head>
    <!---


    Project created and maintained by Brody King.

    https://github.com/brodyking/chipledger/
    https://benadryl.dev

    <3 for supporting this project.


    --->
    <!--- Styles --->
    <link href="/lib/bootswatch-5/dist/lumen/bootstrap.min.css" rel="stylesheet">
    <link href="/lib/bootstrap/icons/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="/lib/chipledger/css/main.css" rel="stylesheet">
    <link href="/lib/chipledger/css/docs.css" rel="stylesheet">

    <!--- Title --->
    <title>
        Chipledger Sys 
    </title>


    <!--- PWA and Icons --->
    <link rel="manifest" href="/manifest.json" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="/lib/chipledger/img/logo.png">
    <link href="/lib/chipledger/img/logo-mobile.png" rel="apple-touch-icon" sizes="180x180">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Pouchtrack">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="theme-color" content="#158CBA">
    
    <style>
        main {
            padding-top: 100    px !important;
            ;
        }
    </style>

</head>

<body data-bs-theme="dark">
    <nav class="navbar fixed-top navbar-expand-lg p-0 bg-primary" id="navbar">
        <div class="container-fluid">
            <span class="navbar-brand text-body-tertiary">
                <a href="/" class="text-white text-decoration-none"><i class="bi bi-bank me-1"></i> Chipledger</a> / <a href="/sys"
                    class="text-white text-decoration-none">Sys</a>
            </span>
             <a class="navbar-toggler bg-white text-black btn btn-light p-1 ps-2 pe-2" type="button" href="/">
                <i class="bi bi-arrow-left-short text-secondary"></i>
            </a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" style="color:#fff;" aria-current="page"
                    href="https://github.com/brodyking/chipledger/"><i
                    class="align-middle bi bi-github me-1"></i></a></li>
                    <li class="nav-item"><a class="nav-link" style="color:#fff;" aria-current="page"
                    href="https://benadryl.dev"><i class="align-middle bi bi-capsule me-1"></i></a></li>
                </ul>
            </div>
        </div>
    </nav>
    <main id="main">

    <?php

        function showLogin() {
            echo '<form style="max-width:300px;margin:auto;margin-top:100px;" action="/sys" method="POST">
                        <div class="mb-3">
                            <label class="form-label">Password <span class="text-danger">*</span></label>
                            <input type="password" onclick="" class="form-control" name="sysPassword" id="loginPasswordInput" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </form> 
            ';
        }

        function showAdmin() {
            global $config;
            $users = "";
            $games = "";

            try {
                $db = new PDO("sqlite:" . $config["database.location"]);
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode
                $sql = "SELECT * FROM users";
                $statement = $db->prepare($sql);
                $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

                $r = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetch as an associative array

                $db = null; // Close the database connection

                foreach ($r as $user) {
                    $users = $users . "<tr><td>{$user["username"]}</td><td>{$user["email"]}</td><td>{$user["joindate"]}</tr>";
                }

            } catch (PDOException $e) {
                echo $e;
            }

            try {
                $db = new PDO("sqlite:" . $config["database.location"]);
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Good practice to set error mode
                $sql = "SELECT * FROM games";
                $statement = $db->prepare($sql);
                $statement->execute(); // <--- YOU WERE MISSING THIS LINE!

                $r = $statement->fetchAll(PDO::FETCH_ASSOC); // Fetch as an associative array

                $db = null; // Close the database connection

                foreach ($r as $game) {
                    $games = $games . "<tr><td>{$game["name"]}</td><td>{$game["username"]}</td><td style='overflow:hidden;'><input type='text' class='form-control' value='{$game["data"]}' readonly></tr>";
                }

            } catch (PDOException $e) {
                echo $e;
            }

            echo '
            <div class="card" style="margin-top:50px">
                <h5 class="card-header">
                    Users
                </h5>
                <div class="card-body">
                    <table class="table table-striped">
                    <thead>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Joined</td>
                    </thead>
                    <tbody>
                    '.$users.'
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="card" style="margin-top:50px">
                <h5 class="card-header">
                    Games
                </h5>
                <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <td>Name</td>
                            <td>Username</td>
                            <td>Data</td>
                        </thead>
                        <tbody>
                            '.$games.'
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <a href="?logout" class="btn btn-primary mt-3">Logout</a>
            ';
        }

        if (isset($_GET["logout"])) {
            unset($_COOKIE['sysPassword']); 
            setcookie('sysPassword', '', -1, '/');  
            Header("Location: /sys");
        }

        if (isset($_POST["sysPassword"])) {
            if (isset($_POST["sysPassword"]) == $config["sys.password"]) {
                setcookie("sysPassword",$_POST["sysPassword"],time() + (86400 * 30),"/");
            }
        }

        if ($config["sys.enabled"] != true) {
            echo "Sys Disabled";
        } else if (!isset($_COOKIE["sysPassword"])) {
            showLogin();
        } else if ($_COOKIE["sysPassword"] != $config["sys.password"]) {
            showLogin();
        } else {
            showAdmin();
        }

    ?>

    </main>
<div id="footer"></div>

<!-- Bootstrap and Themes -->
<script src="/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="/lib/chipledger/js/themeswitcher.js"></script>

<script>const version = 'v1.2';</script>
<!-- Footer -->
<script src="/lib/chipledger/js/footer.js"></script>
<script>refreshColorScheme();</script>

</body>

</html>