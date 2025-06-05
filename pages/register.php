<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "Register";

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

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
    <main>
        <div style="max-width:300px;" class="ms-auto mt-5 me-auto">
            <?php include_once "components/alert.php"; ?>
        </div>
        <h3 class="text-center mt-5">
            <img src="/assets/chipledger/img/logo.png" style="max-width:30px;"> Chipledger
        </h3>
        <div style="max-width:300px;" class="card ms-auto me-auto mt-5">
            <h5 class="card-header">Register</h5>
            <div class="card-body">
                <form method="POST" action="/api/v1/auth/register">
                    <div class="mb-3">
                        <label class="form-label">Username <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" name="username" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" name="email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Password <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" name="password" required>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>
                    <div class="mb-3">
                        <span>Already have an account? <a href="/login">Log in</a>.</span>
                    </div>
            </div>
            </form>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>