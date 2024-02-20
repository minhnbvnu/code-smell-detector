function linkifyTitle(title, link) {
  if (isValidUrl(link)) {
    return linkify(link, title);
  }

  return title;
}