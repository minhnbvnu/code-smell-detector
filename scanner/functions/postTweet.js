function postTweet(tweet) {
                client.post('statuses/update', {status: tweet}, function (error, tweetBody, response) {
                    if (error) throw error;
                    console.log("Tweeted: " + tweet);
                });
            }