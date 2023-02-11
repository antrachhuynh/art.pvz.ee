const express = require('express');
const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const mainURL = process.env.WORDPRESS_MAIN_URL ? process.env.WORDPRESS_MAIN_URL : '';

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use((err, req, res) => {
    if (err.statusCode === 500 || err.statusCode === 503 || err.statusCode === 403 || err.statusCode === 404) {
      console.log('redirecting...');
      res.redirect(307, `${mainURL}${req.url}`);
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
