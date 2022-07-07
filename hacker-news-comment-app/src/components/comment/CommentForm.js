import styled from '@emotion/styled';

const StyledCommentForm = styled.form``;

const CommentForm = ({children}) => {
  return (
    <StyledCommentForm
      onSubmit={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      {children}
    </StyledCommentForm>
  );
};

export {CommentForm};
