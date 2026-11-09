window.addEventListener("DOMContentLoaded", () => {
    const today = new Date();   // user's local date
    const m = today.getMonth(); // 0–11

    const winter = document.getElementById("winter");
    const summer = document.getElementById("summer");
	const summer2 = document.getElementById("summer2");

    if ([11, 0, 1].includes(m)) {
        winter.style.display = "block";
    } else {
        summer.style.display = "block";
		summer2.style.display = "block";
    }
});