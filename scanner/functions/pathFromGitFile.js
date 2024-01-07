function pathFromGitFile(gitFile) {
  return new Promise(resolve => {
    fs.readFile(gitFile, 'utf8', (err, gitFileBuff) => {
      if (err == null && gitFileBuff != null) {
        const result = gitFileBuff.toString().match(GIT_FILE_REGEX);
        resolve(result != null ? result[1] : null);
      } else {
        resolve(null);
      }
    });
  });
}