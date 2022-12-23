import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getPostByCategory } from '../../../utils/data/postData';
import PostCard from '../../../components/posts/PostCard';
import { getCategories } from '../../../utils/data/categoryData';
import CategoryFilterButton from '../../../components/categories/CategoryFilter';

export default function ViewPostsByCategory() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { categoryId } = router.query;

  useEffect(() => {
    getPostByCategory(categoryId).then(setPosts);
    getCategories().then(setCategories);
  }, [categoryId]);

  return (
    <div>
      <Button variant="link" onClick={(() => router.push('/'))}>All</Button>
      {categories.map((category) => (
        <CategoryFilterButton key={category.id} catObj={category} />
      ))}
      {posts.length === 0 ? <h1>No Posts in this category</h1> : posts?.map((postObj) => <PostCard key={postObj.id} id={postObj.id} categoryId={postObj.category_id} content={postObj.content} title={postObj.title} createdOn={postObj.publication_date} imageUrl={postObj.image_url} userId={postObj.user_id} onUpdate={useEffect} />)}
    </div>
  );
}
