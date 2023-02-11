import Router from 'next/router';

function Error({ url }) {
  const mainURL = process.env.WORDPRESS_MAIN_URL ? process.env.WORDPRESS_MAIN_URL : '';

  Router.push(`${mainURL}/${url}`);

  return null;
}

Error.getInitialProps = ({ asPath }) => {
  const url = asPath;
  return { url };
};

export default Error;
