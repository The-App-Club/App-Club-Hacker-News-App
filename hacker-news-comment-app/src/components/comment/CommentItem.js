import styled from '@emotion/styled';
const StyledCommentItem = styled.div``;

const CommentItem = ({children}) => {
  return <StyledCommentItem>{children}</StyledCommentItem>;
};

export {CommentItem};
