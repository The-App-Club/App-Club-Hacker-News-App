import styled from '@emotion/styled';

const StyledCommentContent = styled.div``;

const CommentContent = ({children}) => {
  return <StyledCommentContent>{children}</StyledCommentContent>;
};

export {CommentContent};
