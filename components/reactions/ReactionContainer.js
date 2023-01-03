/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Reaction from './Reaction';
import ReactionsModal from './ReactionsModal';

export default function ReactionContainer({
  reactions, user, postReactions, postId, onUpdate,
}) {
  const reactionsToDisplay = reactions?.filter((reaction) => postReactions?.some((postReaction) => reaction.id === postReaction.reaction_id));
  return (
    <div className="reactionContainer">
      <div className="reactionModalContainer">
        <ReactionsModal reactions={reactions} user={user} postReactions={postReactions} postId={postId} onUpdate={onUpdate} />
      </div>
      {reactionsToDisplay.map((reaction) => {
        const reactionCount = postReactions?.filter((postReaction) => postReaction.reaction_id === reaction.id).length;

        return (
          <div className="reactionCounter">
            <Reaction key={reaction.id} reaction={reaction} user={user} postReactions={postReactions} postId={postId} onUpdate={onUpdate} handleClose={() => null} /> <div className="number">{reactionCount}</div>
          </div>
        );
      })}
    </div>
  );
}

ReactionContainer.propTypes = {
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
