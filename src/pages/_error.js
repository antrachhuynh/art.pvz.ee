import React from 'react';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;
    return <p>{statusCode ? `An lỗi ${statusCode} occurred on server` : 'An error occurred on client'}</p>;
  }
}

export default ErrorPage;
