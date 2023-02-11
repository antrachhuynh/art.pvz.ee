import React from 'react';

const Custom500 = ({ statusCode, url }) => {
  if (statusCode === 500 || statusCode === 503) {
    window.location.href = `https://your-wordpress-site.com/${url}`;
  }
  return <div>Error {statusCode}</div>;
};

Custom500.getInitialProps = async ({ res, err }) => {
  let statusCode = null;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = err.statusCode;
  }
  return { statusCode };
};

export default Custom500;
