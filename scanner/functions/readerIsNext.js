function readerIsNext(aReader, bReader) {
  let a = aReader.lastUser();
  let b = bReader.lastUser();

  let userDiff = a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  if (userDiff) return userDiff;

  let subredditDiff = a.subreddit < b.subreddit ? -1 : a.subreddit > b.subreddit ? 1 : 0;
  if (subredditDiff) return subredditDiff;

  var countDiff = a.count - b.count;
  if (countDiff) return countDiff;

  return (aReader.fileName.localeCompare(bReader.fileName));
}