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
import ReactionContainer from '../../components/reactions/ReactionContainer';
import { useAuth } from '../../utils/context/authContext';
import getReactions from '../../utils/data/reactionData';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const { user } = useAuth();

  const getAndSetPost = () => {
    getSinglePost(postId).then(setPostDetails).then(() => {
      getReactions().then(setReactions);
    });
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

  console.warn(postDetails);

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
      <ReactionContainer reactions={reactions} postReactions={postDetails.post_reactions} user={user} postId={postDetails.id} onUpdate={getAndSetPost} />
      <div>
        <CommentForm postId={postDetails.id} getAndSetComments={getAndSetComments} />
        {comments?.map((comment) => (
          <CommentCard commentObj={comment} key={comment.id} getAndSetComments={getAndSetComments} />
        ))}
      </div>
    </div>
  );
}
