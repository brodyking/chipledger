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

    <!--- Title --->
    <title>
        Chipledger
    </title>

    <!--- Meta Tags --->
    <meta name="title" content="Chip Ledger">
    <meta name="description" content="Manage your poker home game buy ins">
    <meta name="keywords" content="">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="30 days">
    <meta name="author" content="Brody King">

    <!--- PWA and Icons --->
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

</head>

<body data-bs-theme="dark">

    <!-- Application Skeleton -->
    <div id="nav"></div>
    <main id="main">
        <h2 class="mt-5 border-bottom border-1 pb-2">Please enable JavaScript to use Chipledger.</h2>
        <p>This app requires JavaScript to be used. If you believe you have JS enabled, you may have the following issues:
            <ol>
                <li>Your browser is outdated</li>
                <li>Your adblocker is blocking this page from rendering successfully.</li>
            </ol>
            Sorry for the inconvenience.
        </p>
    </main>
    <div id="footer"></div>


    <!-- Bootstrap and Themes -->
    <script src="/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="/lib/chipledger/js/themeswitcher.js"></script>

    <!-- Scripts included after auth -->
    <?php
    if (isloggedin($config["database.location"])) {
        echo "<script>const version = '{$config["site.version"]}';const username = '{$username}';const siteName = '{$config["site.name"]}';const d = new Date();const dateString = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear();".file_get_contents("lib/chipledger/js/view.js").file_get_contents("lib/chipledger/js/components.js").file_get_contents("lib/chipledger/js/pages.js")."</script>";
    } else {
        echo "<script>const version = '{$config["site.version"]}';".file_get_contents("lib/chipledger/js/splash.js")."</script>";
    }
    ?>

    <!-- Footer -->
    <script src="/lib/chipledger/js/footer.js"></script>

</body>

</html>