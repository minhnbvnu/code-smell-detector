function getReferer(req) {
  referer = req.query.referer;
  if (undefined == referer) {
    referer = req.header('Referer');
  }

  if (undefined == referer) {
    return null;
  } else {
    return helper.getDomainTokens(referer);
  }
}