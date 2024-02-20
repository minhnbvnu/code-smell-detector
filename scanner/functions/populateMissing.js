function populateMissing(answers) {
  if (!answers.siteUrl && answers.githubTarget) {
    var t1 = answers.githubTarget.match(RE_GITHUB_TARGET);

    if (isGitHub(t1[2])) {
      answers.siteUrl = 'https://' + t1[2];
    } else {
      answers.siteUrl = 'https://' + t1[1] + '.github.io/' + t1[2];
    }
  }

  if (isGitHub(answers.siteUrl)) {
    var t2;
    var match = answers.siteUrl.match(RE_URL);

    answers.isGitHubProject = match[2] && match[2].length > 1;

    if (!answers.githubTarget) {
     t2 = match[1].split('.')[0] + '/' + (answers.isGitHubProject ? match[2] : match[1]);
      answers.githubTarget = t2.replace(/\/\//g, '/');
    }
  }

  if (answers.githubTarget) {
    var t3 = answers.githubTarget.match(RE_GITHUB_TARGET);
    answers.githubBranch = t3[2] === (t3[1] + '.github.io') ? 'master' : 'gh-pages';
  }

  if (answers.siteUrl) {
    answers.siteHost = extractDomain(answers.siteUrl);
  }
}