/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { createPostReaction, deletePostReaction } from '../../utils/data/postReactionData';

export default function Reaction({
  reaction, user, postReactions, postId, onUpdate, handleClose,
}) {
  const handleClick = () => {
    const reactions = postReactions?.filter((postReaction) => postReaction.user_id === user.id && postReaction.reaction_id === reaction.id);
    if (reactions?.length) {
      deletePostReaction(reactions[0].post_reaction_id).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      const payload = {
        reactionId: reaction.id,
        postId,
      };
      createPostReaction(payload, user).then(() => {
        onUpdate();
        handleClose();
      });
    }
  };

  return (
    <div className="reactionIcon">

      <img
        src={reaction.image_url}
        onClick={handleClick}
        className="emoji"
        aria-label={reaction.label ? reaction.label : ''}
        aria-hidden={reaction.label ? 'false' : 'true'}
      />
    </div>
  );
}

Reaction.propTypes = {
  reaction: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  postReactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    post_id: PropTypes.number,
  })).isRequired,
  postId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func,

};

Reaction.defaultProps = {
  handleClose: null,
};
