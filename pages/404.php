<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "404";

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

</head>

<body data-bs-theme="dark">
    <main>
        <div style="max-width:300px;" class="ms-auto mt-5 me-auto">
            <?php include_once "components/alert.php"; ?>
        </div>
        <h3 class="text-center mt-5">
            <img src="/assets/chipledger/img/logo.png" style="max-width:30px;"> Chipledger
        </h3>
        <div style="max-width:300px;" class="card ms-auto me-auto mt-5">
            <h5 class="card-header">Error 404</h5>
            <div class="card-body">
                Page not Found.
            </div>
        </div>
        <div class="text-center mt-5">
            <a href="/" class="btn btn-primary">Back to Saftey</a>

        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>