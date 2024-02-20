function shouldRunPromote({ isReleaseBranch, isWorkflowDispatch, botRun }) {
  return isReleaseBranch && isWorkflowDispatch && !botRun;
}