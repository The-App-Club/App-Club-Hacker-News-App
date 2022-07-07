import styled from '@emotion/styled';
const StyledCommentAuthor = styled.div`
  font-weight: 700;
`;
const CommentAuthor = ({children}) => {
  return <StyledCommentAuthor>{children}</StyledCommentAuthor>;
};

export {CommentAuthor};
