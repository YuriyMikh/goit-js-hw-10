import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

let enteredCountryName = '';

inputRef.addEventListener(
  'input',
  debounce(nameEnteredCountry, DEBOUNCE_DELAY)
);

function nameEnteredCountry(event) {
  enteredCountryName = event.target.value.trim();
  fetchCountries(enteredCountryName).then(con => renderMarkup(con));
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response =>
    response.json()
  );
}

function renderMarkup(countries) {
  const eneteredCountries = countries
    .map(
      country =>
        `<div class="js-country-list">
          <img class='js-flag' src="${country.flags.png}" alt=""></img>
          <li> ${country.name.common}</li>
        </div>    
             `
    )
    .join('');
  countryListRef.innerHTML = eneteredCountries;
}

// .then(country => console.log(country))
// .catch(error => console.log(error));

// console.log(fCountries);

// if (!response.ok) {
//         throw new Error(
//           Notiflix.Notify.failure('Oops, there is no country with that name')
//         );
//       }
//       return response.json();

// let array = ['s', 'g'];

// countryListRef.innerHTML = array
//   .map(country => `<ul class="country-list"><li>${country}</li></ul>`)
//   .join('');
