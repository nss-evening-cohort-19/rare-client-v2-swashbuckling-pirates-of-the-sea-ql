import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CategoryForm from '../../../components/categories/CategoryForm';
import { getSingleCategory } from '../../../utils/data/categoryData';

export default function EditCategory() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { categoryId } = router.query;
  useEffect(() => {
    getSingleCategory(categoryId).then(setEditItem);
  }, [categoryId]);
  return (<CategoryForm object={editItem} />);
}
