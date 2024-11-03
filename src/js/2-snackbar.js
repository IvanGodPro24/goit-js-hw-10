import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.input-delay');
const inputRadio = document.querySelectorAll('.input-radio');

function generatePromise(event) {
  event.preventDefault();

  const delay = inputDelay.value;
  let selectedRadioValue;

  for (const radio of inputRadio) {
    if (radio.checked) {
      selectedRadioValue = radio.value;
    }
  }

  form.reset();

  if (delay < 0) {
    iziToast.warning({
      position: 'topRight',
      iconUrl: './img/warning.svg',
      backgroundColor: '#ffa000',

      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      title: 'Warning',
      titleColor: '#fff',
      titleSize: '16',

      message: 'Invalid value',
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
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadioValue === 'fulfilled') {
        resolve(delay);
      } else if (selectedRadioValue === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay =>
      iziToast.success({
        position: 'topRight',
        iconUrl: './img/success.svg',
        backgroundColor: '#59a10d',

        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        title: 'Success',
        titleColor: '#fff',
        titleSize: '16',

        message: `Fulfilled promise in ${delay}ms`,
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
      })
    )
    .catch(delay =>
      iziToast.error({
        position: 'topRight',
        iconUrl: './img/error.svg',
        backgroundColor: '#ef4040',

        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16',

        message: `Rejected promise in ${delay}ms`,
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
      })
    );
}

form.addEventListener('submit', generatePromise);
