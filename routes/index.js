var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/update-temperature', async (req, res) => {
  const data = req.body 
  try {
    res.json({ success: true, data: data })
    console.log(data)
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

module.exports = router;
