function updateSettingsEntry(key, value) {
  var block = doc.textFrames.getByName('ai2html-settings');
  var entry = key + ': ' + value;
  var updated = false;
  var lines;
  if (!block) return;
  lines = stringToLines(block.contents);
  // one alternative to splitting contents into lines is to iterate
  //   over paragraphs, but an error is thrown when accessing an empty pg
  forEach(lines, function(line, i) {
    var data = parseSettingsEntry(line);
    if (!updated && data && data[0] == key) {
      lines[i] = entry;
      updated = true;
    }
  });
  if (!updated) {
    // entry not found; adding new entry at the top of the list,
    // so it will be visible if the content overflows the text frame
    lines.splice(1, 0, entry);
  }
  docIsSaved = false; // doc has changed, need to save
  block.contents = lines.join('\n');
}