import axios from 'axios';

const API_URL = 'https://simple-blog-api.crew.red/posts';

export const getFromServer = async () => {
  const post = await axios.get(API_URL);             // using axios
  const posts = post.data;

  // const responsePosts = await fetch(API_URL);     //  using fetch
  // const posts = await responsePosts.json();
  return posts;
};

export const getPostWithComments = async (id) => {
  const response = await fetch(`${API_URL}/${id}?_embed=comments`);
  const post = await response.json();
  return post;
};
