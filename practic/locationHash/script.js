let arrayTabs = [
	{
		title: "home"
	},
	{
		title: "products"
	},
	{
		title: "contact"
	}
];

class TransitionPage {
	constructor(pageTitle) {
		this.pageTitle = pageTitle;
	}
	createTab() {
		let tab = document.createElement("button");
		tab.setAttribute("id", this.pageTitle);
		tab.classList.add("tab");
		tab.textContent = this.pageTitle;
		return tab;
	}

	render(dom) {
		let tab = this.createTab();
		dom.append(tab);
	}
}
const container = document.querySelector(".container");
arrayTabs.forEach((tab) => {
	new TransitionPage(tab.title).render(container);
});

function updateView() {
	let hash = location.hash.slice(1) || "home";

	document.querySelectorAll(".tab-content").forEach((item) => {
		item.classList.remove("active");
	});
	let target = document.getElementById(`${hash}-content`);

	if (target) {
		target.classList.add("active");
	}
}
container.addEventListener("click", (e) => {
	if (e.target.classList.contains("tab")) {
		location.hash = e.target.id;
	}
});

window.addEventListener("hashchange", updateView);
window.addEventListener("DOMContentLoaded", updateView);
