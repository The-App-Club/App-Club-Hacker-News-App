import styled from '@emotion/styled';

const StyledMetricsButton = styled.button`
  display: inline-block;
`;

const MetricsButton = ({
  children,
  metricsType,
  downVote,
  upVote,
  handleClick,
  comment,
}) => {
  if (metricsType === 'upVote') {
    console.log('upVote', upVote);
    // TODO ここでデータ保存POST
    return (
      <StyledMetricsButton
        onClick={(e) => {
          handleClick(e, comment);
        }}
      >
        {children}
      </StyledMetricsButton>
    );
  } else if (metricsType === 'downVote') {
    console.log('downVote', downVote);
    // TODO ここでデータ保存POST
    return (
      <StyledMetricsButton
        onClick={(e) => {
          handleClick(e, comment);
        }}
      >
        {children}
      </StyledMetricsButton>
    );
  } else {
    null;
  }
  return (
    <StyledMetricsButton
      onClick={(e) => {
        handleClick(e, comment);
      }}
    >
      {children}
    </StyledMetricsButton>
  );
};

export {MetricsButton};
