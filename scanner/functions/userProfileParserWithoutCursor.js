function userProfileParserWithoutCursor(userDetails) {
  return new Promise((resolve, reject) => {
    try {
      const profileDetails = [];

      userDetails.forEach(user => {
        const profile = {
          id: user.id_str,
          name: user.name,
          screenName: user.screen_name,
          followerCount: user.followers_count,
          followingCount: user.friends_count,
          statusCount: user.statuses_count,
          isVerifiedUser: user.verified,
          profilePicUrl: user.profile_image_url_https,
        };

        profileDetails.push(profile);
      });
      // Sending response
      resolve(profileDetails);
    } catch (error) {
      reject(error);
    }
  });
}