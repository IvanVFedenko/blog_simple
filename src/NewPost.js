/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable global-require */
/* eslint-disable no-multi-spaces */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';

import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import 'typeface-roboto';
import Input from '@material-ui/core/Input';

import './Styles/new_post.css';

import {
  posts,
  getPostThunkCreator,
} from './store';

class NewPost extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    title: '',
    body: '',
    creator: '',
    success: false,
  }

  componentDidMount() {
    this.props.getPostThunkCreator();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.replace(/[^ {,.!?+}\wа-яА-ЯІіЇїЁё]/g, ''),
    });
  }

  handleSubmit = () => {
    this.setState ({
      success: false,
    })
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
      date: (curr_year + '-' + curr_month + '-' + curr_date),
    };

    fetch(url, {
      method: 'POST',             // or ‘PUT’
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
      success:false,
    })
  }

  render() {
    const { title, body, creator } = this.state;
    return (
      <div>
        {this.state.success ?
        <div className="newpost__choice">

          <div >
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
              onClick={() => this.handleSetStatus()}
              className="newpost__add-button"
            >
              Create the new post
            </Button>
          </div>
        </div>
        :
        <div className="new_post">
          <NavLink to="/posts">
            <img
              src={require('./img/return-button-png-34571.png')}
              alt="back_button"
              className="back_button"
            />
          </NavLink>
          <div>
            <form onSubmit={this.handleSubmit} className="postlist_input_title">
              <Input
                className="postlist_input_title"
                type="title"
                name="title"
                onChange={this.handleChange}
                onKeyPress={this.handlePress}
                placeholder=" Add title"
                value={title}
              />
            </form>
          </div>

          <div>
            <form>
              <Input
                className="postlist_textarea"
                multiline={true}
                type="body"
                name="body"
                onChange={this.handleChange}
                onKeyPress={this.handlePress}
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
                onChange={this.handleChange}
                onKeyPress={this.handlePress}
                value={creator}
              />
            </form>
          </div>

          <div>
            <Button
              disabled={!title.length || !body.length || !creator.length}
              variant="text"
              color="default"
              onClick={() => this.handleSubmit()}>
              Add post
            </Button>
          </div>
        </div>}
      </div>
    );
  }
}
const getData = (state) => ({
  posts: posts(state),
});
const getMethod = (dispatch) => ({
  getPostThunkCreator: () => dispatch(getPostThunkCreator()),
});
export default connect(getData, getMethod)(NewPost);
