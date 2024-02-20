function iss197() {
  for (var key in pattern) {

    // Ignore some node properties
    if (foo) {
      continue;
    }

    // Match array property
    if (_.isArray(pattern[key])) {
      if (!bar) {
        return false;
      }

    // Match object property
    } else if (dolor) {

      // Special case rest params (requires knowledge of sibling nodes)
      if (ipsum) {
        return ipsum;
      } else if (!amet) {
        return false;
      }

    // Match other properties (string, boolean, null, etc.)
    } else if (pattern[key] !== node[key]) {
      return false;
    }
  }
  return true;
}