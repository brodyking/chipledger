function showNav(pageSelected) {
  navLinks = [
    // Tab Name | Tab Displayed Name | Icon | Function when clicked | Is active
    ["/home", "Home", "bi-house-door", "home();", "ffffff8c"],
    ["/games", "Games", "bi-suit-spade", "games();", "ffffff8c"],
    ["/donate", "Donate", "bi-heart", "donate();", "ffffff8c"],
  ];

  // Icon will become filled when is active, and is marked as active for when drawing to screen.
  navLinks.forEach((element) => {
    if (element[0] == pageSelected) {
      element[2] = element[2] + "-fill";
      element[4] = "fff";
    }
  });

  navHtml = `<nav class="navbar navbar-expand-lg bg-primary p-0" id="navbar">
                        <div class="container-fluid">
                            <a class="navbar-brand" onclick="home();" style="color: #fff;">
                                <i class="bi bi-bank me-1"></i> Chipledger</a>
                                <button class="navbar-toggler bg-white text-black btn btn-light p-1 ps-2 pe-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <i class="bi bi-list"></i>
                                </button>
                            <div class="collapse navbar-collapse" id="navbarText">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
`;
  navLinks.forEach((element) => {
    navHtml +=
      `<li class="nav-item"><a class="nav-link" style="color:#` +
      element[4] +
      `;" aria-current="page" onclick="` +
      element[3] +
      `"><i class="align-middle bi ` +
      element[2] +
      ` me-1"></i> ` +
      element[1] +
      `</a></li>`;
  });
  navHtml +=
    `</ul>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" style="color: #fff;">
                                <i class="bi bi-person-circle me-1"></i> ` +
    username +
    `
                            </a>
                            <ul class="dropdown-menu bg-body" id="navdropdown">
                                <li><a class="dropdown-item text-body" onclick="settings();"><i class="bi bi-gear me-1"></i>
                                        Settings</a>
                                </li>
                                <li><a class="dropdown-item text-body" href="/api/auth/logout"><i class="bi bi-door-open me-1"></i>
                                        Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`;
  document.getElementById("nav").innerHTML = navHtml;
  refreshColorScheme();
}
