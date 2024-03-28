import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector("button");
const input = document.querySelector("#datetime-picker")
const timerElements = document.querySelectorAll('[data-days], [data-hours], [data-minutes], [data-seconds]');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0] > new Date()) {
            userSelectedDate = selectedDates[0];
            btnStart.disabled = false;
        } else {
            iziToast.error({
                messageColor: 'white',
                backgroundColor: "#fc6056",
                position: "topCenter",
                close: false,
                icon: `icon-person`,
                timeout: 2000,
                iconWidth: 500,
                imageWidth:2500,
                message: 'Please choose a date in the future',
            });
            btnStart.disabled = true;
        }
   
  },
};
flatpickr("#datetime-picker", options);


btnStart.addEventListener("click", () => timerOn());


function timerOn() {
    btnStart.disabled = true;
    input.disabled = true;
    const intervalTimer = setInterval(() => {
        if ((userSelectedDate - new Date()) <= 0 ){
            clearInterval(intervalTimer);
            btnStart.disabled = false;
            input.disabled = false;
        } else {
            let date = convertMs(userSelectedDate - new Date());
            timerElements.forEach((element, index) => {
                element.innerHTML = date[index];
            });

            
        }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return [days, hours, minutes, seconds];
}

function pad(value) {
    return String(value).padStart(2, "0");
}


