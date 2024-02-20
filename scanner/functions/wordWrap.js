function wordWrap(maxLength,input){
  var lines = [];
  var split = input.split(/(\s+)/g);
  var line = [];
  var lineLength = 0;
  var whitespace;
  for (var i = 0; i < split.length; i += 2) {
    var word = split[i];
    var newLength = lineLength + strlen(word);
    if (lineLength > 0 && whitespace) {
      newLength += whitespace.length;
    }
    if(newLength > maxLength){
      if(lineLength !== 0){
        lines.push(line.join(''));
      }
      line = [word];
      lineLength = strlen(word);
    } else {
      line.push(whitespace || '', word);
      lineLength = newLength;
    }
    whitespace = split[i+1];
  }
  if(lineLength){
    lines.push(line.join(''));
  }
  return lines;
}