import {SET_COMMENTS, HIDE_COMMENTS} from '../constants';

const initialState = {
  comments: [],
  isLoaded: false,
};

export const commentsReducer = (state = initialState, action) => {
  const actions = {
    [SET_COMMENTS]: () => ({
      ...state,
      comments: action.value.comments.sort((a, b) => b.id - a.id),
      isLoaded: true,
    }),
    [HIDE_COMMENTS]: () => ({
      ...state,
      comments: [],
      isLoaded: false,
    }),
  };
  if (action.type in actions) {
    return actions[action.type](action);
  }
  return state;
};
