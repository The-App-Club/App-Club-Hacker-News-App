import styled from '@emotion/styled';

const StyledCommentTextarea = styled.textarea`
  resize: vertical;
  max-width: 50%;
  width: 100%;
  min-height: 140px;
  padding: 15px 20px;
  line-height: 1.5;
  font-size: 1rem;
  border: none;
  background: #f0f3f3;
  &:active,
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    min-height: 260px;
  }
  ::placeholder {
    color: #aaafb3;
  }
`;
const CommentTextarea = ({children, handleChange}) => {
  return (
    <StyledCommentTextarea
      onChange={(e) => {
        handleChange(e);
      }}
      placeholder="入力してください"
    >
      {children}
    </StyledCommentTextarea>
  );
};

export {CommentTextarea};
