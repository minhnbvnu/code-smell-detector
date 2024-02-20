function isCheerioObject($object) {
  return $object.cheerio && typeof $object.attr === 'function';
}