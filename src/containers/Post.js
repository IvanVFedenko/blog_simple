import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../Styles/post.css';

import Pagination from '../components/Pagination';
import OneShownPost from '../components/OneShownPost';

import { posts, comments, isLoaded } from '../store/store';
import { getCommentsThunkCreator, hideComments } from '../store/actions';
import { setPostThunkCreator, getPostThunkCreator } from '../store/actions';

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
    const { body, page, perPage } = this.state;
    return (
      <div className="post">
      <OneShownPost
        postId={postId}
        posts={posts}
        comments={comments}
        body={body}
        page={page}
        perPage={perPage}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
        {comments.length > 6 &&
          <Pagination
            page={page}
            perPage={perPage}
            total={comments.length}
            handlePageChange={this.handlePageChange}
          />
        }
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
