import * as catApi from './cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const checklist = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loaderInfo = document.querySelector('.loader');
const errorInfo = document.querySelector('.error');

const api_key =
  'live_7RIdaPQIKQeuQ4h5OHhIknuCKcTJHhxKZ6jGEa1GCIsFM4TeRDRzpC67rBRSSXOw';

function addList(list) {
  const markup = list
    .map(item => {
      return `<option value=${item.reference_image_id}>${item.name} </option>`;
    })
    .join('');
  checklist.innerHTML = markup;
}

function selectCat(event) {
  loaderInfo.classList.remove('hidden');
  catInfo.classList.add('hidden');
  catApi
    .fetchCatByBreed(event.currentTarget.value)
    .then(function (response) {
      addPost(response);
      loaderInfo.classList.add('hidden');
      catInfo.classList.remove('hidden');
      errorInfo.classList.add('hidden');
    })
    .catch(function (error) {
      Notiflix.Notify.failure(
        'Upps! Coś poszło nie tak. Odśwież stronę jeszcze raz.'
      );
      errorInfo.classList.remove('hidden');
      loaderInfo.classList.add('hidden');
      console.log(error);
    });
}

function addPost(item) {
  const markup = `
  <center><img class="postImage" src="${item.url}" alt=""></center>
  <div class="postContent">
    <h1 class="postTitle">${item.breeds[0].name}</h1>
    <p class="postText">${item.breeds[0].description}</p>
    <p><span><b>Temperament: </b></span>${item.breeds[0].temperament}</p>
  </div>
`;
  catInfo.innerHTML = markup;
}

checklist.addEventListener('change', selectCat);
checklist.classList.add('hidden');
errorInfo.classList.add('hidden');

catApi.init(api_key);
catApi
  .fetchBreeds()
  .then(function (response) {
    addList(response);
    loaderInfo.classList.add('hidden');
    checklist.classList.remove('hidden');
    errorInfo.classList.add('hidden');
    var select = new SlimSelect({
      select: checklist,
    });
  })
  .catch(function (error) {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    errorInfo.classList.remove('hidden');
    loaderInfo.classList.add('hidden');
    console.log(error);
  });
