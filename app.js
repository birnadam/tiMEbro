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
  (pageDisplayBool[1] = false),
    (pageDisplayBool[2] = false),
    (pageDisplayBool[3] = false); // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonSettings", function() {
  if (pageDisplayBool[1]) {
    pageDisplayBool[1] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[1] = true; // show settings container
  }
  (pageDisplayBool[0] = false),
    (pageDisplayBool[2] = false),
    (pageDisplayBool[3] = false); // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonWeather", function() {
  if (pageDisplayBool[2]) {
    pageDisplayBool[2] = false; // hides both containers if icon clicked while container is open
  } else {
    pageDisplayBool[2] = true; // show weather container
  }
  (pageDisplayBool[1] = false),
    (pageDisplayBool[0] = false),
    (pageDisplayBool[3] = false); // hide other containers

  displayer(); // toggle containers
});

$(document).on("click", ".buttonClose", function() {
  for (let i = 0; i < pageDisplayBool.length; i++) {
    pageDisplayBool[i] = false;
  } // hide containers

  displayer(); // toggle containers
});
// =====================BUTTONS JS ENDS   HERE================== //

// ======================TIMER JS STARTS HERE=================== //
let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const audio = new Audio("./assets/audio/timerEnd.mp3");
const audioAlert = document.getElementsByName("audio");
let selectedAudioAlert = false;
const visualAlert = document.getElementsByName("visual");
let selectedVisualAlert = false;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // what happens when countdown reaches 0
    if (
      secondsLeft < 0 &&
      selectedAudioAlert == "1" &&
      selectedVisualAlert == "1"
    ) {
      clearInterval(countdown);
      // play audio from above
      // **** DISPLAY SOMETHING ****
      audio.play();
      document.title = "Time's Up!";
      alert("Time's Up!");
      return;
    } else if (secondsLeft < 0 && selectedAudioAlert == "1") {
      clearInterval(countdown);
      // play audio from above
      audio.play();
      return;
    } else if (secondsLeft < 0 && selectedVisualAlert == "1") {
      clearInterval(countdown);
      // **** DISPLAY SOMETHING ****
      document.title = "Time's Up!";
      alert("Time's Up!");
      return;
    } else if (secondsLeft < 0) {
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
    if (localStorage.getItem("todos")) {
      const todos = localStorage.getItem("todos").split(",");
      //   then run todo within the generate template
      todos.push(todo);
      // sets todo in local storage to todos
      localStorage.setItem("todos", todos.join(","));
    } else {
      // conditional if there is no todos in local storage
      localStorage.setItem("todos", todo);
    }
    // generate todo
    generateTemplate(todo);
    // to reset the form so user can input another todo
    addForm.reset();
  }
});

// delete todo
list.addEventListener("click", e => {
  // if clicked element with class with delete in it
  if (e.target.classList.contains("delete")) {
    // deletes parent element
    const removeTodo = e.target.parentElement.textContent.trim();
    e.target.parentElement.remove();
    // get local storage of todos and filter
    const todos = localStorage.getItem("todos").split(",");
    const newTodos = todos.filter(todo => todo !== removeTodo);
    // remove todos from local storage
    localStorage.removeItem("todos");
    // set local storage to newTodos
    localStorage.setItem("todos", newTodos);
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

// auto generate from todos in local storage
if (localStorage.getItem("todos")) {
  // turn that into an array
  const todos = localStorage.getItem("todos").split(",");
  // for each todo in array
  todos.forEach(todo => {
    // generate a template or add that todo to the inner html
    if (todo.length > 0) {
      generateTemplate(todo);
    }
  });
}

if (!localStorage.getItem("todos")) {
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <span>Don't be lazy!</span>
  <i class="far fa-trash-alt delete"></i>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
<span>The sooner you start..</span>
<i class="far fa-trash-alt delete"></i>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
<span>The sooner you'll finish! :)</span>
<i class="far fa-trash-alt delete"></i>
</li>
  `;

  // appends to bottom of list
  list.innerHTML += html;
}
// --------------------TODO JS ENDS   HERE---------------------- //

// -------------------WEATHER JS STARTS HERE-------------------- //
class Forecast {
  constructor() {
    this.key = "IL0UncemSD2sDHJUo6hhT1ZW7YV94eN6";
    this.weatherURI =
      "https://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    return {
      cityDets,
      weather
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    //   console.log(data);
    return data[0];
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    //   console.log(data);
    return data[0];
  }
}

// used for dom manipulation

const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".weatherCard");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = data => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  // destructure properties
  const { cityDets, weather } = data;

  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Imperial.Value}</span>
                    <span>&deg;F</span>
                </div>
    `;

  // update images & icons
  const iconSrc = `assets/images/weather/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime
    ? "assets/images/weather/day.svg"
    : "assets/images/weather/night.svg";

  time.setAttribute("src", timeSrc);

  // remove d-none class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with new city
  forecast
    .updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem("city", city);
});

// if it exists automatically makes the api call from previous
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
// -------------------WEATHER JS ENDS   HERE--------------------- //

// -------------------SETTINGS JS STARTS HERE------------------- //
document.customForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  // console.log(mins);
  timer(mins * 60);
  // so they can keep their time
  // this.reset();

  // check if visual alert is checked value will be 0 or 1
  // console.log(visualAlert.checked.value);
  for (let i = 0; i < visualAlert.length; i++) {
    if (visualAlert[i].checked) {
      selectedVisualAlert = visualAlert[i].value;
      // console.log("visual" + selectedVisualAlert);
    }

    for (let i = 0; i < audioAlert.length; i++) {
      if (audioAlert[i].checked) {
        selectedAudioAlert = audioAlert[i].value;
        // console.log("audio" + selectedAudioAlert);
      }
    }
  }
});
// -------------------SETTINGS JS ENDS   HERE------------------- //

// --------------------TIMEDATE JS STARTS HERE------------------ //
const clock = document.querySelector(".clock");
const date = document.querySelector(".date");

const tick = () => {
  const now = new Date();

  const h = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
  const m =
    now.getMinutes() < 10
      ? "0" + JSON.stringify(now.getMinutes())
      : now.getMinutes();
  const s =
    now.getSeconds() < 10
      ? "0" + JSON.stringify(now.getSeconds())
      : now.getSeconds();
  // set AM or PM
  const AMPM = now.getHours() > 11 ? "PM" : "AM";

  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  //   console.log(h, m, s);
  const time = `
  <span>${h}</span> :
    <span>${m}</span> :
    <span>${s}</span>
    <span>${AMPM}</span>
    `;

  clock.innerHTML = time;

  const today = `<div><span>${month}</span> / <span>${day}</span> / <span>${year}</span></div>`;
  date.innerHTML = today;
};

// every second it will tick
setInterval(tick, 1000);
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
