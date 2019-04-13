var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/yelp_camp_project",
  { useNewUrlParser: true }
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
  {name: "Salmon Creek",
  image: "https://data.whicdn.com/images/320287923/original.png?t=1538570587",
  description: "This is a huge granite hill. "

 },function (err,campground) {
  if(err){
    console.log(err);
  }else{
    console.log(campground);
  }

});*/

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://data.whicdn.com/images/320287923/original.png?t=1538570587"
  },
  {
    name: "Salmon Creek",
    image: "https://data.whicdn.com/images/320287923/original.png?t=1538570587"
  },
  {
    name: "Salmon Creek",
    image: "https://data.whicdn.com/images/320287923/original.png?t=1538570587"
  }
];
app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;

  var newCampground = { name: name, image: image, description: desc };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(2222, process.env.PORT, process.env.IP, function() {
  console.log("Started");
});
