function filterChecksFor(reqs) {
  var checks = [];

  if (['github', 'heroku'].indexOf(reqs.hostingChoice) >= 0) {
    checks.push(checkGit);
  }

  if (reqs.hostingChoice === 'gae') {
    checks.push(checkGcloud);
  }

  return checks;
}