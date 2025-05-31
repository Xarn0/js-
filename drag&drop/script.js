//!  dragon-drop -----------------------------------------------------
const zones = document.querySelectorAll(".gragon-zone__container");
let dragoned = null;

let timerIdForTextCard = null;
let flagFortextCard = false;

document.querySelectorAll(".card").forEach((card) => {
	card.addEventListener("pointerdown", (e) => {
		dragoned = card;
		card.classList.add("active");
	});
	card.addEventListener("click", (e) => {
		if (e.target.classList.contains("card__text")) {
			if (e.target.classList.contains("active")) {
				e.target.classList.remove("active");
				e.target.style.maxHeight = 35 + "px";
			} else {
				e.target.classList.add("active");
				e.target.style.maxHeight = e.target.scrollHeight + "px";
			}
			e.stopPropagation();
		}
	});

	card.addEventListener("mouseout", (e) => {
		if (e.target.classList.contains("card__text")) {
			timerIdForTextCard = setTimeout(() => {
				e.target.classList.remove("active");
				e.target.style.maxHeight = 35 + "px";
			}, 10000);
		}
	});
});

document.addEventListener("mousemove", (e) => {
	if (!dragoned) return;

	let hovered = document.elementFromPoint(e.clientX, e.clientY);

	if (!hovered) return;

	let targetCard = hovered.closest(".card");

	zones.forEach((zone) => {
		if (!zone.children.length) {
			let p = document.createElement("p");
			p.classList.add("p-empty");
			p.textContent = "пусто";
			zone.append(p);
		} else if (zone.children.length > 1) {
			zone.querySelector(".p-empty")?.remove();
		}

		if (
			zone.contains(hovered) &&
			!targetCard &&
			dragoned &&
			zone !== dragoned.parentElement
		) {
			zone.appendChild(dragoned);
		}
		if (targetCard && targetCard !== dragoned && zone.contains(targetCard)) {
			let rect = targetCard.getBoundingClientRect();
			let isAbove = e.clientY < rect.top + rect.height / 2;

			if (isAbove) {
				zone.insertBefore(dragoned, targetCard);
			} else {
				zone.insertBefore(dragoned, targetCard.nextElementSibling);
			}
		}

		let leng = zone.closest(".gragon-zone").querySelector(".leng");
		if (
			zone.children.length == 1 &&
			zone.children[0].classList.contains("p-empty")
		) {
			leng.textContent = 0;
		} else {
			leng.textContent = zone.children.length;
		}
	});
});
document.addEventListener("mouseup", () => {
	if (dragoned) {
		dragoned.classList.remove("active");
		dragoned = null;
	}
});

//! modal -----------------------------------------------
const open = document.querySelector(".open");
const modal = document.querySelector(".modal");
const modaOverlay = document.querySelector(".modal__overlay");
const close = document.querySelector(".close");
let isOpen = false;
open.addEventListener("click", () => {
	if (!isOpen) {
		modal.style.display = "block";
		modal.style.opacity = 0;

		requestAnimationFrame(() => {
			modal.style.opacity = 1;
		});
		document.documentElement.style.overflow = "hidden";
		close.focus();
		isOpen = true;
	}
});
close.addEventListener("click", () => {
	closeModal(1000);
});
modaOverlay.addEventListener("click", () => {
	closeModal(1000);
});

function closeModal(timer = 1000) {
	requestAnimationFrame(() => {
		modal.style.opacity = 0;

		setTimeout(() => {
			modal.style.display = "none";
			document.documentElement.style.overflow = "auto";
			isOpen = false;
		}, timer);
	});
}

document.addEventListener("keydown", (e) => {
	if (e.key == "Escape" && isOpen) {
		closeModal(1000);
	}
});

//! form

const formAddTask = document.querySelector(".form-add-task");
const btnFormAddTask = formAddTask.querySelector("input[type=submit]");

formAddTask.addEventListener("submit", (e) => {
	e.preventDefault();
});
formAddTask.addEventListener("input", (e) => {
	const data = new FormData(formAddTask);
	let hasSubmit = false;
	data.forEach((item, key) => {
		let errorLive = formAddTask.querySelector(`.${key}-error`);

		errorLive.textContent = "";

		if (!item.trim()) {
			errorLive.textContent = "";
			hasSubmit = true;
			return;
		}
		if (key === "taskNumber") {
			let value = Number(item);
			if (Number.isNaN(value)) {
				errorLive.textContent = "Введите пожалуйста номер задча цифрами";
				hasSubmit = true;
				return;
			}

			if (item.length < 3 || item.length > 8) {
				errorLive.textContent = "Номер задачи должен быть от 3 до 8 цифр";
				hasSubmit = true;
				return;
			}
		}
		if (key === "content") {
			if (item.length < 10) {
				errorLive.textContent = "Сообщения должно быть больше 10 символов";
				hasSubmit = true;
				return;
			}
		}
		if (key === "price") {
			let value = Number(item);
			if (Number.isNaN(value)) {
				errorLive.textContent = "Введите цену цифрами";
				hasSubmit = true;
				return;
			}
		}
	});
	btnFormAddTask.disabled = hasSubmit;
});
