import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
  return fetchCountries(event.target.value.trim())
    .then(resultSearch => {
      if (resultSearch.length > 10)
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      if (resultSearch.length >= 2 && resultSearch.length <= 10) {
        markupListCountries(resultSearch);
      }
      if (resultSearch.length === 1) {
        markupInfoCountry(resultSearch);
      }
    })
    .catch(reject => {
      clearInterfaceUI();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function markupListCountries(data) {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = data
    .map(
      element =>
        `<li>
          <img src="${element.flags.svg}" alt=""></img>
          <p> ${element.name.official}</p>
        </li>`
    )
    .join('');
}

function markupInfoCountry(data) {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = data
    .map(
      data =>
        `
        <div class="js-container">
            <img src="${data.flags.svg}" alt="${data.flags.alt}"></img>
            <p> ${data.name.official}</p>
       </div>
       <p>Capital: <span>${data.capital}</span></p>
       <p>Population: <span>${data.population}</span></p>
       <p>Languages: <span>${Object.values(data.languages).join(', ')}</span></p>
      `
    )
    .join('');
}

function clearInterfaceUI() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
// function renderMarkup(countries) {
//   console.log(inputRef.value);
//   if (countries.length > 2 && countries.length < 10) {
//     countryInfoRef.innerHTML = '';
//     const eneteredCountries = countries
//       .map(
//         country =>
//           `<div class="js-country-list">
//           <img class='js-flag' src="${country.flags.svg}" alt=""></img>
//           <li> ${country.name.official}</li>
//         </div>
//              `
//       )
//       .join('');
//     countryListRef.innerHTML = eneteredCountries;
//   } else if (countries.length === 1) {
//     countryListRef.innerHTML = '';
//     const eneteredCountries = countries
//       .map(
//         country =>
//           `
//           <div class="js-container">
//             <img src="${country.flags.svg}" alt=""></img>
//             <p> ${country.name.official}</p>
//           </div>
//           <p>Capital: <span>${country.capital}</span></p>
//           <p>Population: <span>${country.population}</span></p>
//           <p>Languages: <span>${Object.values(country.languages)}</span></p>
//              `
//       )
//       .join('');
//     countryInfoRef.innerHTML = eneteredCountries;
//   }
// }
