function shouldRunMerge({
  isReleaseBranch,
  isPush,
  prerelease,
  isCurrentFinalVersion,
  hasPendingChangesets,
  prBackExists,
}) {
  return isReleaseBranch && isPush && !prerelease && isCurrentFinalVersion && !hasPendingChangesets && !prBackExists;
}