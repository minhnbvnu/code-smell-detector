function getFacebookFeeds(socialId, accessToken, callback) {
  facebook.setAccessToken(accessToken);
  // facebook.api(`${socialId}/feed?fields=link,privacy,message,source,attachments,created_time,description,comments.summary(true),type,application&limits=50`, (response) => {
  facebook.api(
    `${socialId}/feed?fields=link,privacy,message,source,attachments,created_time,description,reactions.summary(total_count),comments.summary(true),type,application&limits=50`,
    response => {
      if (!response || response.error) {
        callback(response.error, null);
      } else {
        pagination(response, (error, result) => {
          if (error || error != null) {
            callback(error, null);
          }
          const {data} = result;

          callback(null, data);
        });
      }
    }
  );
}