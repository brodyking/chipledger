<!DOCTYPE html>
<html>

<head>

    <!--
     
    Chipledger Source © 2025 Brody King
    https://github.com/brodyking/chipledger
    https://chipledger.com

    -->

    <!--- Styles --->
    <link href="/lib/bootswatch-5/dist/lumen/bootstrap.min.css" rel="stylesheet">
    <link href="/lib/bootstrap/icons/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="/lib/chipledger/util/css/main.css" rel="stylesheet">

    <!--- Title --->
    <title>
        Chipledger
    </title>

    <!--- Meta Tags --->
    <meta name="title" content="Chipledger">
    <meta name="description" content="Manage your poker and blackjack home game buy ins">
    <meta name="keywords" content="">
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="30 days">
    <meta name="author" content="Brody King">

    <!--- PWA and Icons --->
    <link rel="manifest" href="/lib/chipledger/util/manifest.json" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="/lib/chipledger/util/img/logo.png">
    <link href="/lib/chipledger/util/img/logo-mobile.png" rel="apple-touch-icon" sizes="180x180">
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
    <script src="/lib/chipledger/util/js/themeswitcher.js"></script>

    <!-- Site Version included after auth -->
    <?php
        echo "<script>const version = '{$config["site.version"]}'</script>";
    ?>


    <!-- App specific scripts -->
    <?php 
        if (isloggedin($config["database.location"])) {
            $paths = [
                "<script>const username = '{$username}';const siteName = '{$config["site.name"]}';const d = new Date();const dateString = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear();</script>",
                "<script src='/lib/chipledger/app/js/view.js'></script>",
                "<script src='/lib/chipledger/app/js/components.js'></script>",
                "<script src='/lib/chipledger/app/js/pages.js'></script>"
            ];
            foreach ($paths as $path) {
                echo $path . "\n    ";
            }
        } else {
            echo "<script src='/lib/chipledger/app/js/splash.js'></script>\n";
        }
    ?>

    <!-- Footer -->
    <script src="/lib/chipledger/util/js/footer.js"></script>

</body>

</html>