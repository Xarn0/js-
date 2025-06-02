class FetchApi {
	#url;
	#loaderSelector = "loader";
	#loaderActivator = "active";
	constructor(url) {
		this.#url = url;
	}
	get url() {
		return this.#url;
	}

	get loaderSelector() {
		return this.#loaderSelector;
	}
	set loaderSelector(value) {
		return (this.#loaderSelector = value);
	}
	get loaderActivator() {
		return this.#loaderActivator;
	}
	set loaderActivator(value) {
		return (this.#loaderActivator = value);
	}
	async retryFetch(retries = 3, delay = 1000) {
		const controller = new AbortController();
		let attempt = 0;
		while (attempt < retries) {
			try {
				let response = await fetch(this.url, { signal: controller.signal });
				if (!response.ok) throw new Error(`status ${response.status}`);
				let data = await response.json();
				console.log(data);
				return data;
			} catch (error) {
				if (error.name == "AbortError") {
					console.log("canсel in hand");
					break;
				}
				attempt++;

				console.warn(
					`попытка ${attempt} не удалась, попричине: ${error.message} `
				);

				if (attempt < retries) {
					await this.#wait(delay);
				} else {
					console.log(`попытки закончились!`);
					this.loaderDeactive();
					break;
				}
			}
		}
	}
	#wait(ms) {
		return new Promise((res) => {
			setTimeout(res, ms);
		});
	}

	loaderActive() {
		document
			.querySelector(`.${this.loaderSelector}`)
			.classList.add(this.loaderActivator);
	}
	loaderDeactive() {
		document
			.querySelector(`.${this.loaderSelector}`)
			.classList.remove(this.loaderActivator);
	}
}
const api = new FetchApi("https://jsonplaceholder.typicode.com/posts");

// Старт
document.querySelector(".start").addEventListener("click", () => {
	api.loaderActive();
	api.retryFetch(5, 1500); // до 5 попыток, каждая через 1.5 секунды
});
