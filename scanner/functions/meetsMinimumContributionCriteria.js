function meetsMinimumContributionCriteria(contributor, index) {
  return computeContributorAdditions(contributor) > 2;
}