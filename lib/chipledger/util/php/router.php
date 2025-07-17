<?php

// Chipledger Source © 2025 Brody King
//  https://github.com/brodyking/chipledger
//  https://chipledger.com

// Chipledger PHP Router :3
//  This file controls if the user is sent to the api, static content, or main app

// Variables used by the router (You cannot use these anywhere else in the PHP)
//  $request - The URL requested.
//  $config - Configuration found in config.json.
//  $isloggedin - Boolean that specifies if the user is logged in.
//  $username - The current user's username.
//  $routes - Possible routes.


// Gathering request data
$request = $_SERVER["REQUEST_URI"]; // Request data
// Removes extra "/" at the end of the request string if present.
if (strlen($request) > 1 && substr($request, -1) == "/") {
    $request = substr($request, 0, strlen($request) - 1);
}
// Removes any ? params in URL of request. They are still used by PHP, but it makes routing work with them.
if (str_contains($request, "?")) {
    $request = substr($request, 0, strpos($request, "?"));
}

// Loading configuration file
$config = json_decode(file_get_contents($dir."/lib/chipledger/config.json"), true); // Configuration data
$config["database.location"] = $dir . "/database/database.db"; // Set the database location. Used in API.

// Authentication
require_once $dir . "/lib/chipledger/util/php/isloggedin.php"; // Checks if user is logged in and authenticates their session ID. 
$isloggedin = isloggedin($config["database.location"]); // Is logged in bool. Use this to quickly check if user is logged i
if ($isloggedin) {
    $username = $_COOKIE["username"];  // Username variable used in lots of places.
} else {
    $username = ""; // Empty if no username
}

// Possible routes (Besides app routes that are dictated through JS, those are not listed here.)
$routes = [
    // Routes for API calls
        // Auth API calls
            "/api/auth/register" => ["api", null],
            "/api/auth/login" => ["api", null],
            "/api/auth/logout" => ["api", null],
        // Content API calls
            "/api/data/releaseNotes" => ["api", null],
            "/api/data/tutorial" => ["api", null],
        // Game API calls
            "/api/game/new" => ["api", null],
            "/api/game/delete" => ["api", null],
            "/api/game/list" => ["api", null],
            "/api/game/rename" => ["api", null],
            "/api/game/addPlayer" => ["api", null],
            "/api/game/addBuyin" => ["api", null],
            "/api/game/editBuyin" => ["api", null],
            "/api/game/addCashout" => ["api", null],
            "/api/game/editCashout" => ["api", null],
            "/api/game/get" => ["api", null],
        // User API calls
            "/api/user/get" => ["api", null],
            "/api/user/changePassword" => ["api", null],
            "/api/user/changeEmail" => ["api", null],
            "/api/user/delete" => ["api", null],
    // Routes for Sys
        "/sys" => ["sys", null],
    // Routes for Docs 
        "/docs" => ["docs", "index"],
        // Articles
            "/docs/about-this-project" => ["docs", "html"],
            "/docs/api" => ["docs", "html"],
            "/docs/javascript-and-rendering" => ["docs", "html"],
            "/docs/database" => ["docs", "html"],
            "/docs/file-structure" => ["docs", "html"],
    // Routes for Blog
        "/blog" => ["blog", "index"],
        // Posts
            "/blog/2025/07/02/v1.1-patches-and-more" => ["blog", "html"],
            "/blog/2025/07/14/v1.2-feature-update" => ["blog", "html"],
    // Routes for Donate
        "/donate" => ["donate", "index"],
    // Routes for Policy 
        "/policy" => ["policy", "index"],
        // Articles
            "/policy/tos" => ["policy", "html"],
            "/policy/cookies" => ["policy", "html"]

];


if (isset($routes[$request])) {
    $type = $routes[$request][0];
    $includeType = $routes[$request][1];
    switch ($type) {
        case "api":
            header(header: 'Content-type: text/plain; charset=utf-8'); // UTF-8 Charset
            require $dir . "/lib/chipledger/{$request}.php";
            break;
        case "sys":
            require $dir . "/lib/chipledger/sys/php/sys.php";
            break;
        default:
            // Documentation route
            require "{$dir}/lib/chipledger/static/html/{$type}/top.html"; // Top of page
            if ($includeType == "html") {
                include $dir . "/lib/chipledger/static/html{$request}.html";
            } else {
                include $dir . "/lib/chipledger/static/html{$request}/index.html";
            }
            require $dir . "/lib/chipledger/static/php/bottom.php"; // Bottom of page
            break;
    }
} else {
    require $dir . "/lib/chipledger/app/php/view.php";
}