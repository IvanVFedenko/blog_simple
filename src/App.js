import React from 'react';
import { Route } from 'react-router-dom';

import './Styles/App.css';
import PostList from './PostList';
import Post from './Post';
import Home from './Home';
import NewPost from './NewPost';

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
