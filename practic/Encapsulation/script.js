class User {
	#password;
	#name;
	#age;
	constructor(name, password, age) {
		this.#name = name;
		this.#password = password;
		this.#age = age;
	}
	get name() {
		return this.#name + " 20==";
	}
	get fullName() {
		return `${this.#name};  мне на данный момент ${this.#age}`;
	}
	set age(value) {
		if (typeof value !== "number") {
			console.log("введено не число!");
			return;
		}
		this.#age = value;
	}
	checkPassword(newPassword) {
		return newPassword === this.#password ? "проверка пройдена" : "Не пройдена";
	}
}

let user = new User("vlad", 21312, 21);
console.log(user.name);
user.age = "nhbcnf";
user.age = 43;
console.log(user.fullName);
// console.log(user.checkPassword(213124));
// console.log(user.checkPassword(21312));
// console.log(user.checkPassword("21312fd"));
