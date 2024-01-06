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

window.addEventListener("load", generateTryDiv);
