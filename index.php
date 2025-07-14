<?php

// Chipledger Source © 2025 Brody King

// Routing for all pages, (pre page loads)
$request = $_SERVER["REQUEST_URI"]; // Request data
$config = json_decode(file_get_contents("config.json"), true); // Configuration data
$config["database.location"] = __DIR__ . "/database/database.db"; // Set the database location. Used in API.

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
    "/api/auth/register" => "/lib/chipledger/api/auth/register.php",
    "/api/auth/login" => "/lib/chipledger/api/auth/login.php",
    "/api/auth/logout" => "/lib/chipledger/api/auth/logout.php",

    // Content API calls
    "/api/data/releaseNotes" => "/lib/chipledger/api/data/releaseNotes.php",
    "/api/data/tutorial" => "/lib/chipledger/api/data/tutorial.php",

    // Game API calls
    "/api/game/new" => "/lib/chipledger/api/game/new.php",
    "/api/game/delete" => "/lib/chipledger/api/game/delete.php",
    "/api/game/list" => "/lib/chipledger/api/game/list.php",
    "/api/game/rename" => "/lib/chipledger/api/game/rename.php",
    "/api/game/addPlayer" => "/lib/chipledger/api/game/addPlayer.php",
    "/api/game/addBuyin" => "/lib/chipledger/api/game/addBuyin.php",
    "/api/game/editBuyin" => "/lib/chipledger/api/game/editBuyin.php",
    "/api/game/addCashout" => "/lib/chipledger/api/game/addCashout.php",
    "/api/game/editCashout" => "/lib/chipledger/api/game/editCashout.php",
    "/api/game/get" => "/lib/chipledger/api/game/get.php",

    // User API calls
    "/api/user/get" => "/lib/chipledger/api/user/get.php",
    "/api/user/changePassword" => "/lib/chipledger/api/user/changePassword.php",
    "/api/user/changeEmail" => "/lib/chipledger/api/user/changeEmail.php",
    "/api/user/delete" => "/lib/chipledger/api/user/delete.php"
];

// Routes for Docs
$docRoutes = [
    "/docs" => "/lib/chipledger/static/docs/index.html",

    // Articles
    "/docs/about-this-project" => "/lib/chipledger/static/docs/about-this-project.html",
    "/docs/api" => "/lib/chipledger/static/docs/api.html",
    "/docs/javascript-and-rendering" => "/lib/chipledger/static/docs/javascript-and-rendering.html",
    "/docs/database" => "/lib/chipledger/static/docs/database.html",
    "/docs/file-structure" => "/lib/chipledger/static/docs/file-structure.html"
];

// Routes for Blog
$blogRoutes = [
    "/blog" => "/lib/chipledger/static/blog/index.html",

    // Posts
    "/blog/2025/07/02/v1.1-patches-and-more" => "/lib/chipledger/static/blog/2025/07/02/v1.1-patches-and-more.html"
];

// Routes for Donate
$donateRoutes = [
    "/donate" => "/lib/chipledger/static/donate/index.html"
];

// Routes for Policy 
$policyRoutes = [
    "/policy" => "/lib/chipledger/static/policy/index.html",

    // Articles
    "/policy/tos" => "/lib/chipledger/static/policy/tos.html",
    "/policy/cookies" => "/lib/chipledger/static/policy/cookies.html",
];

// Removes extra "/" at the end of the request string if present.
if (strlen($request) > 1 && substr($request, -1) == "/") {
    $request = substr($request, 0, strlen($request) - 1);
}
// Removes any ? params in URL of request. They are still used by PHP, but it makes routing work with them.
if (str_contains($request, "?")) {
    $request = substr($request, 0, strpos($request, "?"));
}

$route = "js";
if (substr($request, 0, 5) == "/docs") {
    $route = "docs";
} else if (substr($request, 0, 7) == "/donate") {
    $route = "donate";
} else if (substr($request, 0, 5) == "/blog") {
    $route = "blog";
} else if (substr($request, 0, 4) == "/api") {
    $route = "api";
}  else if (substr($request, 0, 7) == "/policy") {
    $route = "policy";
}

switch ($route) {
    case "docs":
        // Documentation route
        require __DIR__ . "/lib/chipledger/static/docs/top.php"; // Top of page
        // Page content
        if (isset($docRoutes[$request])) {
            include __DIR__ . $docRoutes[$request];
        } else {
            include __DIR__ . "/lib/chipledger/static/docs/404.html";
        }
        require __DIR__ . "/lib/chipledger/static/docs/bottom.php"; // Bottom of page
        break;
    case "policy":
        // Documentation route
        require __DIR__ . "/lib/chipledger/static/policy/top.php"; // Top of page
        // Page content
        if (isset($policyRoutes[$request])) {
            include __DIR__ . $policyRoutes[$request];
        } else {
            include __DIR__ . "/lib/chipledger/static/policy/404.html";
        }
        require __DIR__ . "/lib/chipledger/static/policy/bottom.php"; // Bottom of page
        break;
    case "donate":
        // Donation route
        require __DIR__ . "/lib/chipledger/static/donate/top.php"; // Top of page
        // Page content
        if (isset($donateRoutes[$request])) {
            include __DIR__ . $donateRoutes[$request];
        } else {
            include __DIR__ . "/lib/chipledger/static/donate/404.html";
        }
        require __DIR__ . "/lib/chipledger/static/donate/bottom.php"; // Bottom of page
        break;
    case "blog":
        // Blog route
        require __DIR__ . "/lib/chipledger/static/blog/top.php"; // Top of page
        // Page content
        if (isset($blogRoutes[$request])) {
            include __DIR__ . $blogRoutes[$request];
        } else {
            include __DIR__ . "/lib/chipledger/static/blog/404.html";
        }
        require __DIR__ . "/lib/chipledger/static/docs/bottom.php"; // Bottom of page
        break;
    case "api":
        // API route
        header(header: 'Content-type: text/plain; charset=utf-8'); // UTF-8 Charset
        // API Content
        if (isset($apiRoutes[$request])) {
            require __DIR__ . $apiRoutes[$request];
        } else {
            echo json_encode(array("error" => "invalid request"), JSON_PRETTY_PRINT);
        }
        break;
    default:
        // App
        // This has the skeleton for the app, and includes the javascript.
        require __DIR__ . "/app.php";
        break;
}
