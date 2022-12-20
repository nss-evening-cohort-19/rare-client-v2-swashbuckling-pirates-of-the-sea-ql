import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import CategoryForm from '../../components/categories/CategoryForm';
// import { signOut } from '../utils/auth';
// import { useAuth } from '../utils/context/authContext';
import { deleteCategory, getCategories } from '../../utils/data/categoryData';

function CategoriesPage() {
  // const { user } = useAuth();
  const [category, setCategory] = useState([]);

  const getAllCategories = () => {
    getCategories(category.id).then(setCategory);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const refresh = () => getAllCategories();

  const deleteSingleCategory = () => {
    if (window.confirm(`Delete ${category.label}?`)) {
      deleteCategory(category.id).then(() => getAllCategories());
    }
  };

  return (
    <>
      <CategoryForm refresh={refresh} />
      <h2>Categories</h2>
      <Table striped bordered hover>
        <tbody>
          {
            category?.map((categories) => (
              <tr>
                <td>
                  <Link href={`/categories/edit/${category.id}`} passHref>
                    <Button size="sm" variant="dark">
                      EDIT
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => deleteSingleCategory(category.id)}>Delete</Button>
                </td>
                <td>{categories.label}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}

// CategoriesPage.propTypes = {
//   categoryObj: PropTypes.shape({
//     id: PropTypes.string,
//     label: PropTypes.string,
//   }).isRequired,
// };

export default CategoriesPage;
