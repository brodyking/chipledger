function saveTheme(theme) {
  localStorage.setItem("themeOption", theme);
}

function loadTheme(theme) {
  document.body.setAttribute("data-bs-theme", theme);
  let autobtns = document.querySelectorAll(".btn-auto");
  let mobilegamenav = document.querySelector("#mobile-game-nav");
  let mobilenavmodal = document.querySelector("#mobilenavmodalbody");
  let themeswitcherIcon = document.querySelector("#themeswitcherIcon");
  if (theme == "dark") {
    // btn-auto colors
    autobtns.forEach((element) => {
      element.classList.remove("btn-secondary");
      element.classList.add("btn-dark");
    });
    // mobile game nav
    if (mobilegamenav !== null) {
      mobilegamenav.classList.remove("mobile-game-nav-light");
      mobilegamenav.classList.add("mobile-game-nav-dark");
    }
    // icon changing depending on theme
    if (themeswitcherIcon !== null) {
      themeswitcherIcon.innerHTML = `<i class="bi bi-moon-stars-fill"></i>`;
    }
    // mobile global nav
    if (mobilenavmodal !== null) {
      mobilenavmodal.classList.remove("mobile-global-nav-light");
      mobilenavmodal.classList.add("mobile-global-nav-dark");
    }
  } else if (theme == "light") {
    // btn-auto colors
    autobtns.forEach((element) => {
      element.classList.remove("btn-dark");
      element.classList.add("btn-secondary");
    });
    // mobile game nav
    if (mobilegamenav !== null) {
      mobilegamenav.classList.add("mobile-game-nav-light");
      mobilegamenav.classList.remove("mobile-game-nav-dark");
    }
    // icon changing depending on theme
    if (themeswitcherIcon !== null) {
      themeswitcherIcon.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
    }
    // mobile global nav
    if (mobilenavmodal !== null) {
      mobilenavmodal.classList.add("mobile-global-nav-light");
      mobilenavmodal.classList.remove("mobile-global-nav-dark");
    }
  }
}

function getTheme() {
  return localStorage.getItem("themeOption");
}

function setTheme(theme) {
  saveTheme(theme);
  loadTheme(theme);
}

loadTheme(getTheme());

function saveColorscheme(theme) {
  localStorage.setItem("colorschemeOption", theme);
}

function clearColorschemeTemp() {
  document.getElementById("navbar").classList.remove("bg-primary");
  document.getElementById("navbar").classList.remove("bg-secondary");
  document.getElementById("navbar").classList.remove("bg-warning");
  document.getElementById("navbar").classList.remove("bg-danger");
  document.getElementById("navbar").classList.remove("bg-success");
}

function loadColorscheme(theme) {
  clearColorschemeTemp();
  switch (theme) {
    case "orange":
      document.getElementById("navbar").classList.add("bg-warning");
      break;
    case "red":
      document.getElementById("navbar").classList.add("bg-danger");
      break;
    case "green":
      document.getElementById("navbar").classList.add("bg-success");
      break;
    case "default":
      document.getElementById("navbar").classList.add("bg-primary");
      break;
  }
}

function getColorscheme() {
  return localStorage.getItem("colorschemeOption");
}

function setColorscheme(theme) {
  saveColorscheme(theme);
  loadColorscheme(theme);
}

function refreshColorScheme() {
  switch (getColorscheme()) {
    case "orange":
      loadColorscheme("orange");
      break;
    case "red":
      loadColorscheme("red");
      break;
    case "green":
      loadColorscheme("green");
      break;
    default:
      loadColorscheme("default");
      break;
  }
  loadTheme(getTheme());
}
