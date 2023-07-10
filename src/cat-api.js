import axios from 'axios';
export default axios;

let axiosCatApi = null;

const breeds = `https://api.thecatapi.com/v1/breeds`;
const images = `https://api.thecatapi.com/v1/images/`;

export function init(api_key) {
  axiosCatApi = require('axios').default;
  axiosCatApi.defaults.headers.common['x-api-key'] = api_key;
}
export function fetchBreeds() {
  return axiosCatApi
    .get(breeds)
    .then(response => response.data)
    .catch(error => {
      console.error(error.name, error.message);
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axiosCatApi
    .get(`${images}${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error.name, error.message);
      throw error;
    });
}
