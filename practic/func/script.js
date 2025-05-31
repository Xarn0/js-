const products = [
	{ name: "Смартфон", price: 30000, inStock: true },
	{ name: "Планшет", price: 25000, inStock: false },
	{ name: "Ноутбук", price: 60000, inStock: true }
];

const container = document.querySelector(".container");

function filterByElementsOnStock(data) {
	return data.filter((item) => item.inStock);
}
let elementOnStock = filterByElementsOnStock(products);
const elementsFragment = document.createElement("div");
function createElementInContainer(name, data, classElement = "") {
	const title = document.createElement("p");
	title.textContent = name;
	title.className = "title";
	elementsFragment.append(title, createElementDomData(data));
	elementsFragment.className = classElement;
}

function createElementDomData(data) {
	if (!Array.isArray(data)) return;
	const containerFragment = document.createDocumentFragment();
	data.forEach((item) => {
		let divElement = document.createElement("div");
		divElement.className = "card";
		divElement.append(
			createElementChild("p", item.name),
			createElementChild("p", item.price)
		);
		containerFragment.append(divElement);
	});
	return containerFragment;
}
function createElementChild(tag, content) {
	let elementItem = document.createElement(tag);
	elementItem.textContent = content;
	return elementItem;
}
createElementInContainer("На складе", elementOnStock, "INStok");
container.append(elementsFragment);

function renderFullProducts(data, container) {
	let containerFragment = document.createElement("div");
	containerFragment.className = "full-list-product";
	let title = createElementChild("p", "В списке");
	title.className = "title";
	containerFragment.append(title);

	container.append(createElementDomData(data));
}
renderFullProducts(products, container);
