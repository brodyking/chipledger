<nav class="navbar navbar-expand-lg bg-primary p-0" data-bs-theme="dark" id="nav">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">
            <i class="bi bi-bank me-1"></i> Chipledger</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link
                    <?php if ($title == "Home")
                        echo "active"; ?>" aria-current="page" href="/"><i class="bi bi-house-door<?php if ($title == "Home")
                              echo "-fill"; ?> me-1"></i> Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link
                    <?php if ($title == "Games")
                        echo "active"; ?>" aria-current="page" href="/games"><i class="bi bi-suit-spade<?php if ($title == "Games")
                              echo "-fill"; ?> me-1"></i>
                        Games</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-person-circle me-1"></i> <?php echo $username; ?>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item text-white" href="/settings"><i class="bi bi-gear me-1"></i>
                                Settings</a>
                        </li>
                        <li><a class="dropdown-item text-white" href="/logout"><i class="bi bi-door-open me-1"></i>
                                Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>