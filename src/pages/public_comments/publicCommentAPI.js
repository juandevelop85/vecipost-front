import { get, post } from '../../api/client';

// A mock function to mimic making an async request for data
export function fetchPublicComment({ name, content, email, post_id }) {
  return new Promise((resolve) => {
    const route = '/comments/v1/createComment';
    let payload = {
      post_id,
      name,
      content,
      user_email: email,
    };
    post(route, payload).then((data) => {
      resolve(data);
    });
  });
}
