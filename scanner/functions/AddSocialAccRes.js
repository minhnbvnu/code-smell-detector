function AddSocialAccRes(res, teamDetails, profileDetails, code = 200, status = 'success') {
  return res
  // .status(code)
    .json({
      code,
      status,
      teamDetails,
      profileDetails,
    });
}