import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_7RIdaPQIKQeuQ4h5OHhIknuCKcTJHhxKZ6jGEa1GCIsFM4TeRDRzpC67rBRSSXOw';

const checklist = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const breeds = 'https://api.thecatapi.com/v1/breeds';
const images = 'https://api.thecatapi.com/v1/images';

function fetchBreeds() {
  axios
    .get(breeds)
    .then(response => response.data)
    .catch(error => console.error(error.name, error.message));
}

function fetchCatByBreed(breedId) {
  axios
    .get('${images}${breedId}')
    .then(response => response.data)
    .catch(error => console.error(error.name, error.message));
}
