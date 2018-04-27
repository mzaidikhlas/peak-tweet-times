// by Zaid Ikhlas

// params: tweets/tweets&replies, username
const express = require('express');
const app = express();

const config = require('./config.json');
const Twitter = require('twitter');

var twitterAPI = new Twitter(config);

app.use(express.static('public'));

app.listen('3000', function(){
    console.log('App now listning to port 3000');
});

twitterAPI.get("statuses/user_timeline", {screen_name: "GaryVee", count: 3200 ,exclude_replies: false, include_rts: false})  
.then(function (tweets) 
{
    timeInterval = 12;
    tweetsByTimeInterval = new Array(24/timeInterval).fill(0);
    //console.log(tweetsByTimeInterval);
    for(i=0; i<tweets.length; i++)
    {
        var tweetTime = new Date(tweets[i].created_at);
        var tweetHour = (tweetTime.getUTCHours()-(tweetTime.getTimezoneOffset()/60));  //
       
        if(tweetHour<0)
            tweetHour = tweetHour + (-1 *tweetTime.getTimezoneOffset()/60);
        else if(tweetHour>23)
            tweetHour = tweetHour - (-1 *tweetTime.getTimezoneOffset()/60);

        tweetsByTimeInterval[Math.floor(tweetHour/timeInterval)]++;
    }
    console.log(tweetsByTimeInterval);
})
.catch(function (error) {
    console.error(error);
});