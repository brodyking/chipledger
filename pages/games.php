<!DOCTYPE html>
<html>

<head>
    <?php

    $title = "Games";

    // Head, Tags, Mobile, Etc.
    include_once "components/dochead.php";

    ?>

</head>

<body data-bs-theme="dark">
    <?php include "components/navigation.php"; ?>
    <main id="main">
        <?php include "components/alert.php"; ?>
        <div class="card">
            <h2 class="card-header">Games <a href="#" data-bs-toggle="modal" data-bs-target="#newgamemodal"
                    class="btn btn-primary float-end"><i class="bi bi-plus"></i>
                    New Game</a>
            </h2>
            <div class="card-body">

            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade border" id="newgamemodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">New Game</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form method="POST" action="/api/v1/game/new">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Date <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="date"
                                    value="<?php echo date("m-d-Y"); ?>" readonly required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Participants  <span class="text-danger">*</span> <span class="text-secondary">(20 Max)</span></label>
                                <input type="number" class="form-control" name="participants" value="1" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Create</button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </main>
    <?php include "components/footer.php"; ?>
    <script src="/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
</body>

</html>