function flushReactions() {
  __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].isRunningReactions = true;
  var allReactions = __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].pendingReactions;
  var pendingLength = 0;
  var iterations = 0;
  allReactions.sort(function (a, b) {
    return b.priority - a.priority;
  });

  while (allReactions.length > pendingLength) {
    pendingLength = allReactions.length;

    if (++iterations === MAX_REACTION_ITERATIONS) {
      // tslint:disable-next-line
      console.error("Reaction doesn't converge to a stable state after ".concat(MAX_REACTION_ITERATIONS, " iterations.") + " Probably there is a cycle in the reactive function: ".concat(allReactions[0]));
      break;
    }

    for (; flushIndex < pendingLength; flushIndex++) {
      allReactions[flushIndex].scheduled = false;
      allReactions[flushIndex].scheduleRun();
    }
  }

  flushIndex = 0;
  flushWaiting = false;
  allReactions.length = 0;
  __WEBPACK_IMPORTED_MODULE_5__global_state__["a" /* globalState */].isRunningReactions = false;
}