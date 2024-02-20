function Twitter(twitter_api) {
  // Assiging twitter_api (twitter config) to this.twitter_api
  this.twitter_api = twitter_api;
  // Making a twitter object with config to hit twitter api
  this.twitterObj = new twitterApi({
    consumerKey: twitter_api.api_key,
    consumerSecret: twitter_api.secret_key,
    callback: twitter_api.redirect_url,
  });

  this.twitterLogin = new twitterApi({
    consumerKey: twitter_api.api_key,
    consumerSecret: twitter_api.secret_key,
    callback: twitter_api.login_redirect_url,
  });
  
  this.twitterObjInvite = new twitterApi({
    consumerKey: twitter_api.api_key,
    consumerSecret: twitter_api.secret_key,
    callback: twitter_api.invite_redirect_url,
  });

  this.twitterRq = new TwitterShared({
    consumerKey: twitter_api.api_key,
    consumerSecret: twitter_api.secret_key,
    callback: twitter_api.login_redirect_url,
    baseUrl: TWITTER_CONSTANTS.TWITTER_API_URL,
  });
}