const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		activeTab(index);
	});
	tab.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight") {
			activeTab((index + 1) % tabs.length);
		}
		if (e.key === "ArrowLeft") {
			activeTab((index - 1 + tabs.length) % tabs.length);
		}
	});
});

function activeTab(index) {
	tabs.forEach((tab, i) => {
		let isActive = i === index;
		tab.setAttribute("aria-selected", isActive);
		tab.setAttribute("tabindex", isActive ? "0" : "-1");
	});
	panels.forEach((panel, inx) => {
		panel.hidden = inx !== index ? true : false;
	});
	tabs[index].focus();
}
