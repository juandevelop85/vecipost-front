import { getCookie } from './session';

// const axios = require('axios').default;
//const API_URL = process.env.REACT_APP_API_URL;
import { dns as API_URL } from '../config.json';
// const API_URL = '';
/**
 * @description Obtiene la cabecera de las peticiones
 * @author Juan Sebastian Vernaza Lopez
 * @date 2020-08-11
 * @param {*} token
 */
function headers() {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const session = getCookie('u_session');
  myHeaders.append('u_session', session);
  //   myHeaders.append("Content-Length", content.length.toString());
  //   myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
  return myHeaders;
}

// function axiosInsta(){
//   const instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
//   });

//   return instance;
// }

export function get(url) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + url, {
      method: 'GET', // or 'PUT'
      headers: headers(),
    })
      .then((res) => res.json())
      .catch((error) => reject(error))
      .then((response) => resolve(response));
  });
}

/**
 * @description Realizar peticiones post
 * @author Juan Sebastian Vernaza Lopez
 * @date 2020-08-11
 * @returns
 */
export const post = async (url, data) => {
  const response = await fetch(API_URL + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers(),
  }).catch((error) => {
    return error;
  });

  const json = await response.json();

  return json;
};

/**
 * @description Realizar peticiones put
 * @author Juan Sebastian Vernaza Lopez
 * @date 2020-08-11
 * @returns
 */
export function put(url, data) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: headers(),
    })
      .then((res) => res.json())
      .catch((error) => reject(error))
      .then((response) => resolve(response));
  });
}

/**
 * @description Realizar peticiones PATCH
 * @author Juan Sebastian Vernaza Lopez
 * @date 2020-08-11
 * @returns
 */
export const patch = async (url, data) => {
  const response = await fetch(API_URL + url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: headers(),
  }).catch((error) => {
    return error;
  });

  const json = await response.json();

  return json;
};
