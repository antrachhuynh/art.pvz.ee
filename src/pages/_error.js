const Error = ({ statusCode }) => {
  console.log(statusCode);
  return null;
};

Error.getInitialProps = ({ res }) => {
  res.redirect('https://your-wordpress-site.com');
  return {};
};

export default Error;
