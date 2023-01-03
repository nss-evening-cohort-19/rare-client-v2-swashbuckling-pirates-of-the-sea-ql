import { useEffect, useState } from 'react';
import CategoryFilterButton from '../components/categories/CategoryFilter';
import PostCard from '../components/posts/PostCard';
import PostSearch from '../components/posts/PostSearch';
import { getCategories } from '../utils/data/categoryData';
import { getPosts } from '../utils/data/postData';

function Home() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [posts, setPosts] = useState([]);
  const getAllPosts = () => {
    getPosts().then((postArr) => {
      setFilteredPosts(postArr);
      setPosts(postArr);
    });
  };

  useEffect(() => {
    getAllPosts();
    getCategories().then(setCategoryFilter);
  }, []);

  return (
    <div>
      <div className="categoryFilters">
        {categoryFilter.map((category) => (
          <CategoryFilterButton key={category.id} catObj={category} />
        ))}
      </div>
      <PostSearch posts={posts} setFilteredPosts={setFilteredPosts} />
      <div>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} createdOn={post.publication_date} title={post.title} content={post.content} imageUrl={post.image_url} userId={post.user_id} categoryId={post.category_id} id={post.id} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
