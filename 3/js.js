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
		console.log(!value.trim());
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
