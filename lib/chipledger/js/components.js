function showNav(pageSelected) {
  navLinks = [
    // 0 - Tab Name | 1 - Tab Displayed Name | 2 - Icon | 3 - Function when clicked | 4 - Is active | 5 - Show on desktop | 6 - Show on mobile top | 7 - Show on mobile dropdown 
    ["/", "Home", "bi-house-door", "home();", "ffffff8c",true,true,true],
    ["/games", "Games", "bi-suit-spade", "games();", "ffffff8c",true,true,true],
    ["/settings","Settings","bi bi-gear","settings();","ffffff8c",false,true,true],
    ["/tutorial","Tutorial","bi bi-mortarboard","tutorial();","ffffff8c",false,false,true]
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
                                <div class='navbar-toggler p-0 border-0'>
  `;
  navLinks.forEach((element) => {
    if (element[6] == true) {
      navHtml +=
      `<a type="button" class="bg-white btn btn-light p-0 ps-2 pe-2 align-middle text-secondary ms-1" aria-current="page" onclick="` +
      element[3] +
      `"><i class="align-middle text-secondary fs-5 bi ` +
      element[2] +
      `"></i></a>`;
    }
  });
  navHtml +=
    `
                        <li class="nav-item dropdown" style="list-style: none; display: inline-block;">
                            <a class="bg-white btn btn-light p-0 ps-2 pe-2 align-middle" type="button" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                              <i class="bi bi-list fs-5"></i>
                            </a>
                            <ul class="dropdown-menu bg-body dropdown-menu-end" id="navdropdown">`;
  navLinks.forEach((element) => {
    if (element[7] == true) {
    navHtml +=
      `<li><a class="dropdown-item text-body p-2 ps-3" onclick="` +
      element[3] +
      `"><i class="me-1 bi ` +
      element[2] +
      `"></i>` + 
      element[1] + 
      `</a></li>`;
    }
  });
  navHtml += `                  <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-body p-2 ps-3" href="/blog"><i class="bi bi-pencil me-1"></i>
                                        Blog</a>
                                </li>
                                <li><a class="dropdown-item text-body p-2 ps-3" href="/docs"><i class="bi bi-book me-1"></i>
                                        Docs</a></li>
                                <li><a class="dropdown-item text-body p-2 ps-3" href="/donate"><i class="bi bi-heart me-1"></i>
                                        Donate</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-body" onclick="window.location.reload(true);"><i class="bi bi-arrow-clockwise me-1"></i>
                                        Refresh</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-body" href="/api/auth/logout"><i class="bi bi-door-open me-1"></i>
                                        Logout</a></li>
                            </ul>
                        </li>
                                </div>
                            <div class="collapse navbar-collapse" id="navbarText">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
`;
  navLinks.forEach((element) => {
    if (element[5] == true) {
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
    }
  });
  navHtml +=
    `
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" style="color: #ffffff8c;">
                                <i class="bi bi-box me-1"></i> Resources
                            </a>
                            <ul class="dropdown-menu bg-body" id="navdropdown">
                                <li><a class="dropdown-item text-body" href="/blog"><i class="bi bi-pencil me-1"></i>
                                        Blog</a>
                                </li>
                                <li><a class="dropdown-item text-body" href="/docs"><i class="bi bi-book me-1"></i>
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
        </nav>`;
  document.getElementById("nav").innerHTML = navHtml;
  refreshColorScheme();
}
