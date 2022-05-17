const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};
	console.log(newUser);
	addData(newUser);
}
//Double Money
function doubleMoney() {
	data = data.map((user) => {
		return { ...user, money: user.money * 2 };
	});
	updateDom();
}
//Add new obj to the data array
function addData(obj) {
	data.push(obj);
	updateDom();
}

//Short by richest
function sortByRichest() {
	data.sort((a, b) => b.money - a.money);
	updateDom();
}

//Filter Only Millionaires
function showMillionaires() {
	data = data.filter((user) => user.money > 1000000);
	updateDom();
}

//Calculate Total Wealth
function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc += user.money), 0);

	const wealthElement = document.createElement('div');
	wealthElement.innerHTML = ` <h3>Total Wealth <strong>${formatMoney(
		+wealth
	)} </strong </h3>`;
	main.appendChild(wealthElement);
}

//Update DOM
function updateDom(providedData = data) {
	//Clear the main div
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	providedData.forEach((item, index, arr) => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> $${formatMoney(
			item.money
		)}`;
		main.appendChild(element);
	});
}

// Format number as money
function formatMoney(number) {
	return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
