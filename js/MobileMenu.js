
window.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuToggle || !mobileMenu) {
        return;
    }

    // Check whether the menu is open
    function isMenuOpen() {
        return menuToggle.getAttribute("aria-expanded") === "true";
    }

    // Open or close the menu
    function setMenuOpen(open) {

        menuToggle.setAttribute("aria-expanded", String(open));

        mobileMenu.classList.toggle("is-open", open);

        menuToggle.classList.toggle("is-active", open);

        updateMenuLabel();
    }

    // Update accessibility label using current language
    function updateMenuLabel() {

        const language = localStorage.getItem("preferredLanguage") || "et";

        const dictionary = window.translations?.[language];

        if (!dictionary) {
            return;
        }

        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen()
            ? dictionary.closeMenu
            : dictionary.openMenu
        );
    }

    // Burger button
    menuToggle.addEventListener("click", () => {
        setMenuOpen(!isMenuOpen());
    });

    // Close menu after selecting a navigation link
    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            setMenuOpen(false);
        });

    });

    // Close menu after selecting a language
    mobileMenu.querySelectorAll(".language-button").forEach(button => {

        button.addEventListener("click", () => {
            setMenuOpen(false);
        });

    });

    // Close menu when clicking outside
    document.addEventListener("click", event => {

        if (
            isMenuOpen() &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuOpen(false);
        }

    });

    // Close menu with Escape key
    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && isMenuOpen()) {

            setMenuOpen(false);

            menuToggle.focus();
        }

    });

    // Allow Language.js to refresh the menu label
    window.updateMenuLabel = updateMenuLabel;

    // Initial state
    setMenuOpen(false);

});
