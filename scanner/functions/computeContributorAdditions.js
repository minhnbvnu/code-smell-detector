function computeContributorAdditions(contributor) {
  return contributor.weeks.reduce((acc, w) => acc + w.a, 0);
}