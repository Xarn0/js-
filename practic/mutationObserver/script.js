const btnAdd = document.querySelector(".addBox");
const box = document.querySelector(".box");
let removeBoxChild = new Set();
btnAdd.addEventListener("click", () => {
	let arr = [33, 44];
	let random = Math.round(Math.random());
	let element = document.createElement("div");
	element.classList.add("delete");
	element.textContent = `${arr[random]}`;
	box.insertAdjacentElement("beforeend", element);
});
box.addEventListener("click", (e) => {
	let parent = e.target.closest(".delete");
	if (parent) {
		parent.remove();
	}
});

let observer = new MutationObserver((mutations) => {
	for (let mutation of mutations) {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach((node) => {
				if (node.textContent == "33") {
					node.classList.add("active");
				}
			});
			mutation.removedNodes.forEach((node) =>
				removeBoxChild.add(node.textContent)
			);
		}
	}
});
observer.observe(box, {
	childList: true,
	attributes: true,
	subtree: true
});

let resize = new ResizeObserver((entries) => {
	entries.forEach((entry) => {
		requestAnimationFrame(() => {
			if (entry.borderBoxSize[0].blockSize >= 350) {
				entry.target.style.background = "#77f";
			} else {
				entry.target.style.background = "#fff";
			}
		});
	});
});
resize.observe(box);
