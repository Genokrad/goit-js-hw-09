import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('[data-start]');
buttonStart.disabled = true;

let chosenDateFromInput = 0;
let timeBeforEnd = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    chosenDateFromInput = selectedDates[0];
    if (Date.now >= chosenDateFromInput) {
      Notify.failure('Please choose a date in the future');
    }
    timeBeforEnd = chosenDateFromInput - options.defaultDate;
    buttonStart.disabled = false;
  },
};

const ONE_SEC = 1000;

// console.log(Date.now);
flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const dayItem = document.querySelector('[data-days]');
const hourItem = document.querySelector('[data-hours]');
const minutesItem = document.querySelector('[data-minutes]');
const secondsItem = document.querySelector('[data-seconds]');
let timerObject = {};

function padStartFunction(value) {
  value = String(value);
  return value.padStart(2, '0');
}

let oneSecInterval;

buttonStart.addEventListener('click', () => {
  oneSecInterval = setInterval(startTimer, ONE_SEC);
  buttonStart.disabled = true;
});

function startTimer() {
  timerObject = convertMs(timeBeforEnd);
  dayItem.textContent = padStartFunction(timerObject.days);
  hourItem.textContent = padStartFunction(timerObject.hours);
  minutesItem.textContent = padStartFunction(timerObject.minutes);
  secondsItem.textContent = padStartFunction(timerObject.seconds);
  timeBeforEnd = timeBeforEnd - ONE_SEC;
  if (Number(timeBeforEnd) <= 0) {
    clearInterval(oneSecInterval);
    Notify.success('Time is up');
  }
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
