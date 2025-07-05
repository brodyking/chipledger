function showNav(pageSelected) {
  navLinks = [
    // Tab Name | Tab Displayed Name | Icon | Function when clicked | Is active
    ["/", "Home", "bi-house-door", "home();", "ffffff8c"],
    ["/games", "Games", "bi-suit-spade", "games();", "ffffff8c"],
  ];

  // Icon will become filled when is active, and is marked as active for when drawing to screen.
  navLinks.forEach((element) => {
    if (element[0] == pageSelected) {
      element[2] = element[2] + "-fill";
      element[4] = "fff";
    }
  });

  navHtml = `<nav class="navbar fixed-top navbar-expand-lg bg-primary p-0" id="navbar">
                        <div class="container-fluid">
                            <a class="navbar-brand" onclick="home();" style="color: #fff;">
                                <i class="bi bi-bank me-1"></i> Chipledger</a>
                                <button class="navbar-toggler bg-white text-black btn btn-light p-1 ps-2 pe-2" type="button" data-bs-toggle="modal" data-bs-target="#mobilenavmodal">
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
    `
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" style="color: #ffffff8c;">
                                <i class="bi bi-box me-1"></i> Resources
                            </a>
                            <ul class="dropdown-menu bg-body" id="navdropdown">
                                <li><a class="dropdown-item text-body" href="/blog"><i class="bi bi-book me-1"></i>
                                        Blog</a>
                                </li>
                                <li><a class="dropdown-item text-body" href="/docs"><i class="bi bi-pencil me-1"></i>
                                        Docs</a></li>
                                <li><a class="dropdown-item text-body" href="/donate"><i class="bi bi-heart me-1"></i>
                                        Donate</a></li>
                            </ul>
                        </li>
        </ul>
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
        </nav>
        <!-- Mobile Navigation -->
        <div class="modal fade border" id="mobilenavmodal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-wide" style="height: -webkit-fill-available;">
                <div class="modal-content">
                    <div class="modal-header w-100">
                        <h1 class="modal-title fs-5 w-100">Navigation <a class="navbar-toggler rounded btn btn-sm bg-white text-black btn-light p-1 ps-2 pe-2 float-end" data-bs-dismiss="modal"><i class="bi bi-x"></i></a></h1>
                    </div>
                      <div class="modal-body">
                        `;

  navLinks.forEach((element) => {
    navHtml +=
      `<div class="mb-3"><a class="btn btn-lg btn-primary w-100" href="` +
      element[0] +
      `"><i class="align-middle bi ` +
      element[2] +
      ` me-1"></i> ` +
      element[1] +
      `</a></div>`;
  });

  navHtml += `
  <hr>
                        <div class="mb-3">
                          <a class="btn btn-lg btn-success w-100" href="/blog"><i class="bi bi-book me-1"></i>Blog</a>
                        </div>
                        <div class="mb-3">
                          <a class="btn btn-lg btn-success w-100" href="/docs"><i class="bi bi-book me-1"></i>Docs</a>
                        </div>
                          <div class="mb-3">
                          <a class="btn btn-lg btn-success w-100" href="/donate"><i class="bi bi-heart me-1"></i>Donate</a>
                        </div>
  <hr>
                        <div class="mb-3">
                          <a class="btn btn-lg btn-warning w-100" href="/settings"><i class="bi bi-gear me-1"></i>Settings</a>
                        </div>
                        <div class="mb-3">
                          <a class="btn btn-lg btn-warning w-100" href="/api/auth/logout"><i class="bi bi-door-open me-1"></i>Logout</a>
                        </div>
                      </div>
                </div>
            </div>
        </div>`;
  document.getElementById("nav").innerHTML = navHtml;
  refreshColorScheme();
}
