let list = document.querySelector(".list");

list.addEventListener("click", function (e) {
	let item = e.target.closest(".list__item");

	if (!item) return;

	if (e.target.classList.contains("delete")) {
		item.remove();
		return;
	}

	if (e.target.classList.contains("edit")) {
		let hasEdit = e.target.textContent === "save";

		if (!hasEdit) {
			let text = item.querySelector(".list__text");
			let inputOut = document.createElement("input");
			inputOut.classList.add("list__input");
			inputOut.value = text.textContent;
			text.replaceWith(inputOut);
			inputOut.focus();
			e.target.textContent = "save";
		} else {
			let inputEl = item.querySelector(".list__input");
			let newText = document.createElement("p");
			newText.classList.add("list__text");
			newText.textContent = inputEl.value;
			inputEl.replaceWith(newText);
			e.target.textContent = "edit";
		}
	}
	if (e.target.classList.contains("copy")) {
		let copy = item.cloneNode(true);

		let input = copy.querySelector(".list__input");

		if (input) {
			let textCopy = document.createElement("p");
			textCopy.textContent = input.value;
			textCopy.classList.add("list__text");
			input.replaceWith(textCopy);
		}

		e.currentTarget.append(copy);
	}
});
