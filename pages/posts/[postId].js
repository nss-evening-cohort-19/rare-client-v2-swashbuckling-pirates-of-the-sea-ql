import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePost } from '../../utils/data/postData';
import CommentForm from '../../components/comments/CommentForm';
import CommentCard from '../../components/comments/CommentCard';
import { getCommentsByPost } from '../../utils/data/commentData';
import PostDetails from '../../components/posts/PostDetails';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   getSinglePost(postId).then(setPostDetails);
  // }, [postId]);

  const getAndSetPost = () => {
    getSinglePost(postId).then(setPostDetails);
  };

  const getAndSetComments = () => {
    getCommentsByPost(postId).then(setComments);
  };

  useEffect(() => {
    getAndSetPost();
    getAndSetComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <div>
      <div>
        <PostDetails postObj={postDetails} />
      </div>
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
