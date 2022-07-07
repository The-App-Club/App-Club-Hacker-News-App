import dayjs from 'dayjs';

// https://github.com/yysun/apprun-hn/blob/master/src/app.tsx#L137-L151
function pluralize(number, label) {
  if (!number) number = 0;
  return number === 1 ? number + label : number + label + 's';
}

function timeAgo(pastTime) {
  const currentTime = dayjs();
  const between = currentTime.diff(
    dayjs(pastTime, 'YYYY-MM-DDTHH:mm:ss'),
    'seconds'
  );
  if (between < 3600) {
    return `${pluralize(~~(between / 60), ' minute')} ago`;
  } else if (between < 86400) {
    return `${pluralize(~~(between / 3600), ' hour')} ago`;
  } else if (between < 2628000) {
    return `${pluralize(~~(between / 86400), ' day')} ago`;
  } else if (between < 31536000) {
    return `${pluralize(~~(between / 2628000), ' month')} ago`;
  } else {
    return `${pluralize(~~(between / 31536000), ' year')} ago`;
  }
}

export {timeAgo};
