function shouldRunPublish({ isReleaseBranch, isPush, hasPendingChangesets, isPublishedOnNpm }) {
  return isReleaseBranch && isPush && !hasPendingChangesets && !isPublishedOnNpm;
}