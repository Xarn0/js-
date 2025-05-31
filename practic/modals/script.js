const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const close = modal.querySelector(".close");

const btnOpen = document.querySelector(".open");

btnOpen.addEventListener("click", () => {
	openModal();
});
close.addEventListener("click", () => {
	closeModal();
});
overlay.addEventListener("click", () => {
	closeModal();
});
function openModal() {
	requestAnimationFrame(() => {
		modal.setAttribute("aria-hidden", "false");
		modal.style.display = "block";
		scrollbody(false);
		requestAnimationFrame(() => (modal.style.opacity = 1));
		document.addEventListener("keydown", keyCloseModal);
		modal.focus();
	});
}
function closeModal() {
	modal.style.opacity = 0;
	modal.setAttribute("aria-hidden", "true");
	setTimeout(() => {
		modal.style.display = "none";
		scrollbody(true);
		document.removeEventListener("keydown", keyCloseModal);
		btnOpen.focus();
	}, 1000);
}

function keyCloseModal(e) {
	if (e.key == "Escape") {
		closeModal();
	}
}
function scrollbody(bool) {
	document.body.style.overflow = bool ? "auto" : "hidden";
}
