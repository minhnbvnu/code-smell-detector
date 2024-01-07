function getCookie(res) {
  return res.headers['set-cookie'][0].split(';')[0];
}