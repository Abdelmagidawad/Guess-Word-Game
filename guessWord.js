// Game Name
let gameName = "Guess The World";
document.title = gameName;
document.querySelector(".main-title h1").innerHTML = gameName;
document.querySelector("footer").prepend(`${gameName} Game Created By `);

// Game Options
let numberofTries = 5;
let numberofLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let massageContainer = document.querySelector(".massage");

// Manage Hints
let containerNumHints = document.querySelector(".hint span");
containerNumHints.innerHTML = numberOfHints;
const hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);

function generateTryDiv() {
  const inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numberofTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    generateInputs(i, tryDiv);

    inputsContainer.append(tryDiv);
  }

  inputsContainer.children[0].children[1].focus();

  //Disable all inputs expect first One
  disabledAllInputs();
  //
  const inputs = document.querySelectorAll("input");
  // Convert Input To Uppercase and focus next
  convertInputToUpperAndFocus(inputs);

  //Move To next and previous Input
  moveToRightAndLeft(inputs);
}

function generateInputs(Iterable, tryDiv) {
  for (let i = 1; i <= numberofLetters; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `guess-${Iterable}-letter-${i}`;
    input.setAttribute("maxlength", "1");
    tryDiv.append(input);
  }
}

function disabledAllInputs() {
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );

  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
}

function convertInputToUpperAndFocus(inputs) {
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
  });
}

function moveToRightAndLeft(inputs) {
  inputs.forEach((input) => {
    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".control .check");

guessButton.addEventListener("click", handleGuesses);

//
console.log(wordGuess);

function handleGuesses() {
  let successGuess = true;
  //
  console.log(wordGuess);

  // Game Logic
  successGuess = checkLetter(successGuess);

  // Check If User Win Or Lose
  if (successGuess) {
    massageContainer.innerHTML = `You Win The Word Is <span>${wordGuess}</span>`;

    // Disabled All inputs  and guessButton
    let allTries = document.querySelectorAll(".inputs >div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let elTry = document.querySelector(`.try-${currentTry}`);
    checkTryExist(elTry);
  }
}

function checkLetter(successGuess) {
  for (let i = 1; i <= numberofLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordGuess[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
      successGuess = true;
    } else if (wordGuess.includes(letter) && letter !== "") {
      // Letter Is Correct and not In Palce
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }
  return successGuess;
}

function checkTryExist(elTry) {
  if (elTry) {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.remove("disabled-inputs");
    elTry.children[1].focus();
  } else {
    guessButton.disabled = true;
    massageContainer.innerHTML = `You Lose The Word Is <span>${wordGuess}</span>`;
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    containerNumHints.innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    hintButton.disabled = true;
  }
  // Hint To Fill Random Empty Inputs
  hintFillEmptyInputs();
}

function hintFillEmptyInputs() {
  let enabledInputs = document.querySelectorAll("input:not([disabled])");
  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordGuess[indexToFill].toUpperCase();
    }
  }
}

window.addEventListener("load", generateTryDiv);
