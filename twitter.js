var _ = require('lodash');

var fs = require('fs');
var TwitterApi = require('twitter');
var TwitterMedia = require('twitter-media');

require('dotenv').config()

var Twitter = function() {
  this.init = function(){
    _.bindAll(this);
    this.client = new TwitterApi({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_TOKEN_SECRET
    });
    this.mediaClient = new TwitterMedia({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      token: process.env.TWITTER_ACCESS_TOKEN,
      token_secret: process.env.TWITTER_TOKEN_SECRET
    });
  };

  this.uploadMedia = function(cb){
    fs.readFile("./img/-143x-150.png", function (err, data) {
      if (err) throw err;
      this.mediaClient.uploadMedia('image',data,function(err,res){
        cb(res);
	    })    
    }.bind(this));
  }

  this.sendTweet = function(){
    var text = "test tweet tweet"
    this.mail(text);
  }

  
  this.mail = function(content, done) {
    console.log("trying to tweet");
    this.uploadMedia(function(mediaId){
      this.client.post('statuses/update', {status: content, media_ids: mediaId},  function(error, tweet, response) {
        if(error || !response) {
          console.log('Twitter ERROR:', error)
        } else if(response && response.active){
          console.log('Twitter Message Sent')
        }
      });
    }.bind(this)); 
  };
};

var twitter = new Twitter()
twitter.init()
twitter.sendTweet()

module.exports = Twitter;