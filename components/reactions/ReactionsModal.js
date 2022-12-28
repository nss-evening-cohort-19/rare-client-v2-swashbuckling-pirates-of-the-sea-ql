/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import PropTypes from 'prop-types';
import Reaction from './Reaction';

function ReactionsModal({
  reactions, user, postReactions, postId, onUpdate,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" className="reactions" variant="outline-secondary" onClick={handleShow}>
        <AddReactionOutlinedIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Choose a Reaction!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="reaction-modal">{reactions.map((reaction) => (
          <div className="modalEmoji"><Reaction key={reaction.id} reaction={reaction} user={user} postReactions={postReactions} postId={postId} onUpdate={onUpdate} handleClose={handleClose} />
          </div>
        ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

ReactionsModal.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  postReactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    post_id: PropTypes.number,
  })),
  postId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionsModal;
