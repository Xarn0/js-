const nav = document.querySelector(".nav");
const view = document.querySelector(".view");

const pages = {
	home: "🏠 Добро пожаловать на главную страницу!",
	products: "📦 Здесь список наших товаров.",
	contact: "📞 Свяжитесь с нами любым удобным способом."
};

nav.addEventListener("click", (e) => {
	let page = e.target.dataset.page || "home";
	if (!page) return;

	history.pushState({ page }, "", page);
	updatePage(page);
});

function updatePage(page = "home") {
	if (!(page in pages)) {
		// Если такой страницы нет, отправляем на главную
		history.replaceState({ page: "home" }, "", "home");
		page = "home";
	}
	view.textContent = pages[page] || "страницы нету";
}

window.addEventListener("popstate", (e) => {
	let page = e.state?.page;
	updatePage(page);
});

window.addEventListener("DOMContentLoaded", () => {
	const path = location.pathname.slice(1) || "home";
	updatePage(path);
});
