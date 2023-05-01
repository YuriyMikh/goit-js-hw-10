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
  const value = event.target.value.trim();
  //проверка на пробелы. Если в поисковой строке пусто (или пробелы)- не отправляем GET-запрос
  if (!value) {
    clearInterfaceUI();
    return;
  }

  //если стран больше 10 - показываем нотификацию
  return fetchCountries(value)
    .then(resultSearch => {
      if (resultSearch.length > 10)
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      //если стран от 2 до 10 - показываем их на список (вызов функции markupListCountries())
      if (resultSearch.length >= 2 && resultSearch.length <= 10) {
        markupListCountries(resultSearch);
      }
      //если страна одна - показываем ее детализацию (вызов функции markupInfoCountry())
      if (resultSearch.length === 1) {
        markupInfoCountry(resultSearch);
      }
    })
    .catch(reject => {
      clearInterfaceUI();
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

//функция отрисовки списка стран
function markupListCountries(data) {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = data
    .map(
      element =>
        `<li class='js-country-list-item'>
          <img class='js-flags-svg' src="${element.flags.svg}" alt=""></img>
          <p> ${element.name.official}</p>
        </li>`
    )
    .join('');
}

////функция отрисовки детализации страны
function markupInfoCountry(data) {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = data
    .map(
      data =>
        `<div class='js-country-list-item'>
           <img class='js-flags-svg' src="${data.flags.svg}" alt="${
          data.flags.alt
        }"></img>
           <h2> ${data.name.official}</h2>
       </div>
       <div>
         <p class='js-key-title'>Capital: <span>${data.capital}</span></p>
         <p class='js-key-title'>Population: <span>${data.population}</span></p>
         <p class='js-key-title'>Languages: <span>${Object.values(data.languages).join(
           ', '
         )}</span></p>
       </div>
      `
    )
    .join('');
}

//функция очистки интерфеса
function clearInterfaceUI() {
  countryListRef.innerHTML = '';
  countryInfoRef.innerHTML = '';
}
