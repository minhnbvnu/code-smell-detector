function mergeAlertClicked(alertId) {

  const merge = $("#escalateOrMergeButton").data("merge");
  const multiMerge = $("#escalateOrMergeButton").data("multi-merge");

  escalateOrMergeAlert(alertId, merge, multiMerge);

}