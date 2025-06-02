    function saveTheme(theme) {
        localStorage.setItem("themeOption", theme);
    }

    function loadTheme(theme) {
        document.body.setAttribute('data-bs-theme', theme);
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

