const cities = [
	{ id: 1, name: "Москва" },
	{ id: 2, name: "Санкт-Петербург" },
	{ id: 3, name: "Казань" },
	{ id: 4, name: "Новосибирск" },
	{ id: 5, name: "Симферопль" },
	{ id: 6, name: "ялта" }
];

let selectedIndex = 0;
const select = document.querySelector(".custom-select");
const title = document.createElement("div");
let selectedCity = cities[0];

selectedChange(selectedCity.name, selectedCity.id);

const options = document.createElement("div");
options.setAttribute("role", "options");
options.className = "select-options";

cities.forEach((item) => {
	let option = document.createElement("div");
	option.className = "select-option";
	option.textContent = item.name;
	option.setAttribute("role", "option");
	option.setAttribute("data-id", item.id);
	options.append(option);
});

title.addEventListener("click", () => {
	options.classList.toggle("active");
	if (options.classList.contains("active")) {
		document.addEventListener("keydown", keyboardOptionsClose);
	} else {
		document.removeEventListener("keydown", keyboardOptionsClose);
	}
});
options.addEventListener("click", (e) => {
	let optionElement = e.target.closest(".select-option");
	if (!optionElement) return;
	if (title.textContent !== optionElement.textContent) {
		let idElementActive = optionElement.getAttribute("data-id");
		selectedChange(optionElement.textContent, idElementActive);
	}

	options.classList.remove("active");
});
select.append(title, options);

function keyboardOptionsClose(e) {
	if (e.key === "Escape") {
		options.classList.remove("active");
	}
	if (!selectedIndex) return;

	if (e.key === "ArrowDown") {
		selectedIndex = Math.min(selectedIndex + 1, cities.length);
		let item = cities.find((item) => item.id == Number(selectedIndex));

		selectedChange(item.name, item.id);
	} else if (e.key === "ArrowUp") {
		selectedIndex = Math.max(
			(selectedIndex - 1 + cities.length) % cities.length,
			1
		);
		let item = cities.find((item) => item.id == selectedIndex);
		selectedChange(item.name, item.id);
	}
}

function selectedChange(value, id) {
	selectedIndex = id;
	title.textContent = value;
	title.setAttribute("role", "button");
	title.className = "select-title";
	return title;
}
