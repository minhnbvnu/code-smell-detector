function getFilesFromCommit(user, repo, sha, callback) {
  github.repos.getCommit({user, repo, sha}, (error, res) => {
    if (error) {
      console.log(error);
      return;
    }
    callback(res.files);
  });
}