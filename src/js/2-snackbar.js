import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[type="number"]');
const radioBtns = document.querySelectorAll('input[type="radio"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let radioBtnValue;
    radioBtns.forEach(radio => {
        if (radio.checked) {
            radioBtnValue = radio.value;
        }
    });

    const delayValue = parseInt(inputDelay.value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radioBtnValue === 'fulfilled') {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
        }, delayValue);
    });

    promise
        .then(delayValue => {
            iziToast.success({
                class:'iziText',
                messageColor: 'white',
                backgroundColor: "#64dd17",
                position: "topCenter",
                close: false,
                timeout: 2000,
                icon: '',
                message: `✅ Fulfilled promise in ${delayValue}ms`
            });
        })
        .catch(delayValue => {
            iziToast.error({
                class:'iziText',
                messageColor: 'white',
                backgroundColor: "#fc6056",
                position: "topCenter",
                close: false,
                timeout: 2000,
                icon: '',
                message: `❌ Rejected promise in ${delayValue}ms`
            });
        });
    radioBtns.forEach(radio => radio.checked = false);
    inputDelay.value = "";
}
