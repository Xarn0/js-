class FetchApi {
	#url;
	controlSignal;
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
	async postFetch(data) {
		try {
			let response = await fetch(this.url, {
				method: "POST",
				body: JSON.stringify(data)
			});
			if (!response.ok) throw new Error("Статус нет 200");
			let responseData = await response.json();
			console.log(responseData);
		} catch (err) {
			console.error(err.message);
		}
	}
	async getFetch() {
		this.controlSignal = new AbortController();

		try {
			let response = await fetch(this.url, {
				signal: this.controlSignal.signal
			});
			if (!response.ok) throw new Error(`Статус ${response.status}`);
			let responseData = await response.json();
			responseData.forEach((item) => {
				document
					.querySelector(".view")
					.append(this.fieldProduct("p", item.title));
			});
		} catch (error) {
			if (error.name == "AbortError") console.warn("было прервано....");
			else {
				console.error("Ошибка GET:", error.message);
			}
			console.error(error.message);
		}
	}
	getAbortController() {
		if (!this.controlSignal) return;
		this.controlSignal.abort();
		this.loaderDeactive();
	}
	start(selector) {
		document.querySelector(`.${selector}`).addEventListener("click", () => {
			this.loaderActive();
			this.getFetch().finally(() => this.loaderDeactive());
		});
	}
	stop(selector) {
		document.querySelector(`.${selector}`).addEventListener("click", () => {
			this.getAbortController();
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
	fieldProduct(tag, content) {
		const result = document.createElement(tag);
		result.textContent = content;
		return result;
	}
}

const obj = new FetchApi("https://jsonplaceholder.typicode.com/posts");
obj.loaderSelector = "loader";
obj.loaderActivator = "active";
obj.start("start");
obj.stop("stop");
console.log(obj);
