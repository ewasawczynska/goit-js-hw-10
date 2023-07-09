import axios from 'axios';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

let axiosCatApi = null;

function start(apiKey) {
  axiosCatApi = require('axios').default;
  axiosCatApi.defaults.headers.common['x-api-key'] = apiKey;
}

const checklist = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const breeds = 'https://api.thecatapi.com/v1/breeds';
const images = 'https://api.thecatapi.com/v1/images';
const apiKey =
  'live_7RIdaPQIKQeuQ4h5OHhIknuCKcTJHhxKZ6jGEa1GCIsFM4TeRDRzpC67rBRSSXOw';

function fetchBreeds() {
  return axiosCatApi
    .get(breeds)
    .then(response => response.data)
    .catch(error => console.error(error.name, error.message));
}

function fetchCatByBreed(breedId) {
  return axiosCatApi
    .get('${images}${breedId}')
    .then(response => response.data)
    .catch(error => console.error(error.name, error.message));
}

function addList(list) {
  const markup = list
    .map(item => {
      return '<option value=${item.reference_image_id}>${item.name} </option>';
    })
    .join('');
  checklist.innerHTML(markup);
}

function addPost(item) {
  const markup = `
  <img src="${item.url}" alt="">
  <div>
    <h1>${item.breeds[0].name}</h1>
    <p>${item.breeds[0].description}</p>
    <p><span>Temperament: </span>${item.breeds[0].temperament}</p>
  </div>
`;
  catInfo.innerHTML = markup;
}

function selectCat(event) {
  loaderInfo.classList.remove('hidden');
  catInfo.classList.add('hidden');
  axios
    .fetchCatByBreed(event.currentTarget.value)
    .then(function (response) {
      addPost(response);
      loaderInfo.classList.add('hidden');
      catInfo.classList.remove('hidden');
      errorInfo.classList.add('hidden');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      errorInfo.classList.remove('hidden');
      loaderInfo.classList.add('hidden');
      console.log(error);
    });
}

checklist.addEventListener('change', selectCat);
checklist.classList.add('hidden');
errorInfo.classList.add('hidden');

start(apiKey);
fetchBreeds()
  .then(function (response) {
    addList(response);
    loaderInfo.classList.add('hidden');
    checklist.classList.remove('hidden');
    errorInfo.classList.add('hidden');
    var select = new SlimSelect({
      select: '.breed-select',
    });
    Notiflix.Notify.info('Select a breed from the list to get more detailes.');
  })
  .catch(function (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    errorInfo.classList.remove('hidden');
    loaderInfo.classList.add('hidden');
    console.log(error);
  });
