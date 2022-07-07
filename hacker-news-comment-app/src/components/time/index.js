import styled from '@emotion/styled';

const StyledTime = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  flex-direction: column;
`;

const Time = ({children}) => {
  return <StyledTime>{children}</StyledTime>;
};

export {Time};
