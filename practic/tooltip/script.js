const btn = document.querySelector(".btnTooltip");
const tooltip = document.querySelector(".tooltip");

function showTooltip() {
	tooltip.classList.add("active");

	const rect = btn.getBoundingClientRect();
	tooltip.style.top = rect.top + tooltip.offsetHeight + 8 + "px";
	tooltip.style.left = rect.left + rect.width / 2 + "px";
	document.addEventListener("keydown", keyCloseTooltip);
}

function hiddenTooltip() {
	tooltip.classList.remove("active");
	document.removeEventListener("keydown", keyCloseTooltip);
}

function keyCloseTooltip(e) {
	if (e.key === "Escape") {
		hiddenTooltip();
	}
}

btn.addEventListener("mouseenter", showTooltip);
btn.addEventListener("focus", showTooltip);
btn.addEventListener("mouseleave", hiddenTooltip);
btn.addEventListener("blur", hiddenTooltip);
