function stripFbclid(url) {
  const strippedUrl = new URL(url);
  strippedUrl.searchParams.delete("fbclid");
  return strippedUrl.href;
}