var mongoose=require("mongoose");
var Campground =require("./models/campground");
var Comment=require("./models/comment");
var data=[
{
  name:"Cloud",
  image:  "https://theimpactnews.com/wp-content/uploads/2016/11/Steps-to-Success-628x353.jpg",
  description :"Narendra Damodardas Modi is an Indian politician serving as the 14th and current Prime Minister of India since 2014. He was the Chief Minister of Gujarat from 2001 to 2014, and is the Member of Parliament for Varanasi. Modi is a member of the Bharatiya Janata Party and the Rashtriya Swayamsevak Sangh."
},
{
  name:"Cloud",
  image:  "https://theimpactnews.com/wp-content/uploads/2016/11/Steps-to-Success-628x353.jpg",
  description :"Narendra Damodardas Modi is an Indian politician serving as the 14th and current Prime Minister of India since 2014. He was the Chief Minister of Gujarat from 2001 to 2014, and is the Member of Parliament for Varanasi. Modi is a member of the Bharatiya Janata Party and the Rashtriya Swayamsevak Sangh."
},
{
  name:"Cloud",
  image:  "https://theimpactnews.com/wp-content/uploads/2016/11/Steps-to-Success-628x353.jpg",
  description :"Narendra Damodardas Modi is an Indian politician serving as the 14th and current Prime Minister of India since 2014. He was the Chief Minister of Gujarat from 2001 to 2014, and is the Member of Parliament for Varanasi. Modi is a member of the Bharatiya Janata Party and the Rashtriya Swayamsevak Sangh."
}


]

function seedDB() {

Campground.remove({},function (err) {

  if(err){
    console.log(err);
  }
  console.log("removed campgrounds!");
});

data.forEach(function(seed){
  Campground.create(seed,function (err,campground) {
    if(err){
      console.log(err);
    }else{
      console.log("added a Campground");
      Comment.create(
        {
          text:"There is no shortcut to success",
          author: "Shreyansh"
        },function (err,comment) {
          if(err){
            console.log(err);
          }else{
          campground.comments.push(comment);
          campground.save();
          console.log("Created new comment");
        }

        });
    }
  });

});
}


module.exports=  seedDB;
