const cities = [
	{ id: 1, name: "Москва" },
	{ id: 2, name: "Санкт-Петербург" },
	{ id: 3, name: "Казань" },
	{ id: 4, name: "Новосибирск" }
];

const select = document.querySelector(".custom-select");
const title = document.createElement("div");
let selectedCity = cities[0];

selectedChange(selectedCity.name);

const options = document.createElement("div");
options.setAttribute("role", "options");
options.className = "select-options";

cities.forEach((item) => {
	let option = document.createElement("div");
	option.className = "select-option";
	option.textContent = item.name;
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
		selectedChange(optionElement.textContent);
	}

	options.classList.remove("active");
});
select.append(title, options);

function keyboardOptionsClose(e) {
	if (e.key === "Escape") {
		options.classList.remove("active");
	}
}

function selectedChange(value) {
	title.textContent = value;
	title.setAttribute("role", "button");
	title.className = "select-title";
	return title;
}
