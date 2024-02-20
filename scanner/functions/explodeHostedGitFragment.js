function explodeHostedGitFragment(fragment, reporter) {
  const hash = parseHash(fragment);

  const preParts = fragment.split('@');
  if (preParts.length > 2) {
    fragment = preParts[1] + '@' + preParts[2];
  }

  const parts = fragment.replace(/(.*?)#.*/, '$1') // Strip hash
  .replace(/.*:(.*)/, '$1') // Strip prefixed protocols
  .replace(/.git$/, '') // Strip the .git suffix
  .split('/');

  const user = parts[parts.length - 2];
  const repo = parts[parts.length - 1];

  if (user === undefined || repo === undefined) {
    throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidHostedGitFragment', fragment));
  }

  return {
    user,
    repo,
    hash
  };
}