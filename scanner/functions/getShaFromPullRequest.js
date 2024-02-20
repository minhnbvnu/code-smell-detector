function getShaFromPullRequest(user, repo, number, callback) {
  github.pullRequests.get({user, repo, number}, (error, res) => {
    if (error) {
      console.log(error);
      return;
    }
    callback(res.head.sha);
  });
}