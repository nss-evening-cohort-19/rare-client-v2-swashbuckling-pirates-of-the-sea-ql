/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostCard from '../../components/posts/PostCard';
import { useAuth } from '../../utils/context/authContext';
import { getPosts } from '../../utils/data/postData';

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getMyPosts = () => {
    getPosts().then(setMyPosts);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const filteredPosts = myPosts.filter((post) => post.user_id.uid === user.uid);

  return (
    <>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} createdOn={post.publication_date} title={post.title} content={post.content} imageUrl={post.image_url} userId={post.user_id} categoryId={post.category_id} id={post.id} onUpdate={getMyPosts} />)
      ) : (
        <>
          <h1>You haven't created any posts</h1>
          <Button onClick={() => router.push('./new')}>Create A New Post</Button>
        </>
      )}
    </>
  );
}
