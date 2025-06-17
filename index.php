<?php

// Chipledger Source © 2025 Brody King

// Routing for all pages, (pre page loads)
$request = $_SERVER["REQUEST_URI"]; // Request data
$config = json_decode(file_get_contents("config.json"), true); // Configuration data
$config["database.location"] = "database/database.db"; // Set the database location. Used in API.

require_once __DIR__ . "/lib/chipledger/php/isloggedin.php"; // Checks if user is logged in and authenticates their session ID. 

$isloggedin = isloggedin($config["database.location"]); // Is logged in bool. Use this to quickly check if user is logged in.
if ($isloggedin) {
    $username = $_COOKIE["username"];  // Username variable used in lots of places.
} else {
    $username = "No logged in.";
}

// Routes for API calls
$apiRoutes = [
    // Auth API calls
    "/api/auth/register" => "/api/auth/register.php",
    "/api/auth/login" => "/api/auth/login.php",
    "/api/auth/logout" => "/api/auth/logout.php",

    // Content API calls
    "/api/data/releaseNotes" => "/api/data/releaseNotes.php",
    "/api/data/donate" => "/api/data/donate.php",

    // Game API calls
    "/api/game/new" => "/api/game/new.php",
    "/api/game/delete" => "/api/game/delete.php",
    "/api/game/list" => "/api/game/list.php",
    "/api/game/rename" => "/api/game/rename.php",
    "/api/game/addPlayer" => "/api/game/addPlayer.php",
    "/api/game/addBuyin" => "/api/game/addBuyin.php",
    "/api/game/addCashout" => "/api/game/addCashout.php",
    "/api/game/get" => "/api/game/get.php",

    // User API calls
    "/api/user/get" => "/api/user/get.php"
];

// Removes extra "/" at the end of the request string if present.
if (strlen($request) > 1 && substr($request, -1) == "/") {
    $request = substr($request, 0, strlen($request) - 1);
}
// Removes any ? params in URL of request. They are still used by PHP, but it makes routing work with them.
if (str_contains($request, "?")) {
    $request = substr($request, 0, strpos($request, "?"));
}

// API Routing
if (substr($request, 0, 4) == "/api") {
    header(header: 'Content-type: text/plain; charset=utf-8');
    if (isset($apiRoutes[$request])) {
        require __DIR__ . $apiRoutes[$request];
        return true;
    } else {
        echo json_encode(array("error" => "invalid request"), JSON_PRETTY_PRINT);
        return false;
    }
} else {
    // Page routing
    require __DIR__ . "/app.php";
    return true;
}