import styled from '@emotion/styled';

const StyledCommentContainer = styled.div`
  padding: 16px;
`;
const CommentContainer = ({children}) => {
  return <StyledCommentContainer>{children}</StyledCommentContainer>;
};

export {CommentContainer};
