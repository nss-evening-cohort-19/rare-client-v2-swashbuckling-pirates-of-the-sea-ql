import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../utils/context/authContext';
import { deleteUser } from '../../utils/data/userData';
import { signOut } from '../../utils/auth';

export default function UserCard({ userObj }) {
  const { user } = useAuth();

  const deleteTheUser = () => {
    if (window.confirm('Are you sure you want to delete this?')) {
      deleteUser(userObj.id).then(() => {
        signOut();
      });
    }
  };

  return (
    <Card className="user-card">
      <div className="user-card-left">
        <div className="user-card-img-name">
          <Card.Img className="user-profile-card-img" variant="top" src={userObj.profileImageUrl} />
        </div>
      </div>
      <div className="user-card-right">
        <div className="user-card-first-last">
          <Card.Title>{userObj.firstName} {userObj.lastName}</Card.Title>
          {user.uid === userObj.uid ? (
            <>
              <Link className="" href={`/users/edit/${userObj.id}`} passHref>
                <IconButton aria-label="edit" className="edit-btn">
                  <EditIcon style={{ color: 'black' }} />
                </IconButton>
              </Link>
              <IconButton aria-label="delete" className="delete-btn " onClick={deleteTheUser}>
                <DeleteIcon style={{ color: 'black' }} />
              </IconButton>
            </>
          ) : ('')}
        </div>
        <div className="user-card-email-date">
          <Card.Text>{userObj.email}</Card.Text>
          <Card.Text>Author Since: {userObj.createdOn}</Card.Text>
        </div>
        <div className="user-bio">
          <Card.Text>{userObj.bio}</Card.Text>
        </div>
      </div>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
    profileImageUrl: PropTypes.string,
    createdOn: PropTypes.string,
  }).isRequired,
};
