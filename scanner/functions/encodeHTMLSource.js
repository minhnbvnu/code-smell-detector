function encodeHTMLSource(str) {
  var encodeHTMLRules = {"&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;', "\v": '<b>', "\b": '</b>'},
      matchHTML = /&(?!#?\w+;)|<|>|"|'|\/|[\v]|[\b]/g;
  return str ? str.replace(matchHTML, function(m) {
    return encodeHTMLRules[m] || m;
  }) : str;
}