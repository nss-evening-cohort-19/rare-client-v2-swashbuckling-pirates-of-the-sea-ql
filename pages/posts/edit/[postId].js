import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostForm from '../../../components/posts/PostForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSinglePost } from '../../../utils/data/postData';

export default function EditPost() {
  const [editPost, setEditPost] = useState({});
  const router = useRouter();
  const { postId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(postId).then(setEditPost);
  }, [postId]);

  return (
    <PostForm postObj={editPost} user={user} />
  );
}
