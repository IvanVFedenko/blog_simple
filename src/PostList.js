import React from 'react';

import 'typeface-roboto';
import Button from '@material-ui/core/Button';

import './Styles/PostList.css';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  posts,
  getPostThunkCreator,
  setCurrentPage,
  page,
  perPage,
        } from './store';

const API_URL = 'https://simple-blog-api.crew.red/posts';

class PostList extends React.Component {

  componentDidMount() {
    this.props.getPostThunkCreator()
  }

  handlePageChange = (currentPage) => {
    this.props.setCurrentPage(currentPage)
  };

  handleDelete = (id) => {
    fetch(API_URL + "/" + id, { method: 'DELETE'})
      .then(() => {console.log('removed')})
      .catch(err => {console.error(err)})
      .then(() => this.props.getPostThunkCreator())
  }

  render() {
    const { posts, page, perPage } = this.props;
    const firstPosition = page * perPage;
    const lastPosition = page * perPage + perPage;
    return (
      <div className="post_list">
        <h1>Post list</h1>
        <Button><NavLink to="/new_post" >Add the new post</NavLink></Button>
          {posts.slice(firstPosition, lastPosition).map(post =>
            <div  key={Math.random()} className="post_item">
            <Link to={`/posts/${post.id}`}  className="post_item_link">
              <ul className={post.id ? '' : 'del_buttom_disable'}>
                <li className="postlist_heading">Title: <b>{post.title}</b></li>
                <li className="postlist_heading">Author: <b>{post.creator}</b></li>
                <li className="postlist_heading">Date: {post.date}</li>
              </ul>
            </Link>
              <button
                onClick={() => {this.handleDelete(post.id)}}
                className='destroy'
                disabled={!post.id}
              >
              </button>
            </div>
            )}
        {posts.length < 6 ? "" :
          <Pagination
            page={page}
            perPage={perPage}
            total={posts.length}
            handlePageChange={this.handlePageChange}
          />
        }
      </div>
    )
  }
}

const getData = (state) => ({
  posts: posts(state),
  page: page(state),
  perPage: perPage(state),
});
const getMethod = (dispatch) => ({
  getPostThunkCreator: () => dispatch(getPostThunkCreator()),
  setCurrentPage: (value) => dispatch(setCurrentPage(value)),
});
export default connect(getData, getMethod) (PostList);