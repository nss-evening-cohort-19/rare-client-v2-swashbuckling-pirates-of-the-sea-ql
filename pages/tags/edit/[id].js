import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTags } from '../../../utils/data/tagData';
import TagForm from '../../../components/tags/TagForm';

export default function EditTag() {
  const [editTag, setEditTag] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getTags(id).then(setEditTag);
  }, [id]);
  return (<TagForm obj={editTag} />);
}
