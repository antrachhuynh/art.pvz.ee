import React from 'react';

const Error = ({ statusCode }) => {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>
        Wre sorry, but an error occurred while trying to access this page. Please try again later or go to our{' '}
        <a href="https://your-wordpress-site.com">WordPress site</a> for more information.
      </p>
      <p>Error code: {statusCode}</p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
