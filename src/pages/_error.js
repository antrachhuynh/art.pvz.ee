const Error = ({ statusCode }) => {
  console.log(statusCode);
  return null;
};

Error.getInitialProps = ({ res }) => {
  const mainURL = process.env.WORDPRESS_MAIN_URL ? process.env.WORDPRESS_MAIN_URL : '';
  res.writeHead(307, { Location: mainURL });
  res.end();

  return {};
};

export default Error;
