var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
	name: "Afternoon",
	image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
	 description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle."
	},
	{
	name: "Late Night",
	image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
	 description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle."
	},
	{
	name: "Early Morning",
	image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
	 description: "Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent or a recreational vehicle."
	}
]

function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds");
			
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					}else{
						console.log("added a campground");
						Comment.create({text: "This place is great",
									   author: "Mom"
									   },function(err, comment){
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
	});
	
}

module.exports = seedDB;