const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/campistan");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 50) + 10;
    const camp = new Campground({
      author: "65a546f830927a367f7bd556",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/random?camp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur commodi, atque labore quibusdam placeat, ignissimos reprehenderit facere ad eum animi?",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
