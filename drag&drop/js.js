const el = document.querySelectorAll(".draggable");

el.forEach((item) => {
	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;

	item.addEventListener("mousedown", (e) => {
		isDragging = true;
		offsetX = e.clientX - item.offsetLeft;

		offsetY = e.clientY - item.offsetTop;
		item.style.cursor = "grabbing";
	});

	document.addEventListener("mousemove", (e) => {
		if (!isDragging) return;

		item.style.left = `${e.clientX - offsetX}px`;
		item.style.top = `${e.clientY - offsetY}px`;
	});

	document.addEventListener("mouseup", () => {
		if (isDragging) {
			isDragging = false;
			item.style.cursor = "grab";
		}
	});
});
