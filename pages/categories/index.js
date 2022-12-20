import { Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import CategoryForm from '../../components/categories/CategoryForm';
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
              <tr key={category.id}>
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

export default CategoriesPage;
