// =====================BUTTONS JS STARTS HERE================== //
// =====================BUTTONS JS ENDS   HERE================== //

// ======================TIMER JS STARTS HERE=================== //
let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// function to display timer
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

// function to display when timer ends
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Time's up at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}!`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
// ======================TIMER JS ENDS   HERE=================== //

// --------------------TODO JS STARTS HERE---------------------- //
// --------------------TODO JS ENDS   HERE---------------------- //

// -------------------WEATHER JS STARTS HERE-------------------- //
// -------------------WEATER JS ENDS   HERE--------------------- //

// -------------------SETTINGS JS STARTS HERE------------------- //
// -------------------SETTINGS JS ENDS   HERE------------------- //

// --------------------TIMEDATE JS STARTS HERE------------------ //
// --------------------TIMEDATE JS ENDS   HERE------------------ //

// ====================ANIMATION JS STARTS HERE================= //
// ====================ANIMATION JS ENDS   HERE================= //
