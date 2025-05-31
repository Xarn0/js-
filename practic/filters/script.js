const searchInput = document.querySelector("#search");
const displayResult = document.querySelector(".products");
const products = [
	{ id: 101, name: "Смартфон Galaxy X", price: 29990, inStock: true },
	{ id: 103, name: "Наушники SonicPro", price: 4990, inStock: true },
	{ id: 102, name: "Ноутбук VisionBook", price: 74990, inStock: false },
	{ id: 104, name: "Клавиатура KeyMaster", price: 2990, inStock: true }
];
let result;
searchInput.addEventListener("input", function () {
	if (!this.value.trim()) {
		displayResult.textContent = "";
		return;
	}
	resultValue(this.value);
	renderProductList(result);
});
searchInput.addEventListener("focus", () => {
	document.addEventListener("keydown", keyboardEnter);
});
searchInput.addEventListener("blur", () => {
	document.removeEventListener("keydown", keyboardEnter);
});
function fieldProduct(tag, content) {
	const result = document.createElement(tag);
	result.textContent = content;
	return result;
}

function renderProductList(data) {
	displayResult.innerHTML = "";
	const fragment = document.createDocumentFragment();
	data.forEach((item) => {
		const container = fieldProduct("div", "");
		container.classList.add("product");

		const price = fieldProduct("p", item.price);
		const name = fieldProduct("p", item.name);
		const stock = fieldProduct("p", "Нет в наличии");

		if (!item.inStock) {
			container.classList.add("out-of-stock");
			container.append(name, price, stock);
		} else {
			container.append(name, price);
		}
		fragment.append(container);
	});
	displayResult.append(fragment);
}
function resultValue(valueOutside) {
	const value = valueOutside.trim().toLowerCase();
	result = value
		? products.filter((item) => item.name.toLowerCase().includes(value))
		: products;
	return result;
}

function keyboardEnter(e) {
	if (e.key === "Enter") {
		resultValue(e.target.value);
		renderProductList(result);
	}
}
