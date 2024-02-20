function shouldRunChangesets({ isReleaseBranch, isPush, isWorkflowDispatch, botRun }) {
  return (isReleaseBranch && isPush) || (isReleaseBranch && isWorkflowDispatch && botRun);
}