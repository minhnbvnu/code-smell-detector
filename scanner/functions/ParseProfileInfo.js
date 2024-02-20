function ParseProfileInfo(profileDetails, accessToken, data) {
  return new Promise((resolve, reject) => {
    // logger.info("Informations");
    // logger.info(profileDetails);
    // Formating the response in a structural object useful to insert into DB
    const profileInfo = {
      user_id: profileDetails.id,
      email: data
        ? data.elements[0]['handle~'].emailAddress
          ? data.elements[0]['handle~'].emailAddress
          : ''
        : '',
      // birthday: response.birthday,
      first_name: profileDetails.firstName.localized.en_US,
      last_name: profileDetails.lastName.localized.en_US
        ? profileDetails.lastName.localized.en_US
        : '',
      profile_url: profileDetails.vanityName
        ? `https://www.linkedin.com/in/${profileDetails.vanityName}`
        : '',
      picture_url: profileDetails.profilePicture
        ? profileDetails.profilePicture['displayImage~'].elements[3]
            .identifiers[0].identifier
          ? profileDetails.profilePicture['displayImage~'].elements[3]
              .identifiers[0].identifier
          : ''
        : '',
      // coverpic_url: profileDetails.backgroundPicture ? profileDetails.backgroundPicture['displayImage~'].elements[3].identifiers[0].identifier ? profileDetails.backgroundPicture['displayImage~'].elements[3].identifiers[0].identifier : "" : '',
      friend_count: '0',
      access_token: accessToken,
      info: profileDetails.headline ? profileDetails.headline : '',
    };
    // Sending response

    resolve(profileInfo);
  });
}