/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import PostDetails from '../../components/posts/PostDetails';
import { useAuth } from '../../utils/context/authContext';
import { getPosts } from '../../utils/data/postData';

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getPosts().then(setMyPosts);
  }, []);

  return <>{myPosts.map((post) => (post.user_id.uid === user.uid ? <PostDetails postObj={post} /> : <h1>You haven't created any posts</h1>))}</>;
}
