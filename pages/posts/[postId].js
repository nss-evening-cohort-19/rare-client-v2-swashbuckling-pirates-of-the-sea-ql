import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentForm from '../../components/comments/CommentForm';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});

  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getSinglePost(postId).then(setPostDetails);
  }, [postId]);

  useEffect(() => {
    console.warn(postDetails);
  }, [postDetails]);

  return (
    <div>
      <div>
        <CommentForm postId={postDetails.id} />
        {/* {
          post.comments?.map((comment) => (
            <CommentCard commentObj={comment} key={comment.id} onUpdate={onUpdate} setCommentToUpdate={setCommentToUpdate} />
            ))
          } */}
      </div>
    </div>
  );
}
