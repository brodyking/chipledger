function saveTheme(theme) {
  localStorage.setItem("themeOption", theme);
}

function loadTheme(theme) {
  document.body.setAttribute("data-bs-theme", theme);
}

function getTheme() {
  return localStorage.getItem("themeOption");
}

function setTheme(theme) {
  saveTheme(theme);
  loadTheme(theme);
}

if (getTheme() == "light") {
  loadTheme("light");
}

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
}
