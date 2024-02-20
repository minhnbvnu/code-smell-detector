function hostedGitFragmentToGitUrl(fragment, reporter) {
  for (const key in hostedGit) {
    const Resolver = hostedGit[key];
    if (Resolver.isVersion(fragment)) {
      return Resolver.getGitHTTPUrl((0, (_hostedGitResolver || _load_hostedGitResolver()).explodeHostedGitFragment)(fragment, reporter));
    }
  }

  return fragment;
}