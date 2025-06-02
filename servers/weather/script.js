class Weather {
	#apiKey = "8cfa0de29d98df69fd67dc5768974b51";
	#url = "https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=";

	constructor() {}

	get url() {
		return this.#url + this.#apiKey;
	}
	async getWeather() {
		try {
			let response = await fetch(this.url);
			if (!response.ok) throw new Error(`Status: ${response.status}`);
			let data = await response.json();
			console.log(response.headers);
			response.headers.forEach((item, key) => console.log(key));
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	fieldProduct(tag, content) {
		const result = document.createElement(tag);
		result.textContent = content;
		return result;
	}
}

let weather = new Weather();
weather.getWeather();
