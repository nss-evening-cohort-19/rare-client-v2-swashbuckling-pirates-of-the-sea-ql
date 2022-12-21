import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentForm from '../../components/comments/CommentForm';
import CommentCard from '../../components/comments/CommentCard';
import { getCommentsByPost } from '../../utils/data/commentData';
import PostDetails from '../../components/posts/PostDetails';
import CategoryFilterButton from '../../components/categories/CategoryFilter';
import { getCategories } from '../../utils/data/categoryData';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const getAndSetPost = () => {
    getSinglePost(postId).then(setPostDetails);
  };

  const getAndSetComments = () => {
    getCommentsByPost(postId).then(setComments);
  };

  useEffect(() => {
    getAndSetPost();
    getAndSetComments();
    getCategories().then(setCategoryFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div className="d-flex flex-wrap justify-content-between">
      <Button variant="link" onClick={() => router.push('/')}>
        All
      </Button>
      {categoryFilter?.map((category) => (
        <CategoryFilterButton key={category.id} catObj={category} />
      ))}
      <div>
        <PostDetails postObj={postDetails} />
      </div>
      <div>
        <CommentForm postId={postDetails.id} getAndSetComments={getAndSetComments} />
        {comments?.map((comment) => (
          <CommentCard commentObj={comment} key={comment.id} getAndSetComments={getAndSetComments} />
        ))}
      </div>
    </div>
  );
}
