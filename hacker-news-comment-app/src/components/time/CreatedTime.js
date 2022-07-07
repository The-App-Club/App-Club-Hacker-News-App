import styled from '@emotion/styled';

const StyledCreatedTime = styled.span``;

const CreatedTime = ({children}) => {
  return <StyledCreatedTime>{children}</StyledCreatedTime>;
};

export {CreatedTime};
