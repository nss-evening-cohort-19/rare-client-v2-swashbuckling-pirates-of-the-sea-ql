import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CategoryForm from '../../../components/categories/CategoryForm';
import { getCategories } from '../../../utils/data/categoryData';

export default function EditCategory() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getCategories(id).then(setEditItem);
  }, [id]);
  return (<CategoryForm obj={editItem} />);
}
