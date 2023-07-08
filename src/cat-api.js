import axios from 'axios';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_7RIdaPQIKQeuQ4h5OHhIknuCKcTJHhxKZ6jGEa1GCIsFM4TeRDRzpC67rBRSSXOw';

const checklist = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');
const breeds = 'https://api.thecatapi.com/v1/breeds';
const images = 'https://api.thecatapi.com/v1/images';
const apiKey =
  'live_7RIdaPQIKQeuQ4h5OHhIknuCKcTJHhxKZ6jGEa1GCIsFM4TeRDRzpC67rBRSSXOw';

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
  loaderInfo.classList.remove('hiden');
  catInfo.classList.add('hiden');
  axios
    .fetchCatByBreed(event.currentTarget.value)
    .then(function (response) {
      addPost(response);
      loaderInfo.classList.add('hiden');
      catInfo.classList.remove('hiden');
      errorInfo.classList.add('hiden');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      errorInfo.classList.remove('hiden');
      loaderInfo.classList.add('hiden');
      console.log(error);
    });
}

checklist.addEventListener('change', selectCat);
checklist.classList.add('hiden');
errorInfo.classList.add('hiden');

console.log(fetchBreeds);
console.log(fetchCatByBreed);
console.log(addList);
console.log(selectCat);
