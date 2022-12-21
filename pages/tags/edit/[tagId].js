import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTag, getTags } from '../../../utils/data/tagData';
import TagForm from '../../../components/tags/TagForm';

export default function EditTag() {
  const [editTag, setEditTag] = useState({});
  const router = useRouter();
  const { tagId } = router.query;
  useEffect(() => {
    getSingleTag(tagId).then(setEditTag);
  }, [tagId]);
  return (<TagForm object={editTag} />);
}
