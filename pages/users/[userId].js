/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import UserCard from '../../components/users/UserCard';
import { getSingleUser } from '../../utils/data/userData';

export default function ViewSingleUser() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { userId } = router.query;

  const getTheUser = () => {
    getSingleUser(userId).then(setUser);
  };

  useEffect(() => {
    getTheUser();
  }, [router]);

  return (
    <div>
      <UserCard userObj={user} />
    </div>
  );
}
