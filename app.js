var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	User = require("./models/user"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	seedDB = require("./seeds"),
	Comment = require("./models/comment");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index")

//mongodb://localhost:27017/yelp_camp_12dep
//seedDB();
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
/*mongoose.connect("mongodb+srv://dbUser:Pp.eAmztci7p!65@cluster0-pqu7q.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
				).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("ERROR:", err.message);
});
*/
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
	secret: "Misty is my little monster",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


var port = process.env.PORT || 3000;
app.listen(port, function(req, res){
	console.log("The YelpCamp Server Has Started!");
});