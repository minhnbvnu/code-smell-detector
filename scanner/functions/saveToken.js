function saveToken(key, json) {
  json.expires = Date.now() + json.expires_in * 1000;
  localStorage.setItem(key, JSON.stringify(json));
  localStorage.setItem('_auth_getProfileUserInfo', JSON.stringify(json));
}