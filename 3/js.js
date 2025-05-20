// const form = document?.querySelector(".form");
// const formError = document.querySelector(".form-error");
// const formSuccess = document.querySelector(".form-success");
// const btnSubmit = document.querySelector("input[type=submit]");

// form.addEventListener("submit", (e) => {
// 	e.preventDefault();

// 	let { valid, focusElement, messageError } = validForm(form);
// 	if (!valid) {
// 		formError.textContent = messageError;
// 		formSuccess.textContent = "";
// 		focusElement?.focus();
// 		form.scrollIntoView({ behavior: "smooth" });
// 		return;
// 	}

// 	formSuccess.textContent = "Спасибо, за отправку";
// 	btnSubmit.disabled = true;
// 	btnSubmit.value = "...";
// 	formError.textContent = "";

// 	setTimeout(() => {
// 		formSuccess.textContent = "";
// 		formError.textContent = "";
// 		btnSubmit.disabled = false;
// 		btnSubmit.value = "Отправить";
// 		form.reset();
// 	}, 3000);
// });

// function validForm(form) {
// 	let data = new FormData(form);
// 	let name = data.get("name")?.trim();
// 	let email = data.get("email")?.trim();
// 	let message = data.get("message")?.trim();

// 	let emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	if (!emailValid.test(email)) {
// 		return {
// 			valid: false,
// 			focusElement: form.elements.email,
// 			messageError: "mail не подходит"
// 		};
// 	}

// 	if (!name) {
// 		return {
// 			valid: false,
// 			focusElement: form.elements.name,
// 			messageError: "Имя пусто не может быть"
// 		};
// 	}

// 	if (name.length < 3) {
// 		return {
// 			valid: false,
// 			focusElement: form.elements.name,
// 			messageError: "Имя не может таким каротким"
// 		};
// 	}

// 	if (!message) {
// 		return {
// 			valid: false,
// 			focusElement: form.elements.message,
// 			messageError: "Сообщения не может пусты"
// 		};
// 	}

// 	if (message.length < 10) {
// 		return {
// 			valid: false,
// 			focusElement: form.elements.message,
// 			messageError: "Сообщения не может таким каротким"
// 		};
// 	}
// 	return {
// 		valid: true
// 	};
// }

// // let ms = document.querySelector("#message");
// // ms.addEventListener("change", function () {
// // 	console.log(this.value, "change");
// // });
// // let nm = document.querySelector("#name");
// // let ms = document.querySelector("#message");
// // ms.addEventListener("focus", function () {
// // 	this.setSelectionRange(3, 4);
// // });
// // ms.addEventListener("focus", function () {
// // 	console.log(this.value, "focus");
// // });

// const input = document.querySelector("#message");

// input.addEventListener("focus", function () {
// 	let i = 0;
// 	const len = this.value.length;

// 	const highlight = () => {
// 		if (i <= len) {
// 			this.setSelectionRange(0, i);
// 			i++;
// 			setTimeout(highlight, 150);
// 		}
// 	};

// 	highlight();
// });

let form = document.querySelector(".form2");
let btnSubmit = form.querySelector("input[type=submit]");

form.addEventListener("input", (e) => {
	let hasError = false;
	let elements = form.querySelectorAll("input:not(input[type=submit])");

	elements.forEach((item) => {
		let value = item.value;
		let name = item.name;
		let field = form.elements[name];

		let blockError = form.querySelector(`.${name}-error`);

		blockError.textContent = "";
		field.classList.remove("error");

		if (!value) {
			field.classList.add("error");
			blockError.textContent = "поле не может быть пустым";
			hasError = true;
			return;
		}

		if (name == "name" && value.length < 4) {
			field.classList.add("error");
			blockError.textContent = "Имя не может быть короче 4х символов";
			hasError = true;
			return;
		}
		if (name == "message" && value.length < 10) {
			field.classList.add("error");
			blockError.textContent = "сообщения не может быть короче 10х символов";
			hasError = true;
			return;
		}

		let testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (name == "email" && !testEmail.test(value)) {
			field.classList.add("error");
			blockError.textContent = "email не корректный, ввидите нормальный";
			hasError = true;
			return;
		}
	});

	btnSubmit.disabled = hasError;
});

const from3 = document.querySelector(".form3");
let btnSubmitFrom3 = from3.querySelector("input[type=submit]");
from3.addEventListener("input", function (e) {
	let elements = from3.querySelectorAll("input[name]");
	let isSubmit = false;

	elements.forEach((item) => {
		let name = item.name;

		let value = item.value;
		let blockDisplay = from3.querySelector(`.${name}-error`);

		blockDisplay.textContent = "";
		blockDisplay.classList.remove("error");
		if (!value.trim()) {
			blockDisplay.textContent = "";
			blockDisplay.classList.remove("error", "success");
			isSubmit = true;
			return;
		}

		if (name == "name") {
			if (value.length < 3) {
				blockDisplay.classList.remove("success");
				blockDisplay.textContent = "Имя не может быть короче 3х символов";
				blockDisplay.classList.add("error");
				isSubmit = true;
				return;
			} else {
				blockDisplay.textContent = "Все хорошо";
				blockDisplay.classList.add("success");
			}
			return;
		}
		if (name == "email") {
			if (
				!value.includes("@") ||
				!value.includes(".") ||
				value.startsWith("@")
			) {
				blockDisplay.classList.remove("success");
				blockDisplay.textContent = "Ввидите корректный почтоый ящик";
				blockDisplay.classList.add("error");
				isSubmit = true;

				return;
			} else {
				blockDisplay.textContent = "Все хорошо";
				blockDisplay.classList.add("success");
			}
			return;
		}
		if (name == "message") {
			if (value.length < 15) {
				blockDisplay.classList.remove("success");
				blockDisplay.textContent = "Сообщения не может быть короче 15 символов";
				blockDisplay.classList.add("error");
				isSubmit = true;

				return;
			} else {
				blockDisplay.textContent = "Все хорошо";
				blockDisplay.classList.add("success");
			}
			return;
		}
	});
	btnSubmitFrom3.disabled = isSubmit;
});

from3.addEventListener("submit", (e) => {
	e.preventDefault();

	let displayForm3 = document.querySelector(".displayForm3");

	displayForm3.textContent = "Спасибо, что отправили нам форму";

	btnSubmitFrom3.value = "Отправка....";
	btnSubmitFrom3.disabled = true;
	from3.reset();

	let errordisplay = from3.querySelectorAll("[class*='-error']");
	errordisplay.forEach((item) => {
		item.textContent = "";
		item.classList.remove("error", "success");
	});

	setTimeout(() => {
		displayForm3.textContent = "";
		btnSubmitFrom3.value = "Отправить";
	}, 3000);
});
