import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../Styles/PostList.css';

import Pagination from '../components/Pagination';
import ShownPosts from '../components/ShownPosts';

import { posts, page, perPage } from '../store/store';
import { getPostThunkCreator, setCurrentPage } from '../store/actions';

const API_URL = 'https://simple-blog-api.crew.red/posts';

class PostList extends React.Component {
  componentDidMount() {
    this.props.getPostThunkCreator();
  }

  handlePageChange = (currentPage) => {
    this.props.setCurrentPage(currentPage);
  };

  handleDelete = (id) => {
    const { posts, page, setCurrentPage } = this.props;
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => { console.log('removed'); })
      .catch((err) => { console.error(err); })
      .then(() => this.props.getPostThunkCreator())
      .then(() => {
        if (Math.floor(posts.length - 1) % 5 === 0) { setCurrentPage(page - 1); }
        if (posts.length - 1 <= 5) { setCurrentPage(0); }
      });
  }

  render() {
    const { posts, page, perPage } = this.props;

    return (
      <div className="components">
        <ShownPosts
          handleDelete={this.handleDelete}
          page={page}
          perPage={perPage}
          posts={posts}
        />
        {posts.length > 6 &&
          <Pagination
            page={page}
            perPage={perPage}
            total={posts.length}
            handlePageChange={this.handlePageChange}
          />
          }
      </div>
    );
  }
}

PostList.propTypes = {
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPostThunkCreator: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

const getData = (state) => ({
  posts: posts(state),
  page: page(state),
  perPage: perPage(state),
});
const getMethod = {
  getPostThunkCreator,
  setCurrentPage
};
export default connect(getData, getMethod)(PostList);
