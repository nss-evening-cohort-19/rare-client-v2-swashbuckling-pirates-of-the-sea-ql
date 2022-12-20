import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostDetails from '../../components/posts/PostDetails';
import { getSinglePost } from '../../utils/data/postData';

export default function ViewSinglePost() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getSinglePost(postId).then(setPostDetails);
  }, [postId]);

  return (
    <PostDetails postObj={postDetails} />
  );
}
