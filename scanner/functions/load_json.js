function load_json(clipboard) {
  var s = clipboard.getData('text/html');
  // System/browsers may add some more stuff before/after our content, so
  // find where our prefix and suffix are.
  var pix = s.indexOf(jcbprefix);
  var six = s.lastIndexOf(jcbsuffix);
  if (pix === -1 || six === -1) {
    return null;
  }
  return JSON.parse(s.slice(pix + jcbprefix.length, six));
}