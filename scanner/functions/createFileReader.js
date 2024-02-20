function createFileReader(fileName) {
  var finished = false;
  var line;
  var commenter = {
    name: undefined,
    subreddit: undefined,
    count: 0
  };

  const liner = new lineByLine(fileName);

  return {
    lastUser,
    lastLine,
    next,
    isFinished,
    fileName
  }

  function isFinished() {
    return finished;
  }

  function lastUser() {
    return commenter;
  }
  function lastLine() {
    return line;
  }

  function next() {
    let lastBuff = liner.next();
    if (!lastBuff) {
      finished = true;
      return false;
    }
    line = lastBuff.toString('utf8');
    let parts = line.split(',');
    if (parts.length !== 3) throw new Error('invalid format ' + line);

    commenter.name = parts[0];
    commenter.subreddit = parts[1];
    commenter.count = Number.parseInt(parts[2], 10);
    if (!Number.isFinite(commenter.count)) throw new Error('Invalid count ' + line);

    return true;
  }
}