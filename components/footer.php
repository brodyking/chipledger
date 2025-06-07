<nav class="navbar fixed-bottom bg-body-tertiary p-1 border-0 ps-3 pe-3">
    <div class="container-fluid p-0 text-secondary">
        <span class="me-auto"><?php echo $config["version"]; ?> &middot; &copy; 2025 Brody King</span>
        <div class="dropup-center dropup ms-auto">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-circle-half"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" onclick="setTheme('light');"><i class="bi bi-brightness-high-fill"></i>
                        Light</a></li>
                <li><a class="dropdown-item" onclick="setTheme('dark');"><i class="bi bi-moon-stars-fill"></i>
                        Dark</a></li>
            </ul>
        </div>
    </div>
</nav>
<script src="/assets/chipledger/js/themeswitcher.js"></script>