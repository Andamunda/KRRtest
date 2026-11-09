
window.addEventListener("DOMContentLoaded", () => {

    const priceListContainer = document.getElementById("price-list");

    if (!priceListContainer) {
        console.error("Price list container not found.");
        return;
    }

    if (!window.services) {
        console.error("Services data not found.");
        return;
    }

    if (!window.translations) {
        console.error("Translation data not found.");
        return;
    }

    // Get currently selected language
    function getCurrentLanguage() {
        return localStorage.getItem("preferredLanguage") || "et";
    }

    // Get translations
    function getText(key, lang) {
        const dictionary = window.translations[lang] || window.translations.et;
        return dictionary[key] || key;
    }

    // Format prices
    function formatPrice(price) {
        return `${price}${window.services.currency}`;
    }

    function formatRange(min, max) {
        return `${formatPrice(min)}-${formatPrice(max)}`;
    }

    function formatHourly(rate) {
        return `${formatPrice(rate)}/h`;
    }

    // Create HTML element
    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        element.textContent = text;

        return element;
    }

    // Add section heading
    function addCategory(title, price = "") {
        const heading = createElement(
            "h2",
            "price-category",
            price ? `${title}: ${price}` : title
        );

        priceListContainer.appendChild(heading);
    }

    // Add description
    function addDescription(text) {
        const paragraph = createElement(
            "p",
            "price-description",
            text
        );

        priceListContainer.appendChild(paragraph);
    }

    // Add individual service with price
    function addService(text, price) {
        const line = document.createElement("div");
        line.className = "price-service";

        line.textContent = `* ${text} ${price}`;

        priceListContainer.appendChild(line);
    }

    // Generate complete price list
    function renderPriceList() {

        const lang = getCurrentLanguage();
        const t = (key) => getText(key, lang);
        const s = window.services;

        // Clear previous content
        priceListContainer.replaceChildren();

        // Main title
        priceListContainer.appendChild(
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

        addService(
            t("innerTube"),
                   formatRange(s.wheels.innerTube.priceMin, s.wheels.innerTube.priceMax)
        );

        addService(
            t("wheelTruing"),
                   formatRange(s.wheels.wheelTruing.priceMin, s.wheels.wheelTruing.priceMax)
        );

        addService(
            t("rimHubReplacement"),
                   formatRange(s.wheels.rimHubReplacement.priceMin, s.wheels.rimHubReplacement.priceMax)
        );

        addService(
            t("coneAdjustment"),
                   formatRange(s.wheels.coneAdjustment.priceMin, s.wheels.coneAdjustment.priceMax)
        );

        addService(
            t("hubService"),
                   formatRange(s.wheels.hubService.priceMin, s.wheels.hubService.priceMax)
        );

        addService(
            t("freewheelCassette"),
                   formatRange(s.wheels.freewheelCassette.priceMin, s.wheels.freewheelCassette.priceMax)
        );

        addService(
            t("hubBearings"),
                   formatRange(s.wheels.hubBearings.priceMin, s.wheels.hubBearings.priceMax)
        );

        // BEARINGS
        addCategory(t("bearings"));

        addService(
            t("bottomBracket"),
                   formatRange(s.bearings.bottomBracket.priceMin, s.bearings.bottomBracket.priceMax)
        );

        addService(
            t("headset"),
                   formatRange(s.bearings.headset.priceMin, s.bearings.headset.priceMax)
        );

        // BRAKES
        addCategory(t("brakes"));

        addService(
            t("brakePads"),
                   formatRange(s.brakes.brakePads.priceMin, s.brakes.brakePads.priceMax)
        );

        addService(
            t("brakeAdjustment"),
                   formatRange(s.brakes.brakeAdjustment.priceMin, s.brakes.brakeAdjustment.priceMax)
        );

        addService(
            t("brakeGearLever"),
                   formatRange(s.brakes.brakeGearLever.priceMin, s.brakes.brakeGearLever.priceMax)
        );

        // GEARS
        addCategory(t("gears"));

        addService(
            t("cables"),
                   formatRange(s.gears.cables.priceMin, s.gears.cables.priceMax)
        );

        addService(
            t("derailleur"),
                   formatRange(s.gears.derailleur.priceMin, s.gears.derailleur.priceMax)
        );

        addService(
            t("chain"),
                   formatRange(s.gears.chain.priceMin, s.gears.chain.priceMax)
        );

        // ACCESSORIES
        addCategory(t("accessories"));

        addService(
            t("speedometer"),
                   formatRange(s.accessories.speedometer.priceMin, s.accessories.speedometer.priceMax)
        );

        addService(
            t("mudguard"),
                   formatRange(s.accessories.mudguard.priceMin, s.accessories.mudguard.priceMax)
        );

        addService(
            t("childSeatRackBasket"),
                   formatRange(s.accessories.childSeatRackBasket.priceMin, s.accessories.childSeatRackBasket.priceMax)
        );

        addService(
            t("handlebarTape"),
                   formatRange(s.accessories.handlebarTape.priceMin, s.accessories.handlebarTape.priceMax)
        );

        // BICYCLE STORAGE
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
    }

    // Initial rendering
    renderPriceList();

    // Allow Language.js to refresh the price list
    window.renderPriceList = renderPriceList;

});
