import * as a from './constants';
import * as g from './../api/Get';

export const setPosts = (value) => ({ type: a.SET_POSTS, value });
export const setPost = (value) => ({ type: a.SET_POST, value });
export const setCurrentPage = (value) => ({ type: a.SET_CURRENT_PAGE, value });
export const setComments = (value) => ({ type: a.SET_COMMENTS, value });
export const hideComments = () => ({ type: a.HIDE_COMMENTS });

export const getCommentsThunkCreator = (id) => async (dispatch) => {
  const post = await g.getPostWithComments(id);
  dispatch(setComments(post));
};

export const getPostThunkCreator = () => async (dispatch) => {
  const posts = await g.getFromServer();
  dispatch(setPosts(posts));
};

export const setPostThunkCreator = (id) => async (dispatch) => {
  const post = await g.getPostWithComments(id);
  dispatch(setPost(post));
};
