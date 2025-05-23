let block = document.querySelector(".block");

block.addEventListener("mousemove", (e) => {
	console.clear();
	const rect = block.getBoundingClientRect();

	const localX = e.clientX - rect.left;
	const localY = e.clientY - rect.top;
	console.log(rect.top);
	console.log(e.clientX);
	console.log(block.offsetParent);

	console.log("clienX " + localX);
	console.log("clientY " + localY);
});
