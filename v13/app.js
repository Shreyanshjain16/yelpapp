var express= require("express");
var app=express();
var bodyParser= require("body-parser");
var mongoose=require("mongoose");
var flash =require("connect-flash");
var Campground=require("./models/campground");
 var Comment=require("./models/comment");
 var passport=require("passport");
 var LocalStrategy=require("passport-local");
 var methodOverride=require("method-override");
 var User= require("./models/user");
seedDB=require("./seeds");

var commentRoutes =require("./routes/comments");
var campgroundRoutes =require("./routes/campgrounds");
var indexRoutes= require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_project",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
  secret :"once again dog !",
  resave :false,
  saveUninitialized :false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function (req,res,next) {
  res.locals.currentUser= req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.get("/Shreyansh",function (req,res) {
   res.render("Owner/shreyansh");
});

app.listen(2222,process.env.PORT,process.env.IP,function () {
  console.log("Started");
});
