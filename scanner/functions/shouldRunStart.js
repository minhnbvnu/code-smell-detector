function shouldRunStart({ isMaster, isWorkflowDispatch, botRun }) {
  return isMaster && isWorkflowDispatch && !botRun;
}