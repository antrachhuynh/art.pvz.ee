const express = require('express');
const app = express();

app.use((res) => {
  res.redirect(process.env.WORDPRESS_MAIN_URL);
});

module.exports = app;
