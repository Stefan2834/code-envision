var express = require('express');
var router = express.Router();
const { Temp, Boards } = require('./schema')

router.get('/get-temp', async function (req, res, next) {
  const temp = await Temp.findOne({})
  console.log(temp)
  res.json({ success: true, temp: temp.current, average: temp.last24Sum / temp.last24Total })
});

router.post('/update-temperature', async (req, res) => {
  let data = req.body
  data = { ...data, temperature: data.temperature.toFixed(2) }
  try {
    const tempExist = await Temp.findOne({})
    if (tempExist) {
      const updatedTemperature = await Temp.findOneAndUpdate(
        {},
        {
          current: data?.temperature,
          last24Sum: Number(data?.temperature) + Number(tempExist.last24Sum),
          last24Total: Number(tempExist.last24Total) + 1,
        },
        { new: false }
      );
    } else {
      const addTemp = new Temp({ current: data?.temperature, last24Sum: data?.temperature, last24Total: 1 })
      await addTemp.save()
    }
    console.log(data)
    res.json({ success: true, data: data })
  } catch (err) {
    console.log(err)
    res.json({ success: false, message: err.message })
  }
})

router.post('/upload-board', async function (req, res, next) {
  const { newBoard } = req.body
  try {
    const board = new Boards({ name: newBoard.name, location: newBoard.location })
    await board.save()
    res.json({ success: true })
  } catch (err) {
    console.log(err)
    res.json({ success: false })
  }
});


router.get('/get-boards', async function (req, res, next) {
  try {
    const boards = await Boards.find({})
    console.log(boards)
    res.json({ success: true, boards: boards })
  } catch (err) {
    console.log(err)
    res.json({ success: false })
  }
});

module.exports = router;
