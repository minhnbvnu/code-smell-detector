function deScheduleReaction(reaction) {
  var pendingReactions = __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].pendingReactions,
      isRunningReactions = __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].isRunningReactions;

  if (!isRunningReactions) {
    var i = pendingReactions.indexOf(reaction);

    if (i > -1) {
      pendingReactions.splice(i, 1);
    }
  }
}