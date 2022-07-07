import styled from '@emotion/styled';
const StyledCommentExpander = styled.div`
  cursor: pointer;
  margin-left: 6px;
  font-size: 12px;
  user-select: none;
`;

const CommentExpander = ({children, comment, handleClick}) => {
  return (
    <StyledCommentExpander
      onClick={(e) => {
        handleClick(comment.id);
      }}
    >
      {children}
    </StyledCommentExpander>
  );
};

export {CommentExpander};
