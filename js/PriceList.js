
window.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. HTML ELEMENTS
    // =====================================================

    const viewport = document.getElementById("price-viewport");
    const track = document.getElementById("price-track");
    const tabs = document.querySelectorAll(".price-tab");
    const homePanel = track?.querySelector(".home-panel");

    if (!viewport || !track || !homePanel) {
        console.error("Price animation elements not found.");
        return;
    }

    if (!window.services || !window.translations) {
        console.error("Price data or translations not found.");
        return;
    }


    // =====================================================
    // 2. CATEGORY DEFINITIONS
    // =====================================================

    const categories = [
        { id: "bicycle", start: null },
        { id: "bmx", start: "wheels" },
        { id: "mountainBike", start: "brakes" },
        { id: "eBike", start: "gears" },
        { id: "eScooters", start: "accessories" }
    ];

    let currentState = "home";
    let panels = [homePanel];
    let priceListContainer = null;


    // =====================================================
    // 3. LANGUAGE
    // =====================================================

    function getCurrentLanguage() {
        return localStorage.getItem("preferredLanguage") || "et";
    }

    function getText(key) {
        const lang = getCurrentLanguage();

        const dictionary =
        window.translations[lang] || window.translations.et;

        return dictionary[key] ?? key;
    }


    // =====================================================
    // 4. PRICE FORMATTING
    // =====================================================

    function formatPrice(price) {
        return `${price}${window.services.currency}`;
    }

    function formatRange(min, max) {
        return `${formatPrice(min)}-${formatPrice(max)}`;
    }

    function formatHourly(rate) {
        return `${formatPrice(rate)}/h`;
    }


    // =====================================================
    // 5. ELEMENT CREATION
    // =====================================================

    function createElement(tag, className, text) {

        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        element.textContent = text;

        return element;
    }

    function addCategory(title, price = "") {

        priceListContainer.appendChild(
            createElement(
                "h2",
                "price-category",
                price ? `${title}: ${price}` : title
            )
        );
    }

    function addDescription(text) {

        priceListContainer.appendChild(
            createElement("p", "price-description", text)
        );
    }

    function addService(text, price) {

        const line = document.createElement("div");

        line.className = "price-service";
        line.textContent = `* ${text} ${price}`;

        priceListContainer.appendChild(line);
    }


    // =====================================================
    // 6. GENERATE ONE COMPLETE PRICE LIST
    // =====================================================

    function generateFullPriceList() {

        const t = getText;
        const s = window.services;

        const master = document.createElement("div");

        priceListContainer = master;


        // PRICE LIST TITLE - ONLY ONCE

        master.appendChild(
            createElement("h1", "section-title", t("priceListTitle"))
        );


        // BASIC SERVICE

        addCategory(
            t("basicService"),
                    formatPrice(s.basicService.price)
        );

        addDescription(t("basicServiceDescription"));


        // BIKE WASH

        addCategory(
            t("bikeWash"),
                    formatRange(s.bikeWash.priceMin, s.bikeWash.priceMax)
        );


        // FULL SERVICE

        addCategory(
            t("fullService"),
                    `${t("hourlyRateLabel")} ${formatHourly(s.hourlyRate)}`
        );

        addDescription(t("fullServiceDescription"));


        // WHEELS

        addCategory(t("wheels"));

        addService(t("innerTube"),
                   formatRange(s.wheels.innerTube.priceMin, s.wheels.innerTube.priceMax));

        addService(t("wheelTruing"),
                   formatRange(s.wheels.wheelTruing.priceMin, s.wheels.wheelTruing.priceMax));

        addService(t("rimHubReplacement"),
                   formatRange(s.wheels.rimHubReplacement.priceMin, s.wheels.rimHubReplacement.priceMax));

        addService(t("coneAdjustment"),
                   formatRange(s.wheels.coneAdjustment.priceMin, s.wheels.coneAdjustment.priceMax));

        addService(t("hubService"),
                   formatRange(s.wheels.hubService.priceMin, s.wheels.hubService.priceMax));

        addService(t("freewheelCassette"),
                   formatRange(s.wheels.freewheelCassette.priceMin, s.wheels.freewheelCassette.priceMax));

        addService(t("hubBearings"),
                   formatRange(s.wheels.hubBearings.priceMin, s.wheels.hubBearings.priceMax));


        // BEARINGS

        addCategory(t("bearings"));

        addService(t("bottomBracket"),
                   formatRange(s.bearings.bottomBracket.priceMin, s.bearings.bottomBracket.priceMax));

        addService(t("headset"),
                   formatRange(s.bearings.headset.priceMin, s.bearings.headset.priceMax));


        // BRAKES

        addCategory(t("brakes"));

        addService(t("brakePads"),
                   formatRange(s.brakes.brakePads.priceMin, s.brakes.brakePads.priceMax));

        addService(t("brakeAdjustment"),
                   formatRange(s.brakes.brakeAdjustment.priceMin, s.brakes.brakeAdjustment.priceMax));

        addService(t("brakeGearLever"),
                   formatRange(s.brakes.brakeGearLever.priceMin, s.brakes.brakeGearLever.priceMax));


        // GEARS

        addCategory(t("gears"));

        addService(t("cables"),
                   formatRange(s.gears.cables.priceMin, s.gears.cables.priceMax));

        addService(t("derailleur"),
                   formatRange(s.gears.derailleur.priceMin, s.gears.derailleur.priceMax));

        addService(t("chain"),
                   formatRange(s.gears.chain.priceMin, s.gears.chain.priceMax));


        // ACCESSORIES

        addCategory(t("accessories"));

        addService(t("speedometer"),
                   formatRange(s.accessories.speedometer.priceMin, s.accessories.speedometer.priceMax));

        addService(t("mudguard"),
                   formatRange(s.accessories.mudguard.priceMin, s.accessories.mudguard.priceMax));

        addService(t("childSeatRackBasket"),
                   formatRange(s.accessories.childSeatRackBasket.priceMin, s.accessories.childSeatRackBasket.priceMax));

        addService(t("handlebarTape"),
                   formatRange(s.accessories.handlebarTape.priceMin, s.accessories.handlebarTape.priceMax));


        // STORAGE

        addCategory(t("storage"));

        addService(
            t("winterStorage"),
                   formatPrice(s.storage.winter)
        );

        addService(
            t("winterStorageWithService"),
                   formatPrice(s.storage.winterWithBasicService)
        );

        addService(
            t("additionalWash"),
                   formatRange(s.storage.additionalWashMin, s.storage.additionalWashMax)
        );

        addService(
            t("monthlyStorage"),
                   formatPrice(s.storage.monthly)
        );


        // OTHER WORK

        addCategory(
            `${t("otherWork")} - ${t("hourlyRateLabel")} ${formatHourly(s.otherWork.hourlyRate)}`
        );

        addDescription(t("otherWorkDescription"));


        priceListContainer = null;

        return master;
    }


    // =====================================================
    // 7. FIND CATEGORY POSITIONS
    // =====================================================

    function findCategoryPosition(children, key) {

        const heading = getText(key).trim();

        return children.findIndex(element => {

            return (
                element.classList.contains("price-category") &&
                element.textContent.trim() === heading
            );

        });
    }


    // =====================================================
    // 8. BUILD FIVE CONSECUTIVE PANELS
    // =====================================================

    function buildPanels() {

        const master = generateFullPriceList();

        const children = Array.from(master.children);

        const positions = [0];


        // Find the beginning of each category.

        for (let i = 1; i < categories.length; i++) {

            const position = findCategoryPosition(
                children,
                categories[i].start
            );

            if (position === -1) {

                console.error(
                    "Category heading not found:",
                    categories[i].start
                );

                return false;
            }

            if (position <= positions[i - 1]) {

                console.error(
                    "Incorrect category order:",
                    categories[i].start
                );

                return false;
            }

            positions.push(position);
        }


        // Keep the original home panel.

        track.replaceChildren(homePanel);

        panels = [homePanel];


        // Create five consecutive sections.

        categories.forEach((category, index) => {

            const start = positions[index];

            const end = index < categories.length - 1
            ? positions[index + 1]
            : children.length;

            const panel = document.createElement("div");

            panel.className = "price-panel";
            panel.dataset.category = category.id;


            // Copy only this section's content.

            children.slice(start, end).forEach(element => {

                panel.appendChild(element.cloneNode(true));

            });


            track.appendChild(panel);

            panels.push(panel);

        });

        return true;
    }


    // =====================================================
    // 9. GET PANEL INDEX
    // =====================================================

    function getPanelIndex(state) {

        if (state === "home") {
            return 0;
        }

        const index = categories.findIndex(
            category => category.id === state
        );

        return index === -1 ? -1 : index + 1;
    }


    // =====================================================
    // 10. ANIMATION
    // =====================================================

    function setState(state, animate = true) {

        const index = getPanelIndex(state);

        if (index < 0 || !panels[index]) {
            console.error("Panel not found:", state);
            return;
        }

        currentState = state;

        const panel = panels[index];


        if (animate) {

            viewport.style.transition = "";
            track.style.transition = "";

        } else {

            viewport.style.transition = "none";
            track.style.transition = "none";

        }


        // Adjust viewport height.

        viewport.style.height = `${panel.scrollHeight}px`;


        // Move the continuous vertical track.

        track.style.transform =
        `translateY(-${panel.offsetTop}px)`;


        // Update active tab.

        tabs.forEach(tab => {

            const active = tab.dataset.category === state;

            tab.classList.toggle("active", active);

            tab.setAttribute(
                "aria-pressed",
                String(active)
            );

        });


        // Restore animation after instant changes.

        if (!animate) {

            requestAnimationFrame(() => {

                viewport.style.transition = "";
                track.style.transition = "";

            });

        }
    }


    // =====================================================
    // 11. TAB CLICKS
    // =====================================================

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            setState(tab.dataset.category);

        });

    });


    // =====================================================
    // 12. RETURN TO HOME
    // =====================================================

    function goHome() {

        setState("home");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    document.querySelectorAll(
        "#summer, #winter, .site-footer"
    ).forEach(element => {

        element.style.cursor = "pointer";

        element.addEventListener("click", event => {

            if (event.target.closest(
                "a, button, input, select, textarea"
            )) {
                return;
            }

            goHome();

        });


        element.addEventListener("keydown", event => {

            if (
                (event.key === "Enter" || event.key === " ") &&
                event.target === element
            ) {

                event.preventDefault();

                goHome();

            }

        });

    });


    // =====================================================
    // 13. INITIAL RENDERING
    // =====================================================

    if (!buildPanels()) {
        return;
    }

    setState("home", false);


    // =====================================================
    // 14. LANGUAGE REFRESH
    // =====================================================

    window.renderPriceList = () => {

        const previousState = currentState;

        if (!buildPanels()) {
            return;
        }

        setState(previousState, false);

    };


    // =====================================================
    // 15. WINDOW RESIZE
    // =====================================================

    window.addEventListener("resize", () => {

        const index = getPanelIndex(currentState);

        if (index < 0 || !panels[index]) {
            return;
        }

        const panel = panels[index];

        viewport.style.height = `${panel.scrollHeight}px`;

        track.style.transform =
        `translateY(-${panel.offsetTop}px)`;

    });

});
