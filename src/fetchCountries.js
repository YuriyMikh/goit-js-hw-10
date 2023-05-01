const BASE_URL = 'https://restcountries.com/v3.1/name/';

//передаем параметры запроса через класс URLSearchParams:
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages,',
});

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${searchParams}`).then(response => {
    if (!response.ok) {
      return new Promise.reject();
    }
    return response.json();
  });
}

//вариант передачи параметров запроса записанных в строку:
// export function fetchCountries(name) {

//   return fetch(
//     `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
//   ).then(response => {
//     if (!response.ok) {
//       return new Promise.reject();
//     }
//     return response.json();
//   });
// }
