const mongoose = require("mongoose")

//Schema (structure)
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    awardsWon: {
        type: Number,
        required: true,
        min: 0
    },
    isTouring: Boolean,
    genre: {
        type: [String],
        enum: ["rock", "indie", "alternative", "metal", "jazz", "country"]
    }
})

//Model (tool to use data)
const Artist = mongoose.model("Artist", artistSchema)
// First argument is name of the model, always singular, single word, always capitalized
// Second argument -> schema we just created

module.exports = Artist