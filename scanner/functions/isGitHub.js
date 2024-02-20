function isGitHub(url) {
  return /.+\.github\.io$/i.test(extractDomain(url));
}