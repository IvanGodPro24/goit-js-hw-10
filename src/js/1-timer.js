import ringIcon from './img/ring.svg';
import errorIcon from './img/error.svg';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('.btn-start');
const spans = document.querySelectorAll('.value');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      iziToast.error({
        position: 'topRight',
        iconUrl: errorIcon,
        backgroundColor: '#ef4040',

        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16',

        message: `Please choose a date in the future`,
        messageColor: '#fff',
        messageSize: '16',

        close: false,
        buttons: [
          [
            '<button class="close-bnt"> <svg class="close-icon" width="16" height="16"><path d="M8 8l-4-4m4 4l4-4m-4 4l4 4m-4-4l-4 4" /></svg>  </button>',
            function (instance, toast) {
              instance.hide(
                {
                  transitionOut: 'fadeOutUp',
                },
                toast
              );
            },
          ],
        ],
      });
      btnStart.setAttribute('disabled', '');
    } else {
      userSelectedDate = selectedDates[0].getTime();

      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr(dateInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  const timerId = setInterval(() => {
    dateInput.setAttribute('disabled', '');
    btnStart.setAttribute('disabled', '');
    const msDifference = userSelectedDate - Date.now();
    const remainingTime = addLeadingZero(convertMs(msDifference));

    spans[0].innerHTML = remainingTime.days;
    spans[1].innerHTML = remainingTime.hours;
    spans[2].innerHTML = remainingTime.minutes;
    spans[3].innerHTML = remainingTime.seconds;

    if (msDifference <= 0) {
      clearInterval(timerId);

      for (const span of spans) {
        span.innerHTML = '00';
      }

      iziToast.info({
        position: 'topRight',
        iconUrl: ringIcon,
        backgroundColor: '#09f',

        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        title: 'Info',
        titleColor: '#fff',
        titleSize: '16',

        message: `Time is up!`,
        messageColor: '#fff',
        messageSize: '16',

        close: false,
        buttons: [
          [
            '<button class="close-bnt"> <svg class="close-icon" width="16" height="16"><path d="M8 8l-4-4m4 4l4-4m-4 4l4 4m-4-4l-4 4" /></svg>  </button>',
            function (instance, toast) {
              instance.hide(
                {
                  transitionOut: 'fadeOutUp',
                },
                toast
              );
            },
          ],
        ],
      });

      dateInput.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(object) {
  for (let key in object) {
    object[key] = String(object[key]).padStart(2, '0');
  }

  return object;
}

btnStart.addEventListener('click', startTimer);
