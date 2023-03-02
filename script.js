"use strict";
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2023-02-22T23:36:17.929Z",
    "2023-02-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Faruq Ahmed",
  movements: [600, 5200, -150, -490, -2310, -1000, 7600, -300],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-12-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-12-25T14:18:46.235Z",
    "2023-01-05T16:33:06.386Z",
    "2023-01-10T14:43:26.374Z",
    "2023-01-25T18:49:59.371Z",
    "2023-02-26T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-NG",
};
const account4 = {
  owner: "Benard Simon",
  movements: [1100, 3400, -450, -690, -4910, -3400, 9800, -700],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-12-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2022-12-25T14:18:46.235Z",
    "2023-01-05T16:33:06.386Z",
    "2023-01-10T14:43:26.374Z",
    "2023-01-25T18:49:59.371Z",
    "2023-02-26T12:01:20.894Z",
  ],
  currency: "NGN",
  locale: "en-NG",
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const mainTag = document.querySelector("main");
const homePage = document.querySelector(".home-pg");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnLogout = document.querySelector(".logout");
const loginField = document.querySelector(".login");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions
// FIXME: arrange movement data dynamically
const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// FIXME:  format currency base on local

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // FIXME:  calling the Date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    // FIXME: Displaying of movements
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// FIXME: Display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// FIXME: Display summary, income, outcome and interest
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// FIXME: Create username using first later of account owner name
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

// FIXME:  Update and display UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// FIXME: Logout time counter
const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining timer to UI
    labelTimer.textContent = `${min}: ${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
      loginField.style.display = "flex";
      homePage.style.display = "block";
    }

    // decrease 1 seconds
    time--;
  };
  // Set timer for 5min
  let time = 300;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
///////////////////////////////////////
// FIXME: Authorize login base on username and passwords
let currentAccount, timer;

// FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// homePage.style.display = "none";

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // Set UI style after Btn is clicked
    containerApp.style.opacity = 100;
    homePage.style.display = "none";
    // create current date and time
    const now = new Date();
    const options = {
      hour: "numeric", //numeric, 2-digit
      minute: "numeric",
      day: "numeric",
      month: "numeric", //long, short, numeric
      year: "numeric",
      // weekday: 'short', //long, short, numeric
    };

    // FIXME:  Create timer base on user locale
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    loginField.style.display = "none";
    // Calling timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

// FIXME: Btn transfer authorized
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // addng date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// FIXME: Btn loan authorized
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // Add current date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }
  inputLoanAmount.value = "";
});

// FIXME:  Btn logout
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    homePage.style.display = "block";
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

// FIXME:  Btn sort movements
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// FIXME:  Btn Logout
btnLogout.addEventListener("click", (e) => {
  containerApp.style.opacity = 0;
  homePage.style.display = "block";
  loginField.style.display = "flex";
});
