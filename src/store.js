import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import  {getPostWithComments, getFromServer} from './Get';

//constants

const SET_POSTS = 'SET_POSTS';
const SET_POST = 'SET_POST';
const SET_COMMENTS = 'SET_COMMENTS';
const HIDE_COMMENTS ='HIDE_COMMENTS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

const initialState = {
  posts: [],
  post: [],
  page: 0,
  perPage: 5,
  comments: [],
  isLoaded: false,
};

// action creators //

export const setPosts = (value) => ({ type: SET_POSTS, value });
export const setPost = (value) => ({ type: SET_POST, value });
export const setComments = (value) => ({ type: SET_COMMENTS, value});
export const hideComments = () => ({ type: HIDE_COMMENTS });
export const setCurrentPage = (value) => ({ type: SET_CURRENT_PAGE, value });

export const getPostThunkCreator = () => {
  return async(dispatch) => {
    const posts = await getFromServer();
    dispatch(setPosts(posts));
  }
};

export const setPostThunkCreator = (id) => {
  return async(dispatch) => {
    const post = await getPostWithComments(id);
    dispatch(setPost(post));
  }
};

export const getCommentsThunkCreator = (id) => {
  return async(dispatch) => {
    const post = await getPostWithComments(id);
    dispatch(setComments(post));
  }
};

// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.value.sort((a, b) => b.id - a.id),
      };
    case SET_POST:
      return {
        ...state,
        post: action.value,
      }  
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.value.comments.sort((a, b) => b.id - a.id),
        isLoaded: true,
      }
    case HIDE_COMMENTS:
      return {
        ...state,
        comments: [],
        isLoaded: false,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.value,
      }
   
    default:
      return state;
  }
};

// selectors

export const posts = state => state.posts;
export const comments = state => state.comments;
export const isLoaded = state => state.isLoaded;
export const page = state => state.page;
export const perPage = state => state.perPage;


// store

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
