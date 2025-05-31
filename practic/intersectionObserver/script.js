let imgs = document.querySelectorAll("img");

const observe = new IntersectionObserver(
	(entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let dataSrc = entry.target.getAttribute("data-src");
				entry.target.setAttribute("src", dataSrc);
				entry.target.classList.add("loaded");
				obs.unobserve(entry.target);
			}
		});
	},
	{
		rootMargin: "200px", // загружай заранее
		threshold: 0.01
	}
);

imgs.forEach((img) => {
	observe.observe(img);
});
