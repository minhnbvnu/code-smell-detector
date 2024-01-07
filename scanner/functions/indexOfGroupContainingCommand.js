function indexOfGroupContainingCommand(groups, command, ignoreGroup) {
  return groups.findIndex(
    candiateGroup =>
      candiateGroup !== ignoreGroup &&
      candiateGroup.some(candidateItem => candidateItem.command === command)
  );
}