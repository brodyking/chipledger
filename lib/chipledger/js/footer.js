document.getElementById("footer").innerHTML =
  `<nav class="navbar fixed-bottom bg-body-tertiary p-1 border-0 ps-3 pe-3 footer">
    <div class="container-fluid p-0 text-secondary">
        <span class="me-auto">&copy; 2025 Brody King <span class="opacity-50">&middot;</span> <a class="text-secondary policylinks" href="https://github.com/brodyking/chipledger/releases">`+version+`</a> <span class="nomobile"><span class="opacity-50">&middot;</span>  <a class="text-secondary policylinks" href="/policy/tos">Terms</a> <span class="opacity-50">&middot;</span> <a class="text-secondary policylinks" href="/policy/cookies">Cookies</a></span></span>
        <div class="dropup-center dropup onlymobile me-3">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-paperclip"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item text-body" href="/policy/tos"><i class="bi bi-link-45deg me-1"></i> Terms of Service</a></li>
                <li><a class="dropdown-item text-body" href="/policy/cookies"><i class="bi bi-link-45deg me-1"></i>  Cookie Policy</a></li>
            </ul>
        </div>
        <div class="dropup-center dropup">      
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" id="themeswitcherIcon">
                <i class="bi bi-circle-half"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item text-warning" onclick="setTheme('light');"><i class="bi bi-brightness-high-fill"></i>
                        Light</a></li>
                <li><a class="dropdown-item" style="color: #874FF6" onclick="setTheme('dark');"><i class="bi bi-moon-stars-fill"></i>
                        Dark</a></li>
                <li class="nomobile"><hr class="dropdown-divider"></li>
                <li class="nomobile"><a class="dropdown-item text-danger" onclick="setColorscheme('red');"><i class="bi bi-palette-fill"></i>
                        Red</a></li>
                <li class="nomobile"><a class="dropdown-item text-warning" onclick="setColorscheme('orange');"><i class="bi bi-palette-fill"></i>
                        Orange</a></li>
                <li class="nomobile"><a class="dropdown-item text-success" onclick="setColorscheme('green');"><i class="bi bi-palette-fill"></i>
                        Green</a></li>
                <li class="nomobile"><a class="dropdown-item text-primary" onclick="setColorscheme('default');"><i class="bi bi-palette-fill"></i>
                        Default</a></li>
            </ul>
        </div>
    </div>
</nav>`;