import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostCard from '../components/posts/PostCard';
import { getPosts } from '../utils/data/postData';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  return (
    <>
      <Button onClick={(() => router.push('./posts/new'))}>Add New Post</Button>
      <div>
        {posts.map((post) => (<PostCard key={post.id} createdOn={post.publication_date} title={post.title} content={post.content} imageUrl={post.image_url} userId={post.user_id} categoryId={post.category_id} id={post.id} onUpdate={getAllPosts} />))}
      </div>
    </>
  );
}

export default Home;
