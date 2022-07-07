import styled from '@emotion/styled';

const StyledToggleCommentButton = styled.button`
  display: inline-block;
`;

const ToggleCommentButton = ({
  children,
  handleClick,
  commentButtonType,
  isOpenCommnetFormByAdd,
  isOpenCommnetFormByEdit,
}) => {
  if (commentButtonType === 'add') {
    return (
      <StyledToggleCommentButton
        disabled={isOpenCommnetFormByEdit ? true : false}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {children}
      </StyledToggleCommentButton>
    );
  } else if (commentButtonType === 'edit') {
    return (
      <StyledToggleCommentButton
        disabled={isOpenCommnetFormByAdd ? true : false}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        {children}
      </StyledToggleCommentButton>
    );
  } else {
    return null;
  }
};

export {ToggleCommentButton};
