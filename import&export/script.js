import all, { roi as proba, MyREl, triimeer } from "./index.js";

// console.log(all.one);
// console.log(proba);
let display = document.querySelector(".display");
let btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
	localStorage.setItem("key34", true);
	location.reload();
});
// if (document.cookie == "token") {
// 	display.textContent = "Вы авторизованные";
// } else {
// 	display.textContent = "Вы не авторизованные";
// }

(async () => {
	let aws = await triimeer();
	// console.log(aws);
})();

let rel = new MyREl("alex");
// console.log(rel.name);
let rel2 = new MyREl("vlad");
// console.log(rel2.name);

class MyError extends Error {
	constructor() {
		super();
		this.name = "моя ошибка";
	}
}

function test() {
	throw new MyError();
}
try {
	test();
} catch (error) {
	// console.log(error.name);
	// console.log(error);
}

class ValidateError extends Error {
	constructor(message) {
		super(message);
		this.name = "Поле пользователя пусто";
	}
}
class AuthError extends Error {
	constructor(message) {
		super(message);
		this.name = "Пароль не подходит";
	}
}

function login(user) {
	if (!user.name) throw new ValidateError("Пользователя нету");
	if (user.password !== 293983) throw new AuthError("пароль неверный");
}

try {
	login({
		name: "user904",
		password: 293983
	});
} catch (error) {
	console.error(error.message);
	console.error(error.name);
}

class ValidateErrorFetch extends Error {
	constructor(message, status) {
		super(message);
		this.name = "ValidateErrorFetch";
		this.status = status;
	}
}
async function FetchApi(url) {
	try {
		let respone = await fetch(url, {
			headers: {
				"User-Agent": "xarn0"
			}
		});
		if (!respone.ok)
			throw new ValidateErrorFetch(
				`Статус : ${respone.status}`,
				respone.status
			);
		let data = await respone.json();
		for (const [key, value] of respone.headers.entries()) {
			console.log(`${key} - ${value}`);
		}
		console.log(respone.headers.get("cache-control"));
		return data;
	} catch (error) {
		console.warn(error.message);
		if (error.status == 404) {
			console.log("такой страницы нету!");
		}
		if (error.status >= 500) {
			console.log("Проблема сервера");
		}
	}
}

// FetchApi("https://jsonplaceholder.typicode.com/posts/1");

async function fetchPost(url, data) {
	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
			credentials: "include"
		});
		if (!response.ok) {
			throw new ValidateErrorFetch(
				`Статус ${response.status}`,
				response.status
			);
		}
	} catch (error) {
		console.error(error.status);
	}
}

fetchPost("http://localhost:3000/lis", { title: "www" });

// sessionStorage.setItem("key34454", "7dje63k4864h847f");
document.cookie = "username=vlad; path=/admin";
document.cookie = "location=russian";
document.cookie = "sessionToken=ABC123; path=/admin";

console.log(document.cookie);
fetch("http://localhost:3000/check", {
	credentials: "include" // 🔥 ОБЯЗАТЕЛЬНО, иначе куки не отправятся!
});
