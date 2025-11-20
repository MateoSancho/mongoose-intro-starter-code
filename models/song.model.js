const mongoose = require("mongoose")


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist" // the internal name for the model, used when creating the model.
    }
})

const Song = mongoose.model("Song", songSchema)

module.exports = Song