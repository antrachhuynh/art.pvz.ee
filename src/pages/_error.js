import Router from 'next/router';

function Error({ url }) {
  Router.push(`https://your-wordpress-site.com/${url}`);

  return null;
}

Error.getInitialProps = ({ asPath }) => {
  const url = asPath;
  return { url };
};

export default Error;
