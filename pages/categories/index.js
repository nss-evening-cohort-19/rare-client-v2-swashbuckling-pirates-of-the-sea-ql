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
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const refresh = () => getAllCategories();

  return (
    <>
      <CategoryForm refresh={refresh} />
      <h2>Categories</h2>
      <Table striped bordered hover>
        <tbody>
          {
            categories?.map((category) => (
              <tr>
                <td>
                  <Link href={`/categories/edit/${category.id}`} passHref>
                    <Button size="sm" variant="dark">
                      EDIT
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => deleteCategory(category.id).then(() => getAllCategories())}>Delete</Button>
                </td>
                <td>{category.label}</td>
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
