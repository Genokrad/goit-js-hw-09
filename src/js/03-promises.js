import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitButton = document.querySelector('button[type="submit"]');
const delayInput = document.querySelector('input[name="delay"]');
const delayStepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => Notify.success(value))
    .catch(error => Notify.failure(error));
  // promise.then(
  //   result => {
  //     console.log(result);
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // );
}

function checkPromise(event) {
  event.preventDefault();

  let promDelay = 1;
  for (let i = 1; i <= amountInput.value; i++) {
    let promPosition = i;
    if (i === 1) {
      promDelay = Number(delayInput.value);
    } else {
      promDelay =
        Number(delayInput.value) + Number(delayStepInput.value) * (i - 1);
    }

    createPromise(promPosition, promDelay);
  }
}

submitButton.addEventListener('click', checkPromise);
