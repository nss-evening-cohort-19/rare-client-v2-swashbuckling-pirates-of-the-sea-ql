import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

function CategoryFilterButton({ catObj }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`../../posts/category/${catObj.id}`);
  };

  return (
    <Button onClick={handleClick}>
      {catObj.label}
    </Button>
  );
}

CategoryFilterButton.propTypes = {
  catObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryFilterButton;
