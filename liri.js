var fs = require('fs');
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');

function showTweets(){
		var user = new Twitter({
			consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret:  keys.twitterKeys.consumer_secret,
  			access_token_key: keys.twitterKeys.access_token_key,
  			access_token_secret: keys.twitterKeys.access_token_secret
  		});

  	var twitterInfo = {
  		twitterHandle: 'navinudiaver', 
  		count: 20
  	};

  	user.get("statuses/user_timeline", twitterInfo, function(error, tweets, response){
  		if (!error && response.statusCode == 200) {
  			for(var i = 0; i < tweets.length; i++){
  				console.log("Tweet: " + tweets[i].text + "Date: " + tweets[i].created_at);
  				console.log('\n');
  			}
  		} 
  		else {
  			console.log(error);
  		}
  	});
 };

function showSong() {
	if(process.argv[3] === undefined){
		var song = "What's My Age Again";
	} 
	else {
		var song = process.argv[3];
	}
	Spotify.search({type: 'track', query: song, count: 1}, function(error, data){
		if(error) {
			console.log('Error:' + error);
			return;
		} 
		else{
			console.log("Artist:" + data.tracks.items[0].artists[0].name);
			console.log("Song Name:" + data.tracks.items[0].name);
			console.log("Preview Link:" + data.tracks.items[0].preview_url);
			console.log("Album:" + data.tracks.items[0].album.name);
			fs.appendFile('random.txt', "Artist:" + data.tracks.items[0].artists[0].name + "\n" + "Song Name:" + data.tracks.items[0].name + "\n" + "Album Name" + data.tracks.items[0].album.name + "\n" + "Preview Link:" + data.tracks.items[0].preview_url+ "\n");
		}
	})
}; 

function showMovie() {
		if(process.argv[3] === undefined){
			var movie = "Mr. Nobody";
		} 
		else {
			var movie = process.argv[3];
		};
	var OMDB = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=long&tomatoes=true&r=json';
		request(OMDB, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Title:" + JSON.parse(body) ["Title"]);
				console.log("Year:" + JSON.parse(body) ["Year"]);
				console.log("IMDB Rating:" + JSON.parse(body) ["imdbRating"]);
				console.log("Country:" + JSON.parse(body) ["Country"]);
				console.log("Language:" + JSON.parse(body) ["Language"]);
				console.log("Plot:" + JSON.parse(body) ["Plot"]);
				console.log("Actors:" + JSON.parse(body) ["Actors"]);
				console.log("Rotten Tomatoes Rating:" + JSON.parse(body) ["rottenTomatoesRating"]);
			} 
		});
	}; 

function doWhat() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		} 
		else {
			var array = data.split(","); 
			process.argv[2] = array[0];
			process.argv[3] = array[1];
			};
			options();
			})
		};

function options() {
	switch(process.argv[2]){
	case 'my-tweets': showTweets();
	break;

	case 'spotify-this-song': showSong();
	break;

	case 'movie-this' : showMovie();
	break;

	case 'do-what-it-says' : doWhat();
	break;
	}
};
options();
