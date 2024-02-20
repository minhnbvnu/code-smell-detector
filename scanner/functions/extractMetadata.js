function extractMetadata(content) {
  var metadata = {};
  var both = splitHeader(content);
  var lines = both.header.split('\n');
  for (var i = 0; i < lines.length - 1; ++i) {
    var keyvalue = lines[i].split(':');
    var key = keyvalue[0].trim();
    var value = keyvalue.slice(1).join(':').trim();
    // Handle the case where you have "Community #10"
    try { value = JSON.parse(value); } catch(e) { }
    metadata[key] = value;
  }
  return {metadata: metadata, rawContent: both.content};
}