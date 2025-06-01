// function getApi(name) {
// 	return new Promise((res, rej) => {
// 		if (name == "vlad") {
// 			res({
// 				name: 203,
// 				age: 90
// 			});
// 		} else {
// 			rej(new Error("Ошибка авторизации"));
// 		}
// 	});
// }

// getApi("vlad")
// 	.then((data) => data)
// 	.catch((error) => {
// 		console.log(error);
// 	});

// async function test() {
// 	try {
// 		let response = await getApi("vl2ad");
// 		console.log(response);
// 	} catch (e) {
// 		console.error(e.name);
// 		console.error(e.message);
// 	}
// }
// test();

async function fetchTesting(url, timer = 3000) {
	const control = new AbortController();

	const timeoutId = setTimeout(() => {
		control.abort();
	}, timer);

	try {
		let response = await fetch(url, { signal: control.signal });

		if (!response.ok) {
			throw new Error(`HTTP ошибка: ${response.status}`);
		}

		let data = await response.json();
		clearTimeout(timeoutId);
		document.querySelector(".load-active").remove();
		forMytest(data);
	} catch (error) {
		if (error.name == "AbortError") console.log("Запрос отменён вручную");
		else {
			console.error("Ошибка запроса:", error.message);
		}
	}
}
fetchTesting("https://jsonplaceholder.typicode.com/posts");

function forMytest(data) {
	if (!Array.isArray(data)) return;
	data.forEach((element) => {
		document.body.append(fieldProduct("p", element.title));
	});
}
function fieldProduct(tag, content) {
	const result = document.createElement(tag);
	result.textContent = content;
	return result;
}
const loader = document.createElement("p");
loader.classList.add("load-active");
loader.textContent = "Загрузка...";
document.body.append(loader);
