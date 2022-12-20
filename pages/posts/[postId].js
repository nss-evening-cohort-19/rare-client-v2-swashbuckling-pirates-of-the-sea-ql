import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentForm from '../../components/comments/CommentForm';
import CommentCard from '../../components/comments/CommentCard';
import { getAllComments } from '../../utils/data/commentData';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const [comments, setComments] = useState([]);

  const router = useRouter();
  const { postId } = router.query;

  const getAndSetPost = () => {
    getSinglePost(postId).then(setPostDetails);
  };

  const getAndSetComments = () => {
    getAllComments(postId).then(setComments);
  };

  useEffect(() => {
    getAndSetPost();
    getAndSetComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div>
      <div>
        <CommentForm postId={postDetails.id} getAndSetComments={getAndSetComments} />
        {
          comments?.map((comment) => (
            <CommentCard commentObj={comment} key={comment.id} getAndSetComments={getAndSetComments} />
          ))
          }
      </div>
    </div>
  );
}
