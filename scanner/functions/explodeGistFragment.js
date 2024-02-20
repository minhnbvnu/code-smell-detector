function explodeGistFragment(fragment, reporter) {
  fragment = (_misc || _load_misc()).removePrefix(fragment, 'gist:');

  const parts = fragment.split('#');

  if (parts.length <= 2) {
    return {
      id: parts[0],
      hash: parts[1] || ''
    };
  } else {
    throw new (_errors || _load_errors()).MessageError(reporter.lang('invalidGistFragment', fragment));
  }
}