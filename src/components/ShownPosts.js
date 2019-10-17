import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import 'typeface-roboto';
import Button from '@material-ui/core/Button'

const ShownPosts = (props) => {
  const {posts, page, perPage, handleDelete} = props;
  const firstPosition = page * perPage;
  const lastPosition = page * perPage + perPage;
  return (
    <div className="post_list">
    <h1>Post list</h1>
    <Button>
      <NavLink to="/new_post">Add the new post</NavLink>
    </Button>
    {posts.slice(firstPosition, lastPosition).map((post) => (
      <div key={Math.random()} className="post_item">
        <Link to={`/posts/${post.id}`} className="post_item_link">
          <ul className={post.id ? '' : 'del_buttom_disable'}>
            <li className="postlist_heading">
              Title:
              <b>
                {post.title}
              </b>
            </li>
            <li className="postlist_heading">
              Author:
              <b>
                {post.creator}
              </b>
            </li>
            <li className="postlist_heading">
              Date:
              &nbsp;
              {' '}
              {post.date}
            </li>
          </ul>
        </Link>
        <button
          type="button"
          onClick={() => { handleDelete(post.id); }}
          className="destroy"
          disabled={!post.id}
        />
      </div>
    ))}
  </div>
  )
};

export default ShownPosts;
