<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "Login";

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
            <h5 class="card-header">Login</h5>
            <div class="card-body">
                <form method="POST" action="/api/v1/auth/login">
                    <div class="mb-3">
                        <label class="form-label">Username <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="username" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" name="password" required>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                    <div class="mb-3">
                        <span>Dont have an account? <a href="/register">Register</a>.</span>
                    </div>
                </form>
            </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>