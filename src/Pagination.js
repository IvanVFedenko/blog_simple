
import React from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Styles/pagination.css';

const Pagination = (props) => {
  const {
    handlePageChange,
    page,
    total,
    perPage,
  } = props;

  const lastPage = Math.ceil(total / perPage);
  const paginationBtns = (handlePageChange, page, lastPage) => {
    const btnsArr = [];
    for (let i = 0; i < lastPage; i++) {
      btnsArr.push(i);
    }
    return btnsArr.map((num) => (
      <button
        type="button"
        key={Math.round()}
        onClick={() => handlePageChange(num)}
        className={classnames({
          'pagination_button': true,
          'pagination_active': page === num,
        })}
      >
        {num + 1}
      </button>
    ));
  };
  return (
    <div className="pagination">
      {paginationBtns(handlePageChange, page, lastPage) }
    </div>
  );
};

Pagination.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default Pagination;
