import { SET_CURRENT_PAGE } from '../constants';

const initialState = {
  page: 0,
  perPage: 5,
};

export const paginationReducer = (state = initialState, action) => {
  const actions = {
    [SET_CURRENT_PAGE]: () => ({
      ...state,
      page: action.value,
    }),
  };
  if (action.type in actions) {
    return actions[action.type](action);
  }
  return state;
};
