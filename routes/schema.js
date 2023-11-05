const mongoose = require('mongoose')

const temperatureSchema = new mongoose.Schema({
    current: Number,
    id: Number,
    last24Total: Number,
    last24Sum: Number,
});

const particleSchema = new mongoose.Schema({
    particle: Number
})

const humiditySchema = new mongoose.Schema({
    current: Number,
    id: Number,
    last24Sum: Number,
    last24Total: Number,
})


const boardsSchema = new mongoose.Schema({
    location: [Number],
    name: String
})


const Temp = mongoose.model('data', temperatureSchema);
const Particle = mongoose.model('particle', particleSchema);

const Boards = mongoose.model("board", boardsSchema)

module.exports = {
    Temp,
    Particle,
    Boards
}