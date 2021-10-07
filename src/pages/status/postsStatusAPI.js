import { get } from '../../api/client';

// A mock function to mimic making an async request for data
export function fetchPostsDetail(id) {
  return new Promise((resolve) => {
    const route = `/comments/v1/getPostComments/${id}`;
    get(route).then((data) => {
      resolve(data)
    });
  });
}
