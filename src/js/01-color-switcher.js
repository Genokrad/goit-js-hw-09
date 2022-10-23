function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const NOTIFICATION_DELAY = 1000;

const bodyBcg = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timeoutId = null;
buttonStop.disabled = true;

buttonStart.addEventListener('click', timeOutChangeColor);
buttonStop.addEventListener('click', stopIterationColor);

function timeOutChangeColor() {
  timeoutId = setInterval(() => {
    onStart();
  }, NOTIFICATION_DELAY);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function onStart() {
  bodyBcg.style.backgroundColor = getRandomHexColor();
}

function stopIterationColor() {
  clearInterval(timeoutId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}
