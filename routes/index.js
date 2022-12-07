//Import router from express
const router = require('express').Router();
//Import routes from api folder
const apiRoutes = require('./api');
//Use the routes from api folder with /api
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>") //Define response when an incorrect route is set
});

module.exports = router; //Export router