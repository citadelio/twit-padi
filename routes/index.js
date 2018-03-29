var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://citadel:jakande@ds117719.mlab.com:17719/heroku_vckb7nk5')
db.connection;
var client = new Twitter({
  consumer_key: 'Ej4ZMbKeojfHCdBUlDW10TiKU',
  consumer_secret: '6IEoJkQ7AfWAz1K101FWgQ4LIZAU8YZBRvt8TNCmhxCYQUHL60',
  access_token_key: '586786732-jVqCU21wkZ1QBJqpospzNZLpvhlT7X2dS1hHcxTB',
  access_token_secret: 'IH96mqyvkFpNctiQ8ir9hURDPmQBFwH7h7xgLkXxqvTkd'
});



// var handlesSearched = [];
 var handleModel = require('../models/handle');

handleModel.find({}, function(err,data){
		if(err) throw err;
		handlesSearched = data;
})

router.get('/about', function(req, res){
	res.render('about');
})
router.get('/', function(req, res){
	handleModel.find({}, function(err,data){
		if(err) throw err;
		handlesSearchedLength = data.length;
console.log(handlesSearchedLength)
	res.render('index', {shc : handlesSearchedLength})
	})
});



router.post('/', function(req, res){
	var handle = req.body.handle;
	var newHandle = new handleModel({
		handle:handle
	})
	newHandle.save(function(err){
		if(err) console.log(err);
		handlesSearched.push(newHandle);
		var totalCount = handlesSearched.length
		var statusMsg = "#"+totalCount+"  Twit-Padi lets you find out who your true twitter friends are. @"+ handle+" just used Twit-Padi. check yours at http://twit-padi.herokuapp.com. #twitPadi #nodejs #nodejsafrica #nodeschool #nodeschoolphc #techphc";
		console.log(statusMsg);

		
		//MAke a tweet
		client.post('statuses/update', {status: statusMsg},  function(error, tweet, response) {
		 // if(error) console.log(error);
			console.log(statusMsg);
		});

	});
	var params = {screen_name: handle};
	var dontFollowBack = [];
	var iDoNotFollow = [];
	var showdontFollowBackUsers = [];
	var showiDoNotFollowUsers = [];
	var followersCount, followingCount;
	
	// Follow Checker
client.get('followers/ids', params, function(error, followers_list, response) {

 if (error) {console.log(error);}
  var followers = followers_list.ids;
  var followersCount= followers.length;
    client.get('friends/ids', params, function(error, following_list, response) {
 			if (error) throw error;
					var following = following_list.ids;
     			 var followingCount = following.length;
     			// console.log(followersCount)
     			 // console.log(followingCount)
  			 if(followersCount <= 0 || followingCount <= 0){
		res.render('index', {handle:handle, followers: followersCount, following:followingCount})

     			 }
else{
			  following.forEach(function(person){
		       		if(followers.indexOf(person) === -1){
		       			dontFollowBack.push(person);
		       		}
		       });

		       followers.forEach(function(person){
		       	if(following.indexOf(person) === -1){
		       		iDoNotFollow.push(person);
		       	}
		       })
             		//	console.log(dontFollowBack)
             		dontFollowBack = dontFollowBack.slice(0, 99);
             		dontFollowBackString = dontFollowBack.join();

             		iDoNotFollow = iDoNotFollow.slice(0, 99);
             		iDoNotFollowString = iDoNotFollow.join();
             		//console.log(dontFollowBackString)


             		//for users who do not follow me back
             		client.get('users/lookup', {user_id : dontFollowBackString}, function(err, results, response){
             			if(err) throw err;
             			results.forEach(function(user){
             				var userObject = {
             					name : user.name,
             					handle : user.screen_name,
             					pic : user.profile_image_url
             				};
             				showdontFollowBackUsers.push(userObject);

             			});
             					client.get('users/lookup', {user_id : iDoNotFollowString}, function(err, results, response){
             						if(err) throw err;
             			results.forEach(function(user){
             				var userObject = {
             					name : user.name,
             					handle : user.screen_name,
             					pic : user.profile_image_url
             				};
             				showiDoNotFollowUsers.push(userObject);

             			});
             			handleModel.find({}, function(err,data){
		if(err) throw err;
		handlesSearchedLength = data.length;
		             			              	res.render('index', {shc : handlesSearchedLength, handle:handle, followers: followersCount, following:followingCount, dontFollowMeUsers: showdontFollowBackUsers, iDoNotFollowUsers: showiDoNotFollowUsers})

	})

             			 });
             			  });
     			 }




});

});
})









module.exports = router