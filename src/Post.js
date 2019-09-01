/* eslint-disable react/state-in-constructor */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Styles/post.css';

import 'typeface-roboto';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import Pagination from './Pagination';
import {
  posts, comments, getCommentsThunkCreator,
  setPostThunkCreator, isLoaded, hideComments,
  getPostThunkCreator,
} from './store';

class Post extends React.Component {
  state = {
    body: '',
    page: 0,
    perPage: 5,
  }

  componentDidMount() {
    this.props.getPostThunkCreator();
    this.props.getCommentsThunkCreator(this.props.postId);
  }

  handlePageChange = (currentPage) => {
    this.setState({
      page: currentPage,
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value.replace(/[^ \wа-яА-ЯІіЇїЁё]/g, '') });
    this.handleSubmit = (event) => {
      event.preventDefault();
      const url = 'https://simple-blog-api.crew.red/comments/';

      const data = {
        postId: +this.props.postId,
        body: this.state.body,
      };

      fetch(url, {
        method: 'POST', // or ‘PUT’
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => console.log('Success:', response))
        .then(() => this.props.getCommentsThunkCreator(this.props.postId));

      this.setState({
        body: '',
      });
    };
  }

  render() {
    const { postId, posts, comments } = this.props;
    const shownPost = posts.find((post) => post.id === +postId);
    const { body, page, perPage } = this.state;
    const firstPosition = page * perPage;
    const lastPosition = page * perPage + perPage;

    return (
      <div className="post">
        <div>
          <NavLink to="/posts">
            <img
              src={require('./img/return-button-png-34571.png')}
              alt="back_buttom"
              className="back_buttom"
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
          {comments.slice(firstPosition, lastPosition).map((comment) =>
            <div key={comment.id}>
              <p className="post_comment">
                -
                {comment.body}
              </p>
            </div>)}
        </div>

        <form onSubmit={this.handleSubmit}>
          <Input
            type="body"
            name="body"
            multiline={true}
            rows={1}
            maxLength="2"
            onChange={this.handleChange}
            placeholder=" Add new comment"
            value={this.state.body}
            className="comment_input"
          />
          <Button
            type="submit"
            disabled={!body.length}
          >
            Add comment
          </Button>
        </form>
        {comments.length < 6 ? ''
          : <Pagination
            page={page}
            perPage={perPage}
            total={comments.length}
            handlePageChange={this.handlePageChange}
          />}
      </div>
    );
  }
}

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPostThunkCreator: PropTypes.func.isRequired,
  getCommentsThunkCreator: PropTypes.func.isRequired,
};

const getData = (state) => ({
  posts: posts(state),
  comments: comments(state),
  isLoaded: isLoaded(state),
});

const getMethod = (dispatch) => ({
  hideComments: () => dispatch(hideComments()),
  getCommentsThunkCreator: (postId) => dispatch(getCommentsThunkCreator(postId)),
  setPostThunkCreator: () => dispatch(setPostThunkCreator()),
  getPostThunkCreator: () => dispatch(getPostThunkCreator()),
});

export default connect(getData, getMethod)(Post);
