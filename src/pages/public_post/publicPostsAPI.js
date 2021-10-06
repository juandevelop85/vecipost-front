import { get, post } from '../../api/client';

// A mock function to mimic making an async request for data
export function fetchPublicPosts({ name, content, email }) {
  return new Promise((resolve) => {
    const route = '/posts/v1/createPost';
    let payload = {
      name,
      content,
      user_email: email,
    };
    post(route, payload).then((data) => {
      resolve(data);
    });
  });
}
