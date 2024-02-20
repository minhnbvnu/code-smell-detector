function scheduleReaction(reaction) {
  var pendingReactions = __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].pendingReactions,
      isRunningReactions = __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].isRunningReactions;

  if (!isRunningReactions) {
    pendingReactions.push(reaction);
  } else {
    var i = pendingReactions.length - 1;

    while (i > flushIndex && pendingReactions[i].priority < reaction.priority) {
      i--;
    }

    pendingReactions.splice(i + 1, 0, reaction);
  }

  runReactions();
}