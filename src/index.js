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
  fetchCountries(enteredCountryName).then(con => renderMarkup(con)); //доработать имя переменной
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response =>
    response.json()
  );
}
// https://restcountries.com/v3.1/${name}?fields=${name.official},${capital},${population},${flags.svg},${languages}
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

function renderMarkup(countries) {
    console.log(inputRef.value);
    countryListRef.innerHTML = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length > 2 && countries.length < 10) {
    countryInfoRef.innerHTML = '';
    const eneteredCountries = countries
      .map(
        country =>
          `<div class="js-country-list">
          <img class='js-flag' src="${country.flags.svg}" alt=""></img>
          <li> ${country.name.official}</li>
        </div>    
             `
      )
      .join('');
    countryListRef.innerHTML = eneteredCountries;
  } else if (countries.length === 1) {
    countryListRef.innerHTML = '';
    const eneteredCountries = countries
      .map(
        country =>
          `
          <div class="js-country-list">
            <img class='js-flag' src="${country.flags.svg}" alt=""></img>
            <li> ${country.name.official}</li>
          </div>
          <li><span>Capital: </span><span>${country.capital}</span></li>
          <li><span>Population: </span><span>${country.population}</span></li>
          <li><span>Languages: </span><span>${country.languages}</span></li>
             `
      )
      .join('');
    countryInfoRef.innerHTML = eneteredCountries;
  }
  // if (inputRef.value === '') {
  // countryListRef.innerHTML = '';
  // }
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
