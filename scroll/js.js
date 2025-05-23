const scroll1 = document.querySelector(".scroll");
const display = document.querySelector(".display");
const progressBar = document.querySelector(".progress-bar");

scroll1.addEventListener("scroll", (e) => {
	const scrollPos = scroll1.scrollTop;
	const scrollHeight = scroll1.scrollHeight;
	const visibleHeight = scroll1.clientHeight;

	display.textContent = scroll1.scrollTop;

	if (scrollPos + visibleHeight >= scrollHeight - 1) {
		display.textContent = "Вы дочитали до конца!";
	}

	const prog = Math.round((scrollPos / (scrollHeight - visibleHeight)) * 100);

	let container = progressBar.closest(".progress-container");
	let p = container.querySelector(".progress-text");
	p.textContent = prog + "%";

	// .innerHTML = prog + "%";
	progressBar.style.width = prog + "%";
});

window.addEventListener("scroll", () => {
	console.clear("-");
	console.log(window.scrollY);
	console.log(document.documentElement.clientHeight);
});

const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
	progressBar.scrollIntoView({ behavior: "smooth" });
});
