
window.addEventListener("DOMContentLoaded", () => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    function applyColorScheme() {
        document.body.classList.toggle(
            "page-body--dark",
            prefersDarkMode.matches
        );
    }

    // Apply the browser's current color scheme.
    applyColorScheme();

    // Update the page if the browser color scheme changes.
    prefersDarkMode.addEventListener("change", applyColorScheme);
});
