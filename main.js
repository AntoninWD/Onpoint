/// STEAK DATA
const rare = {
  name: "rare",
  size: ["half", "threeQuarter", "one", "oneHalf", "two"],
  firstSide: [2, 4, 5, 6, 8],
  secondSide: [2, 2, 3, 4, 6],
};

const mediumRare = {
  name: "mediumRare",
  size: ["half", "threeQuarter", "one", "oneHalf", "two"],
  firstSide: [3, 4, 5, 7, 9],
  secondSide: [2, 3, 4, 5, 8],
};

const medium = {
  name: "medium",
  size: ["half", "threeQuarter", "one", "oneHalf", "two"],
  firstSide: [4, 5, 6, 7, 10],
  secondSide: [2, 3, 4, 6, 8],
};

const wellDone = {
  name: "wellDone",
  size: ["half", "threeQuarter", "one", "oneHalf", "two"],
  firstSide: [5, 7, 8, 10, 13],
  secondSide: [3, 5, 6, 8, 11],
};

const steaks = [rare, mediumRare, medium, wellDone];

/////////////////////////

// Document Selector
const readyBtn = document.querySelector(".form__ready__btn");
const startBtn = document.querySelector(".time__start");
const pauseBtn = document.querySelector(".time__pause");
const sideHeader = document.querySelector(".timer__side");
const checkedType = document.querySelectorAll("input[name=type]");
const checkedThick = document.querySelectorAll("input[name=thick]");
const timer = document.querySelector(".time__inner--circle");
const timeContainer = document.querySelector(".timer");
const directions = document.querySelector(".directions");
const arrowButton = document.querySelector(".intro__btn");
const container = document.querySelector(".container");

/////////////////

// variable declaration
let time;
let secTime;
let set;
let firstStart = false;
let isPaused = false;

// Check what is selected
const getChecked = function (select) {
  let check;
  for (const selection of select) {
    if (selection.checked) {
      check = selection.value;
      // console.log(check);
      break;
    }
  }
  return check;
};

//Ending timer sound
function beep() {
  var snd = new Audio(
    "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
  );
  snd.play();
}

////////
const directionsContainer = function (first) {
  if (!first) return;
  getSecondTime();
  directions.innerHTML = ` <div class="directions">
    <h3 class="form__title directions__title">Directions</h3>
    <div class="form__selection directions__container">
    <p>
      Preheat your grill. Place meat over direct heat for ${first} minutes on the first
      side. Grill for another ${secTime} minutes on the second side. Let rest for 5
      minutes. Enjoy.
    </p>
    </div>
  </div>`;
};

//getting steak time data function
//First side
const getFirstTime = function () {
  steaks.forEach((steak) => {
    if (steak.name === getChecked(checkedType)) {
      steak.size.forEach((size, i) => {
        if (size === getChecked(checkedThick)) {
          time = steak.firstSide[i];
          return (time = time * 60);
        }
      });
    }
  });
};
//Second side
const getSecondTime = function () {
  steaks.forEach((steak) => {
    if (steak.name === getChecked(checkedType)) {
      steak.size.forEach((size, i) => {
        if (size === getChecked(checkedThick)) {
          secTime = steak.secondSide[i];

          if (sideHeader.textContent === "Second Side") {
            time = steak.secondSide[i];
            return (time = time * 60);
          }
        }
      });
    }
  });
  return secTime / 60;
};

// start time function
const start = function () {
  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);

  timer.textContent = `${min}:${sec}`;
  // When time reach 0, Second time/side start

  if (time === 0 && sideHeader.textContent === "First Side") {
    beep();

    sideHeader.textContent = "Second Side";
    getSecondTime();
    // time = 5; // testing
    timer.textContent = `${min}:${sec}`;
  }
  if (time === 0 && sideHeader.textContent === "Second Side") {
    beep();

    clearInterval(set);
    sideHeader.textContent = "Steak is Ready!";
    timer.style.color = "#d85b65";
  }

  time--;
};

//Start timer
const startTimer = function () {
  if (!time) return;
  // time = 5; // testing
  isPaused = false;
  if (firstStart === false) {
    set = setInterval(function () {
      !isPaused ? start() : "";
    }, 1000);

    //prevent bug if we click multiple time on the start button
    firstStart = true;
  }
  return set;
};

//stop the timer
const stopTimer = function () {
  isPaused = true;
};

//Add event listener
// Reset everything and get time data
const ready = function () {
  readyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    getFirstTime();
    timer.textContent = "";
    sideHeader.textContent = "First Side";
    timer.style.color = "#ececec";
    timeContainer.classList.remove("hidden");
    firstStart = false;
    clearInterval(set);
    directionsContainer(time / 60);
    sideHeader.scrollIntoView({ behavior: "smooth" });
  });
};
ready();

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", stopTimer);
arrowButton.addEventListener("click", function (e) {
  container.scrollIntoView({ behavior: "smooth" });
});
