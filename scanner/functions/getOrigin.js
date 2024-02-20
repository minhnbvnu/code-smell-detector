function getOrigin() {
  var location = getWindow().location;
  var origin = location.origin;

  if (!origin) {
    origin = objectHelper.getOriginFromUrl(location.href);
  }

  return origin;
}