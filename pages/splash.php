<!DOCTYPE html>
<html>

<head>
    <?php


    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

    <style>
        body {
            opacity: 0;
            animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    </style>


</head>

<body data-bs-theme="dark">
    <nav class="navbar fixed-top bg-body-tertiary p-1 border-0 ps-3 pe-3">
        <div class="container-fluid p-0 text-secondary">
            <span class="me-auto"><a href="/" class="text-decoration-none me-3">Chipledger</a></span>
            <span class="ms-auto"><a href="/login" class="text-decoration-none me-3">Login</a> <a href="/register"
                    class="text-decoration-none">Register</a></span>
        </div>
        </div>
    </nav>
    <main style="margin-bottom:100px;">
        <div style="max-width:800px;" class="ms-auto mt-5 me-auto">
            <?php include_once "components/alert.php"; ?>
        </div>


        <h1 class="mb-3 fw-semibold lh-1 text-center text-gradient splash-title-primary splash-title-mobile"
            style="margin-top:240px;font-size:60pt;">
            Tired of managing <span class="text-info">poker buyins</span>?
        </h1>


        <p class="text-center" style="font-size:20pt;margin-top:50px">
            We have a solution!
        </p>


        <p class="text-center" style="font-size:20pt;margin-top:180px;opacity:50%;">
            <i class="bi bi-arrow-down"></i> Keep Scrolling! <i class="bi bi-arrow-down"></i>
        </p>

        <h1 class="fw-semibold text-center" style="margin-top:180px!important;">Free to use</h1>
        <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
            We wont charge you a single penny for using this service.
        </p>

        <h1 class="fw-semibold text-center" style="margin-top:100px!important;">Be the house</h1>
        <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
            Keep track of buyins, cashouts, and participants with ease.
            Gone are the days of missing or extra money, writing down transactions in your notes, etc.
        </p>

        <h1 class="fw-semibold text-center" style="margin-top:100px!important;">Keep it Secure</h1>
        <p class="mt-4 text-center" style="max-width:600px;margin:auto;">
            We are open source! Meaning, you can host chipledger on your own server, disconnected from the internet.
            Prevent people from modifying
            values, stealing data, and more by taking matters into your own hands.
        </p>

        <div class="text-center" style="margin-top:100px!important;">
            <a href="/register" class="btn btn-primary me-1">Create an Account</a>
            <a href="/login" class="btn btn-secondary ms-1">Login</a>
        </div>

    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>