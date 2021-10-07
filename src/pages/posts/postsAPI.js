import { get, post } from '../../api/client';

//Esta variable puede ser llamada desde el back o simplemente no ingresar como parametro y manejar el limit en el back
const limit = 10;

// A mock function to mimic making an async request for data
export function fetchPosts(page) {
  return new Promise((resolve) => {
    const route = `/posts/v1/getPosts/${limit}/${page}`;
    get(route).then((data) => {
      resolve(data);
    });
  });
}

export function fetchLikeEvent(payload) {
  return new Promise((resolve) => {
    const route = '/postsevents/v1/likePost';
    post(route, payload).then((data) => {
      resolve(data);
    });
  });
}
