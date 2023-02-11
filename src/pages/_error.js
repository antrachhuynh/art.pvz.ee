function Error({ statusCode }) {
  if (statusCode === 500 || statusCode === 503) {
    window.location.replace('https://your-wordpress-site.com');
  }

  return <p>An error {statusCode} occurred on the server</p>;
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
