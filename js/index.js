// const resultButton = document.querySelector(".show-result");

const expenses = {
	"2023-01": {
		"01": {
			food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
			fuel: [210.22],
		},
		"09": {
			food: [11.9],
			fuel: [190.22],
		},
	},
	"2023-03": {
		"07": {
			food: [20, 11.9, 30.2, 11.9],
		},
		"04": {
			food: [10.2, 11.5, 2.5],
			fuel: [],
		},
	},
	"2023-04": {},
	"2023-12": {
		"07": {
			food: [20, 11.9, 30.2, 11.9],
		},
	},
	aaaa: {},
};

// const objectOfMonth = () => {
//     const a = {};
// 	for (let i of Object.keys(expenses)) {
// 		for (let j of Object.keys(expenses[i])) {
//             const day = expenses[i][j];
//             const dayExpenses = [...(day.food ||[]), ...(day.fuel ||[])];
//             const sumDayExpenses = dayExpenses.reduce(
//                 (accumulator, currentValue) => accumulator + currentValue, 0,
//             )
//             const yearMonthDayKey = i + '-' + j;
//             a[yearMonthDayKey] = sumDayExpenses;
// 		}
// 	}

//     const b = {};
//     for (let dateString of Object.keys(a)) {
//         const date = new Date(dateString);
//         const dayOfMonth = date.getUTCDate();
//         if (dayOfMonth <= 7 && date.getUTCDay() === 0) {

//         }
//     }
//     console.log(a);
//     console.log(b);
// };

// objectOfMonth();
const monthMap = {};

for (let monthKey in expenses) {
	// czy monthKey to nie miesiąc, to continue
	const sanitizeMonth = sanitizeMonthAndYear(monthKey);
	if (sanitizeMonth === undefined) {
		continue;
	}
	const safeMonthKey = `${sanitizeMonth.year}-${sanitizeMonth.month + 1}`;
	// jeśli miesiąc i rok nie jest w monthMap to stwórz nowy array dla tego klucza
	if (!monthMap[safeMonthKey]) {
		monthMap[safeMonthKey] = [];
	}
	for (let dateKey in expenses[monthKey]) {
		// czy wartość j to rzeczywisty dzień w whichMonth
		const check = isRealDay(dateKey, sanitizeMonth);
		if (!check) {
			console.log(check, dateKey, sanitizeMonth);
			continue;
		}
		// czy to jest pierwsza niedziela miesiąca
		const checkIfFirstSunday = firstSundayOfMonth(realDay, sanitizeMonth);
		// jeżeli nie pierwsza niedziela to dodaj do whichMonth (++) - po dodaniu ta data wciąż musi się mieścić w przedziale 0-11
		sanitizeMonth.month = sanitizeMonth.month + checkIfFirstSunday;
		console.log(checkIfFirstSunday);
		// jeżeli nie to zmerdżuj array'e
		// console.log(Object.keys(expenses[monthKey][dateKey]));
		for (let expensesKey in expenses[monthKey][dateKey]) {
			// jeśli nie ma wartości w expensesKey lub ta wartość nie jest array'em to continue
			// czy wartość jest liczbą
			// pozbądź się wszystkiego co nie jest liczbą
			// teraz zrób merge do tabeli monthMap
			console.log(getFirstSunday(sanitizeMonth));
		}
	}
}

function sanitizeMonthAndYear(monthKey) {
	try {
		let ourDate = {
			month: new Date(monthKey).getUTCMonth(),
			year: new Date(monthKey).getUTCFullYear(),
		};
		return isNaN(ourDate.month) || isNaN(ourDate.year) ? undefined : ourDate;
	} catch (error) {}

	return undefined;
}

function isRealDay(dateKey, sanitizeMonth) {
	// sprawdź czy to rzeczywisty dzień (liczba od 28 do 31, nie może być większa)
	// sprawdzić czy dany miesiąc ma tyle dni
	// zbuduj string year-month-day i sprawdź czy się zgadza z danymi, jak nie to error (odrzuć)
	// chcemy aby metoda zwracała wartości od 0-31 gdzie 0 to error/invalid
	try {
		let realDay = parseInt(dateKey);
		if (realDay > 31 && realDay < 1) {
			console.log("realDay", realDay);
			return 0;
		}
		const dateCheck = new Date(
			`${sanitizeMonth.year}-${sanitizeMonth.month + 1}-${realDay}`
		);
		if (!dateCheck?.getUTCDate()) {
			console.log("dateCheck", dateCheck);
			return 0;
		}
		const ifDateYearMonthMatches =
			dateCheck.getUTCFullYear() === sanitizeMonth.year &&
			dateCheck.getUTCMonth() === sanitizeMonth.month + 1 &&
			dateCheck.getUTCDate() === realDay;
		if (!ifDateYearMonthMatches) {
			console.log(
				"dateCheck.getUTCFullYear",
				dateCheck.getUTCFullYear(),
				sanitizeMonth.year
			);
			console.log(
				"dateCheck.getUTCMonth",
				dateCheck.getUTCMonth(),
				sanitizeMonth.month + 1
			);
			console.log("getUTCDate", dateCheck.getUTCDate(), realDay);
			console.log("dateCheck", dateCheck);
			return 0;
		}
		return realDay;
	} catch (error) {
		console.log(error);
	}
	return 0;
}

function firstSundayOfMonth(realDay, sanitizeMonth) {
	// jeżeli jest > niż 7 to to kolejna niedziela
	// znajdź pierwszą niedzielę
	// porównaj czy ta niedziela jest PRZED naszą datą

	if (realDay > 7) {
		return 1;
	}
	const firstSunday = getFirstSunday(sanitizeMonth);
	// porównaj czy ta niedziela jest PRZED naszą datą
	const givenDay = new Date(
		`${sanitizeMonth.year}-${sanitizeMonth.month + 1}-${realDay}`
	);
	// jeżeli givenDay > firstSunday to zwraca +1, jeśli nie to 0
	return givenDay > firstSunday ? 1 : 0;
}

function getFirstSunday(sanitizeMonth) {
	let date = new Date(`${sanitizeMonth.year}-${sanitizeMonth.month + 1}-${1}`);
	while (date.getUTCDay() !== 0) {
		date.setUTCDate(date.getUTCDate() + 1);
	}
	console.log(sanitizeMonth);
	return date;
}

// posortuj po każdym kluczu rosnąco

// do kiedy jest 1 niedziela miesiaca

// od kiedy start

// const calculateExpenses = (data) => {
//     const yearMonthKeys = Object.keys(data).sort();
//     const startYearMoth = yearMonthKeys[0];
//     const endYearMonth = yearMonthKeys[yearMonthKeys.length - 1];

//     let [currentYear, currentMonth] = startDate.split('-');
//     let currentDay = 1;

//     while(dateStringBuilder(currentYear, currentMonth) !== endYearMonth) {
//         cu
//     }

//     if (lastDayOfMonth) {
//         currentMonth++
//     }

//     1 stycznia

//     if (data)[currentYear '-' + currentMonth ] {

//     }
//     data[2023-01-01] = undefined;

//     currentDay++;

//     data[2023-01-02];

// 	console.log(startDate);
// };

// const dateStringBuilder = (year, month, day) => {
//     const separator = '-';

//     return [year, month, day].filter(val => !!val).join(separator);
// }

// calculateExpenses(expenses);

// const firstJanuary = new Date("2023-01-01");
// const isSun = firstJanuary.getUTCDay();
// const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// console.log(dayNames[isSun]);
// console.log(firstJanuary);

// const calculateExpenses = (data) => {
// 	const startDate = Object.keys(data)[0];
// };

// calculateExpenses(expenses);

// const sortDates = () => {
// console.log(Object.keys(Object.keys(expenses)[0]));
// }

// sortDates();

// resultButton.addEventListener("click", () => {
// 	const finalResult = document.querySelector(".result");
// 	finalResult.textContent = getMedian(expenses);
// });
