import styled from '@emotion/styled';

const StyledCommentController = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 1vw;
`;

const CommentController = ({children}) => {
  return <StyledCommentController>{children}</StyledCommentController>;
};

export {CommentController};
