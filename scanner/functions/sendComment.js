function sendComment(user, repo, number, sha, filename, lineMap, message) {
  if (!lineMap[message.line]) {
    // Do not send messages on lines that did not change
    return;
  }

  var opts = {
    user,
    repo,
    number,
    sha,
    path: filename,
    commit_id: sha,
    body: message.message,
    position: lineMap[message.line],
  };
  github.pullRequests.createComment(opts, function(error, res) {
    if (error) {
      console.log(error);
      return;
    }
  });
  console.log('Sending comment', opts);
}