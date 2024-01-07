function pathFromGitFileSync(gitFile) {
  try {
    const gitFileBuff = fs.readFileSync(gitFile, 'utf8');
    return gitFileBuff != null ? gitFileBuff.match(GIT_FILE_REGEX)[1] : null;
  } catch (error) {}
}