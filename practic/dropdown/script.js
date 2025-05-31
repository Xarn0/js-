const dropdown = document.querySelector(".dropdown");
const title = dropdown.querySelector(".dropdown__title");
const list = dropdown.querySelector(".dropdown__list");

function openDropdown() {
	list.classList.add("active");
	list.setAttribute("aria-hidden", "false");
	document.addEventListener("click", outsideClickDropdown);
	document.addEventListener("keydown", keyboardForDropdown);
}
function closeDropdown() {
	list.classList.remove("active");
	list.setAttribute("aria-hidden", "true");
	document.removeEventListener("click", outsideClickDropdown);
	document.removeEventListener("keydown", keyboardForDropdown);
}

function outsideClickDropdown(e) {
	if (!dropdown.contains(e.target)) {
		list.classList.remove("active");
	}
}
function keyboardForDropdown(e) {
	if (e.key === "Escape") {
		closeDropdown();
	}
}

title.addEventListener("click", () =>
	list.classList.contains("active") ? closeDropdown() : openDropdown()
);

list.addEventListener("click", (e) => {
	let item = e.target.classList.contains("dropdown__item");
	if (item) {
		title.textContent = e.target.textContent;
		closeDropdown();
	}
});
