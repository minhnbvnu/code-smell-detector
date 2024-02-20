function _jwtDeny(res, extra) {
  res.status(403).send('Invalid X-JWT-Signature ' + (extra ? '- ' + extra : ''));
}