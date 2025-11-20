try {
  process.loadEnvFile()
} catch (error) {
  //console.log(error)
}

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/artist-db")
.then(() => {
  //console.log("connected to the DB! :)")
})
.catch((error) => {
  //console.log(error)
})

const app = express();

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: '*'
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})


// Get /users
app.get("/users", () => {
  // ...
  // User.find()
  // res.json(users)
})

app.get("/potatoes/:potatoId", (req,res) => {
  //console.log(req.body) //access info from body
  //console.log(req.params) //access info from params
  //console.log(req.query) //access info from query
  res.send("Accesing /potatoes, all good")
})

// Routes for the Artists
const Artist = require("./models/artist.model")

app.post("/artist", (req,res) => {
  //console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.send("New Artist was created")
  })
  .catch((error) => {
    //console.log(error)
  })
})

app.get("/artist", (req,res) => {

  Artist.find({sTouring: true}).select({namw: 1, awardsWon: 1}).sort({awardsWon: 1}).limit(3)

  .then((response) => {
    res.json(response)
  })
  .catch((error) => {
    //console.log(error)
  })
})

//put functionality
app.put("/artist/:artistId", (req,res) => {

  //console.log(req.body)
  //console.log(req.params)

  Artist.findByIdAndUpdate(req.params.artistId, {
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.send("all good, artist updated")
  })
  .catch((error) => {
    //console.log(error)
  })
})

//delete functinality
app.delete("/artit/:artistId", async (req,res) => {

  //console.log(req.params)

try{
  await Artist.findByIdAndDelete(req.params.artistId)
  res.send("artist deleted")
} catch (error) {
  //console.log(error)
}
})


// Routes for Songs
const Song = require("./models/song.model")

app.post("/song", async(req,res) => {
  try{

    await Song.create({
      title: req.body.title,
      releaseDate: req.body.releaseDate,
      artists: req.body.artist
    })

    res.send("all good, song created")

  } catch (error) {
    //console.log(error)
  }
})

app.get("/song/:songId", async (req,res) => {

  try{

    const responseSong = await Song
    .findById(req.params.songId) //Find info of only song
    .populate("artist", "name isTouring") //Give all info and sort it by name and isTouring
    //2) .populate("artist", {name, isTouring})
    //3) .populate({
    //path: "artist",
    //select: {name: 1, isTouring: 1}
    //})

    //const responseArtist = await Artist.findById(responseSong.artist)

    res.json(responseSong)

  } catch (error) {
    //console.log(error)
  }
})

app.get("/song", async (req,res) => {

  try{

    const responseSong = await Song
    .find()
    populate("artist")

    res.json(responseSong)

  } catch (error) {
    //console.log(error)
  }
})

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
