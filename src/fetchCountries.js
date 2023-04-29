export function fetchCountries(name) {
  fetch('https://restcountries.com/v3.1/name/eesti')
    .then(response => response.json())
    .then(country => console.log(country));
}
