/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostCard from '../../components/posts/PostCard';
import UserCard from '../../components/users/UserCard';
import { getPostsByUser } from '../../utils/data/postData';
import { getSingleUser } from '../../utils/data/userData';

export default function ViewSingleUser() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState();
  const router = useRouter();
  const { userId } = router.query;

  const getTheUser = () => {
    getSingleUser(userId).then(setUser);
    getPostsByUser(userId).then(setPosts);
  };

  useEffect(() => {
    getTheUser();
  }, [router]);

  return (
    <>
      <div>
        <UserCard userObj={user} />
      </div>
      <hr />
      <div>
        {posts?.map((post) => (<PostCard key={post.id} createdOn={post.publication_date} title={post.title} content={post.content} imageUrl={post.image_url} userId={post.user_id} categoryId={post.category_id} id={post.id} onUpdate={getTheUser} />))}
      </div>
    </>
  );
}
