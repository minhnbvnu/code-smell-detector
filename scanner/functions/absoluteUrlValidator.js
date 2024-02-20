function absoluteUrlValidator(url) {
  try {
    const githubLink = "github.com/";
    const urlObject = new URL(url);

    const getIndexGithub = url.indexOf(githubLink) + githubLink.length;
    const relativeRepoUrl = url.substring(getIndexGithub, url.length);

    const [owner, repo] = relativeRepoUrl.split("/");

    if (urlObject.hostname !== "github.com") {
      return [false, null];
    }
    if (!owner || !repo || !(urlObject.protocol === "http:" || urlObject.protocol === "https:")) {
      return [false, null];
    }
    return [true, owner + "/" + repo];
  } catch (failedToConstructURL) {
    return [false, null];
  }
}