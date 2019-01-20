const path = require('path');
const router = require('express').Router();

//the path redirects users to the dist/index.html to the React application

router.get('*', (req, res) => {
  const route = path.join(__dirname, '..', '..', 'dist', 'index.html');
  res.sendFile(route);
});

module.exports = router;