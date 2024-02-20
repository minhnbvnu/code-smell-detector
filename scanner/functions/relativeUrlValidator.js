function relativeUrlValidator(url) {
  try {
    const githubLink = "github.com/";
    const newUrl = "https://" + githubLink + url;
    const urlObject = new URL(newUrl);

    const [owner, repo] = url.split("/");
    if (!owner || !repo || !(urlObject.protocol === "http:" || urlObject.protocol === "https:")) {
      return [false, null];
    }
    return [true, url];
  } catch (failedToConstructURL) {
    return [false, null];
  }
}