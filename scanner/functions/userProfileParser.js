function userProfileParser(userDetails) {
  return new Promise((resolve, reject) => {
    try {
      const profiles = {
        nextCursor: userDetails.next_cursor,
        previousCursor: userDetails.previous_cursor,
      };
      const profileDetails = [];
      // Formating the userDetails

      userDetails.users.forEach(user => {
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
      profiles.users = profileDetails;
      // Sending response
      resolve(profiles);
    } catch (error) {
      reject(error);
    }
  });
}