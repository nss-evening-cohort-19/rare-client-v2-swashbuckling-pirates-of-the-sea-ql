/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { getSingleUser } from '../../../utils/data/userData';

export default function EditUser() {
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
      <RegisterForm user={user} onUpdate={getTheUser} />
    </div>
  );
}
