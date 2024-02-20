function areCookiesBlocked(doc = document) {
  try {
    doc.cookie;
    return false;
  } catch (e) {
    return true;
  }
}