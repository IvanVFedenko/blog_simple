import {SET_POSTS, SET_POST } from '../constants'

const initialState = {
  posts: [],
  post: [],
};

export const postsReducer = (state = initialState, action) => {
  const actions = {
    [SET_POSTS]: () => ({
      ...state,
      posts: action.value.sort((a, b) => b.id - a.id),
    }),
    [SET_POST]: () => ({
      ...state,
      post: action.value,
    }),
  };
  if (action.type in actions) {
    return actions[action.type](action);
  }
  return state;
};
