
window.addEventListener("DOMContentLoaded", () => {
    const cogImages = [
        "img/g40.png",
        "img/g43.png",
        "img/g37.png"
    ];

    const container = document.getElementById("cog-container");

    if (!container) {
        console.error("Cog container not found");
        return;
    }

    const n = 20;
    const placed = [];
    const padding = 50;

    // Find the currently visible header.
    const summer = document.getElementById("summer");
    const winter = document.getElementById("winter");

    let headerBottom = 0;

    [summer, winter].forEach(header => {
        if (
            header &&
            getComputedStyle(header).display !== "none"
        ) {
            const rect = header.getBoundingClientRect();
            const bottom = rect.bottom + window.scrollY;

            headerBottom = Math.max(headerBottom, bottom);
        }
    });

    // Start generating cogs just below the visible header.
    const gapBelowHeader = 20;
    const minY = headerBottom + gapBelowHeader;

    // Use the page dimensions for the available placement area.
    const pageWidth = document.documentElement.clientWidth;
    const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
    );

    // Set the cog container to cover the page.
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = `${pageHeight}px`;
    container.style.overflow = "visible";
    container.style.pointerEvents = "none";
    container.style.zIndex = "0";

    for (let i = 0; i < n; i++) {
        const div = document.createElement("div");

        div.style.position = "absolute";

        // Random cog size: 50px to 150px.
        const size = 100 * (0.5 + Math.random());

        div.style.width = `${size}px`;
        div.style.height = `${size}px`;
        div.style.backgroundSize = "contain";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundPosition = "center";
        div.style.zIndex = "0";

        // Select a random cog image.
        const image =
            cogImages[Math.floor(Math.random() * cogImages.length)];

        div.style.backgroundImage = `url("${image}")`;

        // Horizontal placement.
        const minX = pageWidth * 0.05;
        const maxX = Math.max(minX, pageWidth * 0.95 - size);

        // Vertical placement starts below the header.
        const maxY = Math.max(minY, pageHeight - size);

        let x, y;
        let tries = 0;

        do {
            x = minX + Math.random() * (maxX - minX);
            y = minY + Math.random() * (maxY - minY);

            tries++;
        } while (
            placed.some(c =>
                Math.abs(c.x - x) <
                    (c.size + size) / 2 + padding &&
                Math.abs(c.y - y) <
                    (c.size + size) / 2 + padding
            ) &&
            tries < 100
        );

        div.style.left = `${x}px`;
        div.style.top = `${y}px`;

        placed.push({ x, y, size });
        container.appendChild(div);
    }

    console.log("Cogs generated:", container.children.length);
    console.log("Cogs start below header at Y =", minY);
});

