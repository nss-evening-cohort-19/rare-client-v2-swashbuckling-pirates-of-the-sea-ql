import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostCard from '../components/posts/PostCard';
import PostSearch from '../components/posts/PostSearch';
import { getPosts } from '../utils/data/postData';

function Home() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getAllPosts = () => {
    getPosts().then((postArr) => {
      setFilteredPosts(postArr);
      setPosts(postArr);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <hr />
      <PostSearch posts={posts} setFilteredPosts={setFilteredPosts} />
      <hr />
      <Button onClick={(() => router.push('./posts/new'))}>Add New Post</Button>
      <hr />
      <div>
        {filteredPosts.map((post) => (<PostCard key={post.id} createdOn={post.publication_date} title={post.title} content={post.content} imageUrl={post.image_url} userId={post.user_id} categoryId={post.category_id} id={post.id} onUpdate={getAllPosts} />))}
      </div>
    </>
  );
}

export default Home;
