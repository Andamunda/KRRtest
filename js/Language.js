
window.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "preferredLanguage";

    const supportedLanguages = ["et", "en", "lt"];

    // Detect browser language
    function detectBrowserLanguage() {

        const browserLanguages = navigator.languages || [
            navigator.language
        ];

        for (const language of browserLanguages) {

            const shortLanguage = language
            .toLowerCase()
            .split("-")[0];

            if (supportedLanguages.includes(shortLanguage)) {
                return shortLanguage;
            }
        }

        // Default language
        return "en";
    }


    // Get saved language or detect browser language
    function getInitialLanguage() {

        const savedLanguage = localStorage.getItem(STORAGE_KEY);

        if (supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        return detectBrowserLanguage();
    }


    // Apply selected language
    function applyLanguage(language) {

        if (!supportedLanguages.includes(language)) {
            language = "en";
        }

        const dictionary = window.translations[language];

        if (!dictionary) {
            console.error("Translation dictionary not found:", language);
            return;
        }

        // Save preference
        localStorage.setItem(STORAGE_KEY, language);

        // Update HTML language attribute
        document.documentElement.lang = language;

        // Update page title
        if (dictionary.pageTitle) {
            document.title = dictionary.pageTitle;
        }

        // Update translated HTML elements
        document.querySelectorAll("[data-i18n]").forEach(element => {

            const key = element.dataset.i18n;

            if (dictionary[key] !== undefined) {
                element.textContent = dictionary[key];
            }

        });

        // Update language buttons
        document.querySelectorAll(".language-button").forEach(button => {

            const isActive = button.dataset.lang === language;

            button.classList.toggle("active", isActive);

            button.setAttribute("aria-pressed", String(isActive));

        });

        // Update menu accessibility label
        const menuToggle = document.getElementById("menuToggle");

        if (menuToggle) {

            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                ? dictionary.closeMenu
                : dictionary.openMenu
            );

        }

        // Regenerate price list
        if (typeof window.renderPriceList === "function") {
            window.renderPriceList();
        }

        // Update mobile menu accessibility label
        if (typeof window.updateMenuLabel === "function") {
            window.updateMenuLabel();
        }

    }


    // Language selection buttons
    document.querySelectorAll(".language-button").forEach(button => {

        button.addEventListener("click", () => {

            const language = button.dataset.lang;

            applyLanguage(language);

        });

    });


    // Set initial language
    const initialLanguage = getInitialLanguage();

    applyLanguage(initialLanguage);


    // Make function available to other scripts
    window.setLanguage = applyLanguage;

});
