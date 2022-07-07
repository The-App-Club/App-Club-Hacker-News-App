import styled from '@emotion/styled';

const StyledCommentRoot = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: flex-start;
  gap: 1vw;
`;
const CommentRoot = ({children}) => {
  return <StyledCommentRoot>{children}</StyledCommentRoot>;
};

export {CommentRoot};
