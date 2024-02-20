function getRecentFacebookFeeds(socialId, accessToken, since, callback) {
  // Changing the input time to Unix format
  const from = String(moment(since).unix());
  const currentUnixTime = String(moment().unix());
  // Setting access token

  facebook.setAccessToken(accessToken);
  // Calling graph-api for fetching feeds
  facebook.api(
    `${socialId}/feed?fields=link,privacy,message,source,attachments,created_time,description,reactions.summary(total_count),comments.summary(true),type,application&since=${from}&untill=${currentUnixTime}&limit=50`,
    response => {
      if (!response || response.error) {
        // Sending response back
        callback(response.error, null);
      } else {
        // Fetching data by paginations (checking we have new page data or not)
        pagination(response, (error, result) => {
          // Checking the callback contains error or not
          if (error || error != null) {
            callback(error, null);
          }
          const {data} = result;
          // Sending response back

          callback(null, data);
        });
      }
    }
  );
}