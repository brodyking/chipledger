<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "Home";

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

</head>

<body data-bs-theme="dark">
    <?php include "components/navigation.php"; ?>
    <main id="main">
        <?php include "components/alert.php"; ?>
        <h1 class="text-center mt-5">Welcome back, <span class="text-info"><?php echo $username; ?></span>.</h1>
        <div class="card mt-5">
            <h5 class="card-header">Release Notes</h5>
            <div class="card-body">
                WILL IMPLEMENT LATER
            </div>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>