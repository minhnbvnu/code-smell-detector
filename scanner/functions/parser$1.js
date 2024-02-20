function parser$1(str) {
  var regLevel = regex$1['regLevel'];
  var invalidLine = regex$1['invalidLine'];
  var lines = str.split('\n');
  var m;
  var level = 0,
    curLevel = 0;

  var blocks = [];

  var result = new Block(-1);
  var currentBlock = new Block(0);
  result.addChild(currentBlock);
  var levels = [];
  var line = '';

  blocks.push(currentBlock);
  levels.push(level);

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];

    if (line.match(invalidLine)) {
      continue
    }

    if ((m = regLevel.exec(line))) {
      level = m[1].length;
    } else { level = 0; }

    if (level > curLevel) {
      var oldBlock = currentBlock;
      currentBlock = new Block(level);
      oldBlock.addChild(currentBlock);
      blocks.push(currentBlock);
      levels.push(level);
    } else if (level < curLevel) {
      var added = false;

      var k = levels.length - 1;
      for (; k >= 0; --k) {
        if (levels[k] == level) {
          currentBlock = new Block(level);
          blocks.push(currentBlock);
          levels.push(level);
          if (blocks[k].parent != null) { blocks[k].parent.addChild(currentBlock); }
          added = true;
          break
        }
      }

      if (!added) {
        errors.push('Error: Invalid indentation at line ' + i + ': ' + line);
        return
      }
    }

    currentBlock.lines.push(line.replace(regex$1['trim'], ''));
    curLevel = level;
  }

  return result
}