import Swal from 'sweetalert2'
import './reset.css'
import './style.css'

const inputCurrency = document.querySelector('#inputCurrency');
const inputValue = document.querySelector('#inputValue');
const searchButton = document.querySelector('#searchButton');
const h3 = document.querySelector('h3');
const main = document.querySelector('main');
const header = document.querySelector('header');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch(`https://api.exchangerate.host/latest?base=${inputCurrency.value}`)
  .then(response => response.json())
  .then(data => {
    if (inputCurrency.value === '' || data.base !== (inputCurrency.value).toUpperCase()) {
      Swal.fire({
        title: 'Ooops!',
        text: 'Digite uma moeda válida para a conversão.',
        confirmButtonText: 'OK'
      })
    } else if (!inputValue.value) {
      Swal.fire({
        title: 'Ooops!',
        text: 'Digite um valor válido para a conversão.',
        confirmButtonText: 'OK'
      })
    } else {
      h3.innerHTML = `Valores referentes a ${inputValue.value} ${(inputCurrency.value).toUpperCase()}`;
      const ratesList = Object.keys(data.rates);
      const currencyDiv = document.querySelector('#currencyDiv');
      currencyDiv.innerHTML = '';

      ratesList.forEach((rate) => {
        const container = document.createElement('div');
        container.className = 'container';
        currencyDiv.appendChild(container);

        const key = document.createElement('p');
        key.innerHTML = rate;
        container.appendChild(key);

        const value = document.createElement('span');
        value.innerHTML = (inputValue.value * data.rates[rate]).toFixed(2);
        container.appendChild(value);

        header.classList.remove('prevHeader')
        main.style.display = 'flex';
      })
    }
  })

})