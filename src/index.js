import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');


console.log(fetchCountries());

