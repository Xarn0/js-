async function fetchGet(url) {
	try {
		list.innerHTML = "";
		let response = await fetch(url);
		if (!response.ok) throw new Error(`error ${response.status}`);
		let data = await response.json();
		dataForEach(data.slice(0, 3));
	} catch (error) {
		console.error(error);
	}
}
function dataForEach(data) {
	data.forEach((item) => {
		if (!list) return;
		let li = document.createElement("li");
		li.className = "card";
		li.append(
			fieldProduct("p", item.name),
			fieldProduct("p", item.email),
			fieldProduct("div", item.body)
		);

		document.querySelector("#commentsList").append(li);
	});
}
function fieldProduct(tag, content) {
	const result = document.createElement(tag);
	result.textContent = content;
	return result;
}
const list = document.querySelector("#commentsList");

list.innerHTML = "Загрузка...";
fetchGet("https://jsonplaceholder.typicode.com/comments");

async function fetchPost(url, data) {
	try {
		let response = await fetch(url, {
			body: data,
			headers: {
				"X-Logvin-Test": "5687"
			},
			method: "POST"
		});
		if (!response.ok) throw new Error(`Status${response.status}`);
		let result = await response.json();
		console.log("Ответ от сервера:", result);
	} catch (error) {
		console.error(error);
	}
}
let form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let formdata = new FormData(form);
	// console.log(JSON.stringify(formdata));
	let obj = {
		name: "3ooe",
		age: 90
	};
	fetchPost("http://localhost:3000/lis", formdata);
});
// ;
