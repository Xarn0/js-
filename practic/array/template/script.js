const productsParent = document.querySelector(".products");
const products = [
	{ id: 101, name: "Смартфон Galaxy X", price: 29990, inStock: true },
	{ id: 102, name: "Ноутбук VisionBook", price: 74990, inStock: false },
	{ id: 103, name: "Наушники SonicPro", price: 4990, inStock: true },
	{ id: 104, name: "Клавиатура KeyMaster", price: 2990, inStock: true }
];
const container = document.createDocumentFragment();
products.forEach((item) => {
	const product = document.createElement("div");

	const productTitle = fieldProduct("h2", item.name);
	const productPrice = fieldProduct("p", item.price);
	const productStock = fieldProduct("p", "Нет в наличии");

	if (!item.inStock) {
		product.classList.add("out-of-stock");
		product.append(productTitle, productPrice, productStock);
	} else {
		product.append(productTitle, productPrice);
	}
	container.append(product);
});
productsParent.append(container);

function fieldProduct(tag, content) {
	const result = document.createElement(tag);
	result.textContent = content;
	return result;
}
