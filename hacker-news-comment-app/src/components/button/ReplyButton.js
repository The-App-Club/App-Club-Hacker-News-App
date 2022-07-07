import styled from '@emotion/styled';

const StyledReplyButton = styled.button`
  display: inline-block;
`;

const ReplyButton = ({children, handleClick, comment, commentType}) => {
  return (
    <StyledReplyButton
      onClick={(e) => {
        handleClick(e, comment, commentType);
      }}
    >
      {children}
    </StyledReplyButton>
  );
};

export {ReplyButton};
