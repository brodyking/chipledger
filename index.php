<?php

// Chipledger Source © 2025 Brody King

// !!! DO NOT TOUCH THIS !!!
// Almost every aspect of this project uses these. Things will break.
$request = $_SERVER["REQUEST_URI"]; // Request data
$config = json_decode(file_get_contents("config.json"), true); // Configuration data
$config["databaseLocation"] = "database/database.db"; // Set the database location. Used in API.
require __DIR__ . "/scripts/isloggedin.php"; // Checks if user is logged in and authenticates their session ID. 
$isloggedin = isloggedin($config["databaseLocation"]); // Is logged in bool. Use this to quickly check if user is logged in.
if ($isloggedin) {
    $username = $_COOKIE["username"];  // Username variable used in lots of places.
} else {
    $username = "No logged in.";
}

// Set Routes
if ($isloggedin) {
    $pageRoutes = [
        // Routes available to only those who are logged in.
        "/" => "/pages/dash.php",
        "/404" => "/pages/404.php",
        "/login" => "/pages/dash.php",
        "/register" => "/pages/dash.php",
        "/logout" => "/api/{$config["version"]}/auth/logout.php",
        "/games" => "/pages/games.php",
        "/settings" => "/pages/settings.php",
        "/view" => "/pages/view.php"
    ];

    $apiRoutes = [
        # API Routes available to only those who are logged in.
        "/api/v1/auth/logout" => "/api/v1/auth/logout.php",
        "/api/v1/game/new" => "/api/v1/game/new.php",
        "/api/v1/game/delete" => "/api/v1/game/delete.php",
        "/api/v1/game/rename" => "/api/v1/game/rename.php",
        "/api/v1/game/addPlayer" => "/api/v1/game/addPlayer.php"
    ];

} else {
    //
    // > LOGGED OUT ROUTES
    //
    $pageRoutes = [
        # Routes available to only those logged out.
        "/" => "/pages/splash.php",
        "/404" => "/pages/404.php",
        "/login" => "/pages/login.php",
        "/register" => "/pages/register.php",
    ];

    # All API Routes
    $apiRoutes = [
        "/api/v1/auth/register" => "/api/v1/auth/register.php",
        "/api/v1/auth/login" => "/api/v1/auth/login.php"
    ];
}

// Removes extra "/" at the end of the request string if present.
if (strlen($request) > 1 && substr($request, -1) == "/") {
    $request = substr($request, 0, strlen($request) - 1);
}
// Removes any ? params in URL of request. They are still used by PHP, but it makes routing work with them.
if (str_contains($request, "?")) {
    $request = substr($request, 0, strpos($request, "?"));
}

if (substr($request, 0, 4) == "/api") {
    // API Routing
    header(header: 'Content-type: text/plain; charset=utf-8');
    if (isset($apiRoutes[$request])) {
        require __DIR__ . $apiRoutes[$request];
        return true;
    } else {
        echo json_encode(array("error" => "invalid request"), JSON_PRETTY_PRINT);
        return false;
    }
} else {
    // Page Routing
    if (isset($pageRoutes[$request])) {
        require __DIR__ . $pageRoutes[$request];
        return true;
    } else {
        require __DIR__ . $pageRoutes["/404"];
        return false;
    }
}