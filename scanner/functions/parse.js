function parse(xml) {
  return new DOMParser().parseFromString(xml, 'application/xml');
}