import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import { postsReducer } from './reducers/postsReducer';
import { commentsReducer } from './reducers/commentsReducer';
import {paginationReducer} from './reducers/paginationReducer'

// selectors
export const posts = ({ postList }) => postList.posts;
export const comments = ({ commentList }) => commentList.comments;
export const isLoaded = ({ postList }) => postList.isLoaded;
export const page = ({ pagination }) => pagination.page;
export const perPage = ({ pagination }) => pagination.perPage;

const rootReducer = combineReducers({
  postList: postsReducer,
  commentList: commentsReducer,
  pagination: paginationReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
