/**
 * This variable represents the entire list of race data. It calls the
 * `fetchFormula1Data()` function that builds a (random) datastructure. You are
 * supposed to work with this variable in your project.
 *
 * WARNING: do not change or delete this code
 */
const racedata = fetchFormula1Data();

function getHumanReadableTime(time) {
	let output = "";
	const minutes = parseInt(Math.floor(time / 60));
	console.log(time);
	const seconds = (time % 60).toFixed(3);
	if (minutes > 0) {
		output += minutes.toString() + ":";
		if (seconds < 10.0) {
			output += "0";
		}
	} else {
		//I couldn't come up with logical use of else here ngl
		console.log("cool");
	}
	output += seconds;
	return output;
}

function createTableRowContent(tableRow, driverName, time) {
	const tableDriver = document.createElement("td");
	const tableTime = document.createElement("td");
	tableTime.classList.add("time");
	tableTime.innerHTML += getHumanReadableTime(time);
	tableDriver.innerHTML += driverName;
	tableRow.appendChild(tableDriver);
	tableRow.appendChild(tableTime);
}

function updateList() {
	const laps = document.getElementById("laps");
	const selectDriver = document.getElementById("driver");
	laps.innerHTML = "";
	selectDriver.innerHTML = "";

	console.log(racedata);
	let minTime = 4e100;
	let fastestDriver = "";

	racedata.forEach(function (driver) {
		console.log(driver);
		const option = document.createElement("option");
		option.value = driver.carNumber;
		option.innerHTML = driver.name;
		selectDriver.appendChild(option);
		let totalTime = 0;
		driver.laps.forEach(function (lap) {
			totalTime += lap;
			if (lap < minTime) {
				minTime = lap;
				fastestDriver = driver.name;
			}
		});
		const tableRow = document.createElement("tr");
		createTableRowContent(tableRow, driver.name, totalTime);
		laps.appendChild(tableRow);
	});
	const fastest = document.getElementById("fastest");
	fastest.innerHTML = "";
	createTableRowContent(fastest, fastestDriver, minTime);
}

function handleClick() {
	const input = getUserInput();
	const object = racedata.find(
		(current) => current.carNumber === input.carNumber
	);
	console.log(object);
	object.laps.push(input.lapTime);
	updateList();
}

/**
 * Initializes the app. This function is called when the page is fully loaded
 * (the window load event).
 */
function init() {
	updateList();
	const button = (document = document.getElementById("submit"));
	button.addEventListener("click", handleClick);
}
// REgister the `init` function on the load event (when the DOM is ready).
window.addEventListener("load", init);

//TODO add other code here

/**
 * ******************** NOTICE **************************
 * The methods below are provided for your convenience.
 * You're allowed to use them, but this is not mandatory.
 * ******************************************************
 */

/**
 * Returns an object containing the values of the user input. The object is
 * structured as follows:
 *  - `carNumber` - holds the car number of the driver selected by the user.
 *    this is the `value` attribute of the selected `<option>`.
 *  - `lapTime` - holds the content of the lapTime input converted to a number
 *
 * @returns an object containing the values of the user input
 */
function getUserInput() {
	return {
		// use `parseInt()` to convert a string into a number
		carNumber: parseInt(document.getElementById("driver").value),
		// use `parseFloat()` to convert a string into a number
		lapTime: parseFloat(document.getElementById("lapTime").value),
	};
}
