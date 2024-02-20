function entry(node, next, subj) {
  return next(node, subj) ? node : null
}