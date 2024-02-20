function nameFromUrl(url) {
    native.nslog("nameFromUrl");
  let name = url.substring(0, url.indexOf(".user.js"));
  name = name.substring(name.lastIndexOf("/") + 1);
  return name;
}