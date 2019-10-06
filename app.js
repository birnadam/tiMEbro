// ====================DISPLAYER JS STARTS HERE================= //
// we'll use this array to toggle visibility on the containers
// the buttons will toggle the boolean to true which will reveal the container
// page display bool in order respectively: todo, settings, weather, timedate
let pageDisplayBool = [false, false, false, false];

const displayer = () => {
  $(".todo").hide();
  $(".settings").hide();
  $(".weather").hide();
  $(".timedate").hide();

  if (pageDisplayBool[0]) {
    $(".todo").show();
  }
  if (pageDisplayBool[1]) {
    $(".settings").show();
  }
  if (pageDisplayBool[2]) {
    $(".weather").show();
  }
  if (pageDisplayBool[3]) {
    $(".timedate").show();
  }
};

displayer();
// ====================DISPLAYER JS ENDS   HERE================= //

// =====================BUTTONS JS STARTS HERE================== //
$(document).on("click", ".buttonTodo", function() {
  if (pageDisplayBool[0]) {
    pageDisplayBool[0] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[0] = true; // show todo container
  }
  pageDisplayBool[1] = false, pageDisplayBool[2] = false, pageDisplayBool[3] = false; // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonSettings", function() {
  if (pageDisplayBool[1]) {
    pageDisplayBool[1] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[1] = true; // show settings container
  }
  pageDisplayBool[0] = false, pageDisplayBool[2] = false, pageDisplayBool[3] = false; // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonWeather", function() {
  if (pageDisplayBool[2]) {
    pageDisplayBool[2] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[2] = true; // show weather container
  }
  pageDisplayBool[1] = false, pageDisplayBool[0] = false, pageDisplayBool[3] = false; // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonTimedate", function() {
  if (pageDisplayBool[3]) {
    pageDisplayBool[3] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[3] = true; // show time/date container
  }
  pageDisplayBool[1] = false, pageDisplayBool[2] = false, pageDisplayBool[0] = false; // hide other containers

  displayer(); // toggle containers
});
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
const addForm = document.querySelector(".add");
// pulls first class with todos in it
const list = document.querySelector(".todos");
// query selector for the input field within the element with search in the class
const search = document.querySelector(".search input");

const generateTemplate = todo => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${todo}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
    `;

  // appends to bottom of list
  list.innerHTML += html;
};
// add todo
addForm.addEventListener("submit", e => {
  e.preventDefault();
  // use .trim() for no white spaces
  const todo = addForm.add.value.trim();

  //   check if todo has length
  if (todo.length) {
    //   then run todo within the generate template
    generateTemplate(todo);
  }
});

// delete todo
list.addEventListener("click", e => {
  // if clicked element with class with delete in it
  if (e.target.classList.contains("delete")) {
    // deletes parent element
    e.target.parentElement.remove();
  }
});


const filterTodos = term => {
//   adds class filtered to those that do not match the term or what was entered into search bar
    Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add("filtered"));
// removes filtered class 
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove("filtered"));
};

// search todo
search.addEventListener("keyup", () => {
  //   what user inputs in search bar
  const term = search.value.trim().toLowerCase();
    // helper function
  filterTodos(term);
});
// --------------------TODO JS ENDS   HERE---------------------- //

// -------------------WEATHER JS STARTS HERE-------------------- //
// -------------------WEATER JS ENDS   HERE--------------------- //

// -------------------SETTINGS JS STARTS HERE------------------- //
// -------------------SETTINGS JS ENDS   HERE------------------- //

// --------------------TIMEDATE JS STARTS HERE------------------ //
// --------------------TIMEDATE JS ENDS   HERE------------------ //

// ====================ANIMATION JS STARTS HERE================= //
const background = document.querySelector(".background");
const icon1 = document.querySelector(".buttonTodo");
const icon2 = document.querySelector(".buttonWeather");
const icon3 = document.querySelector(".buttonSettings");
const icon4 = document.querySelector(".buttonTimedate");

const t1 = new TimelineMax();

t1.fromTo(
  background,
  2.2,
  { width: "0%" },
  { width: "100%", ease: Power2.easeInOut }
)
  .fromTo(
    timerDisplay,
    2.2,
    { x: "100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=2.2"
  )
  .fromTo(buttons, 1.7, { opacity: 0, y: 200 }, { opacity: 1, y: 0 }, "-=1.5")
  .fromTo(icon1, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.2")
  .fromTo(icon2, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7")
  .fromTo(icon3, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7")
  .fromTo(icon4, 1.7, { opacity: 0, y: -200 }, { opacity: 1, y: 0 }, "-=1.7");
// ====================ANIMATION JS ENDS   HERE================= //
