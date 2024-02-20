function saveTextFile(dest, contents) {
  var fd = new File(dest);
  fd.open('w', 'TEXT', 'TEXT');
  fd.lineFeed = 'Unix';
  fd.encoding = 'UTF-8';
  fd.writeln(contents);
  fd.close();
}