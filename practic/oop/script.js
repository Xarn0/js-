class Product {
	constructor(name, price, inStock) {
		if (isNaN(price)) price = 0;
		this.name = name;
		this.price = price;
		this.inStock = inStock;
	}
	createCard() {
		const cardProduct = document.createElement("div");
		cardProduct.className = "card";
		cardProduct.append(
			createDomElement("p", this.name),
			createDomElement("p", this.price, "price"),
			this.inStock
				? createDomElement("p", "есть в наличии")
				: createDomElement("p", "нету в наличии")
		);
		return cardProduct;
	}
	render() {
		let card = this.createCard();
		document.querySelector(".container").append(card);
	}
}
class SaleProduct extends Product {
	constructor(name, price, inStock, sale) {
		super(name, price, inStock);
		this.sale = sale;
		this.discount = Math.round(Math.random() * 20);
	}
	render() {
		let card = this.createCard();
		// let price = parseFloat(card.querySelector(".price").textContent);
		console.log(card);

		this.finalPrice = Math.floor(
			this.price - this.price * (this.discount / 100)
		);

		card.classList.add("old-price");

		let priceContiner = createDomElement(
			"div",
			`новая цена:`,
			"container-price"
		);
		priceContiner.append(createDomElement("div", this.price, "new-price"));

		card.append(
			createDomElement("p", `${this.sale} ${this.discount}%`),
			priceContiner
		);

		document.querySelector(".container2").append(card);
	}
}
function createDomElement(tag, content, classEl = "") {
	let result = document.createElement(tag);
	result.textContent = content;
	if (classEl != "") {
		result.classList.add(classEl);
	}
	return result;
}

const productList = [
	{ name: "Смартфон Galaxy X", price: 29990, inStock: true },
	{ name: "Ноутбук VisionBook", price: "вав", inStock: false },
	{ name: "Наушники SonicPro", price: 4990, inStock: true },
	{ name: "Клавиатура KeyMaster", price: 2990, inStock: true },
	{ name: "Монитор UltraView", price: 12990, inStock: false }
];

productList.forEach((item) => {
	let result = new Product(item.name, item.price, item.inStock, "скидка");
	result.render();
});
productList.forEach((item) => {
	let result = new SaleProduct(item.name, item.price, item.inStock, "скидка");
	result.render();
});

class Logger {
	constructor() {}
	log() {
		return 20 * 40;
	}
}

class UserLogger extends Logger {
	constructor() {
		super();
	}
	log() {
		let parent = super.log();
		console.log("in children " + parent);
		return 203;
	}
}
class UserLoggerChildren extends UserLogger {
	constructor() {
		super();
	}
	log() {
		let parent = super.log();
		console.log("in children " + parent);
	}
}

let user = new UserLoggerChildren();
user.log();
