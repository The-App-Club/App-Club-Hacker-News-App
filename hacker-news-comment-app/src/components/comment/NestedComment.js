import {Comment} from './Comment';

const NestedComment = ({
  comment,
  comments,
  collapse,
  setComments,
  setCommentTree,
}) => {
  return (comment.children || []).map((comment) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        comments={comments}
        collapse={collapse}
        setComments={setComments}
        setCommentTree={setCommentTree}
      />
    );
  });
};

export {NestedComment};
