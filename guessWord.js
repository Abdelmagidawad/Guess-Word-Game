// Game Name
let gameName = "Guess The World";
document.title = gameName;
document.querySelector(".main-title h1").innerHTML = gameName;
document.querySelector("footer").prepend(`${gameName} Game Created By `);

// Game Options
let numberofTries = 5;
let numberofLetters = 6;
let currentTry = 1;

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

window.addEventListener("load", generateTryDiv);
