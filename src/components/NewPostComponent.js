import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import 'typeface-roboto';
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';

const NewPostComponent = (props) => {
  const {
    body,
    title,
    creator,
    success,
    handlePress,
    handleChange,
    handleSubmit,
    handleSetStatus,  } = props;
  return (
    <div>
    {success
      ? (
        <div className="newpost__choice">

          <div>
            <h1>The post was created!</h1>
          </div>

          <div className="newpost__back-button">
            <Button className="newpost__back-button">
              <Link to="/posts">
            Back to the post list
              </Link>
            </Button>
          </div>

          <div className="newpost__add-button">
            <Button
              onClick={() => handleSetStatus()}
              className="newpost__add-button"
            >
          Create the new post
            </Button>
          </div>
        </div>
      )
      : (
        <div className="new_post">
          <NavLink to="/posts">
            <img
              src={require('../img/return-button-png-34571.png')}
              alt="back_button"
              className="back_button"
            />
          </NavLink>
          <div>
            <form onSubmit={handleSubmit} className="postlist_input_title">
              <Input
                className="postlist_input_title"
                type="title"
                name="title"
                onChange={handleChange}
                onKeyPress={handlePress}
                placeholder=" Add title"
                value={title}
              />
            </form>
          </div>

          <div>
            <form>
              <Input
                className="postlist_textarea"
                multiline
                type="body"
                name="body"
                onChange={handleChange}
                onKeyPress={handlePress}
                placeholder=" Add post"
                value={body}
              />
            </form>
          </div>

          <div>
            <form>
              <Input
                className="postlist_input_author"
                type="creator"
                name="creator"
                placeholder=" Add author"
                onChange={handleChange}
                onKeyPress={handlePress}
                value={creator}
              />
            </form>
          </div>

          <div>
            <Button
              disabled={!title.length || !body.length || !creator.length}
              variant="text"
              color="default"
              onClick={() => handleSubmit()}
            >
          Add post
            </Button>
          </div>
        </div>
      )}
  </div>
  )
};

export default NewPostComponent;
