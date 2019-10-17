import React from 'react';
import { NavLink } from 'react-router-dom';

import 'typeface-roboto';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';

const OneShownPost = (props) => {

    const { postId, posts, comments, body, page, perPage, handleSubmit, handleChange } = props;
    const shownPost = posts.find((post) => post.id === +postId);
    const firstPosition = page * perPage;
    const lastPosition = page * perPage + perPage;

  return (
    <div>
      <div>
        <NavLink to="/posts">
          <img
            src={require('./../img/return-button-png-34571.png')}
            alt="back_button"
            className="back_button"
          />
        </NavLink>
      </div>
      <div className="post_body">
        {shownPost ? shownPost.body : ''}
      </div>

      <div className="comments_block">
        <b>
          {comments.length > 0 ? 'Comments:' : ''}
        </b>
        {comments.slice(firstPosition, lastPosition).map((comment) => (
          <div key={comment.id}>
            <p className="post_comment">
              -
              {comment.body}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          type="body"
          name="body"
          multiline
          rows={1}
          maxLength="2"
          onChange={handleChange}
          placeholder=" Add new comment"
          value={body}
          className="comment_input"
        />
        <Button
          type="submit"
          disabled={!body.length}
        >
          Add comment
        </Button>
      </form>
    </div>
  )
};

export default OneShownPost;
