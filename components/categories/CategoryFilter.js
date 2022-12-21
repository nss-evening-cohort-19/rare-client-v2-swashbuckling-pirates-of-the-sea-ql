import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function CategoryFilterButton({ catObj }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`../../posts/category/${catObj.id}`);
  };

  return (
    <Button variant="link" onClick={handleClick}>{catObj.label}</Button>
  );
}

CategoryFilterButton.propTypes = {
  catObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryFilterButton;
