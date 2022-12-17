/* eslint-disable react-hooks/exhaustive-deps */
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
// import { getSingleUser } from '../utils/data/userData';
// import { getPosts } from '../utils/data/postData';

function Home() {
  const { user } = useAuth();
  // const [theUser, setTheUser] = useState();
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getPosts().then(setPosts);
  // }, []);

  // useEffect(() => {
  //   getSingleUser(1).then(setTheUser);
  // }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
