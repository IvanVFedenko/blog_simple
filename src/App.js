import React from 'react';
import { Route } from 'react-router-dom';

import './Styles/App.css';

import Home from './components/Home';
import Post from './containers/Post';
import NewPost from './containers/NewPost';
import PostList from './containers/PostList';

const App = () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/posts" exact component={PostList} />
    <Route path="/new_post" component={NewPost} />
    <Route
      path="/posts/:postId"
      render={({ match }) => (
        <Post
          postId={match.params.postId}
        />
      )}
    />
  </div>
);

export default App;
