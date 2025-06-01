const formConfig = [
	{
		type: "text",
		name: "username",
		label: "Имя пользователя",
		placeholder: "Введите имя",
		required: true,
		hint: "От 3 до 20 символов",
		validate: (value) => value.length >= 3 && value.length <= 20,
		errorMessage: "Имя должно быть от 3 до 20 символов"
	},
	{
		type: "email",
		name: "email",
		label: "Электронная почта",
		placeholder: "you@example.com"
	},
	{
		type: "checkbox",
		name: "agree",
		label: "Согласен с условиями"
	},
	{
		type: "submit",
		value: "Отправить"
	}
];

function createFormFromConfiga(config) {
	if (!Array.isArray(config)) return;
	let formElements = document.createElement("form");
	formElements.setAttribute("novalidate", "true");
	formElements.className = "group-form";
	config.forEach((item, index) => {
		let element = createDomInput(
			++index,
			item.type,
			item.name,
			item.label,
			item.placeholder,
			item.value,
			item.required,
			item.hint
		);
		formElements.append(
			element.labelElement || "",
			element.input,
			element.errorInputMessage || "",
			element.hintElemntHelp || ""
		);
	});
	return formElements;
}
function createDomInput(
	id,
	type,
	name,
	label,
	placeholder,
	value,
	required,
	hint
) {
	let labelElement = null;
	let input = document.createElement("input");
	let errorInputMessage = null;
	let hintElemntHelp = null;

	if (type !== "submit") {
		hintElemntHelp = document.createElement("div");
		hintElemntHelp.textContent = hint ? hint : "";
		hintElemntHelp.className = "hint";
		errorInputMessage = document.createElement("div");
		errorInputMessage.className = `${name}-error`;
	}

	input.setAttribute("id", `input-${id}`);
	input.setAttribute("type", type);

	hasUndefiendCheck(name, () => {
		input.setAttribute("name", name);
	});
	hasUndefiendCheck(placeholder, () => {
		input.setAttribute("placeholder", placeholder);
	});
	hasUndefiendCheck(value, () => {
		input.setAttribute("value", value);
	});
	hasUndefiendCheck(label, () => {
		labelElement = document.createElement("label");
		labelElement.setAttribute("for", `input-${id}`);
		labelElement.textContent = label;
	});

	hasUndefiendCheck(required, () => {
		input.required = required;
	});

	return { input, labelElement, errorInputMessage, hintElemntHelp };
}

function hasUndefiendCheck(typeEl, cb) {
	if (typeof typeEl !== "undefined") {
		return cb();
	}
}

document.body.append(createFormFromConfiga(formConfig));

const form = document.querySelector(".group-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
});
