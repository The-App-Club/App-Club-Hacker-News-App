import styled from '@emotion/styled';

const StyledCommentControllerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentControllerItem = ({children}) => {
  return <StyledCommentControllerItem>{children}</StyledCommentControllerItem>;
};

export {CommentControllerItem};
