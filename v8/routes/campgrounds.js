var express = require("express");
var router = express.Router();
var Campground=require("../models/campground");

router.get("/",function (req,res) {
  console.log(req.user);
Campground.find({},function (err,allCampgrounds) {
   if(err){
     console.log(err);
   }else{
     res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser: req.user});
   }
});
});


router.post("/",isLoggedIn,function (req,res) {
   var name=req.body.name;
   var  image= req.body.image;
   var desc= req.body.description;

   var newCampground= {name:name , image:image, description: desc}
    Campground.create(newCampground,function (err,newlyCreated) {
      if(err){
        console.log(err);
      }else{
        res.redirect("/campgrounds");
      }
    });


});
router.get("/new",isLoggedIn,function (req,res) {
  res.render("campgrounds/new.ejs");
});

router.get("/:id",function (req,res) {
Campground.findById(req.params.id).populate("comments").exec(function (err,foundCampground) {
if(err){
  console.log(err);
}
else{
  console.log("found Campground");
  res.render("campgrounds/show",{campground: foundCampground});
}
});

});

module.exports= router;


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
     return next();
  }
      res.redirect("/login");
}
