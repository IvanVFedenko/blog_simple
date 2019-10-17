import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'typeface-roboto';
import '../Styles/new_post.css';

import { posts } from '../store/store';
import { getPostThunkCreator } from '../store/actions';

import NewPostComponent from '../components/NewPostComponent';

class NewPost extends React.Component {
  state = {
    title: '',
    body: '',
    creator: '',
    success: false,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^ {,.!?+}\wа-яА-ЯІіЇїЁё]/g, ''),
    });
  }

  handleSubmit = () => {
    this.setState({
      success: false,
    });
    const { title, body, creator } = this.state;
    const url = 'https://simple-blog-api.crew.red/posts';
    const d = new Date();
    const curr_date = d.getDate();
    const curr_month = d.getMonth() + 1;
    const curr_year = d.getFullYear();

    const data = {
      title,
      body,
      creator,
      date: (`${curr_year}-${curr_month}-${curr_date}`),
    };

    fetch(url, {
      method: 'POST', // or ‘PUT’
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => console.log('Success:', response))
      .then(() => this.props.getPostThunkCreator());

    this.setState({
      title: '',
      body: '',
      creator: '',
      success: true,
    });
  }

  handleSetStatus = () => {
    this.setState({
      success: false,
    });
  }

  render() {
    const { title, body, creator, success } = this.state;
    return (
      <NewPostComponent
        success={success}
        title={title}
        body={body}
        creator={creator}
        handleSetStatus={this.handleSetStatus}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
const getData = (state) => ({
  posts: posts(state),
});
const getMethod = (dispatch) => ({
  getPostThunkCreator: () => dispatch(getPostThunkCreator()),
});

NewPost.propTypes = {
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  success: PropTypes.bool
};

export default connect(getData, getMethod)(NewPost);
