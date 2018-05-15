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

  this.uploadMedia = function(mediaPath, cb){
    console.log(mediaPath)
    fs.readFile(mediaPath, function (err, data) {
      if (err) throw err;
      this.mediaClient.uploadMedia('image',data,function(err,res){
        cb(res);
	    })    
    }.bind(this));
  }

  this.sendTweet = function(tweet, mediaPath){
    this.mail(tweet, mediaPath);
  }

  
  this.mail = function(content, mediaPath) {
    console.log("trying to tweet");
    this.uploadMedia(mediaPath, function(mediaId){
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

module.exports = Twitter;