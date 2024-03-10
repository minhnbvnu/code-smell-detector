function importFromChromeCPUProfile(chromeProfile) {
  const profile = new profile_1.CallTreeProfileBuilder(chromeProfile.endTime - chromeProfile.startTime);
  const nodeById = new Map();

  for (let node of chromeProfile.nodes) {
    nodeById.set(node.id, node);
  }

  for (let node of chromeProfile.nodes) {
    if (typeof node.parent === 'number') {
      node.parent = nodeById.get(node.parent);
    }

    if (!node.children) continue;

    for (let childId of node.children) {
      const child = nodeById.get(childId);
      if (!child) continue;
      child.parent = node;
    }
  }

  const samples = [];
  const sampleTimes = []; // The first delta is relative to the profile startTime.
  // Ref: https://github.com/v8/v8/blob/44bd8fd7/src/inspector/js_protocol.json#L1485

  let elapsed = chromeProfile.timeDeltas[0]; // Prevents negative time deltas from causing bad data. See
  // https://github.com/jlfwong/speedscope/pull/305 for details.

  let lastValidElapsed = elapsed;
  let lastNodeId = NaN; // The chrome CPU profile format doesn't collapse identical samples. We'll do that
  // here to save a ton of work later doing mergers.

  for (let i = 0; i < chromeProfile.samples.length; i++) {
    const nodeId = chromeProfile.samples[i];

    if (nodeId != lastNodeId) {
      samples.push(nodeId);

      if (elapsed < lastValidElapsed) {
        sampleTimes.push(lastValidElapsed);
      } else {
        sampleTimes.push(elapsed);
        lastValidElapsed = elapsed;
      }
    }

    if (i === chromeProfile.samples.length - 1) {
      if (!isNaN(lastNodeId)) {
        samples.push(lastNodeId);

        if (elapsed < lastValidElapsed) {
          sampleTimes.push(lastValidElapsed);
        } else {
          sampleTimes.push(elapsed);
          lastValidElapsed = elapsed;
        }
      }
    } else {
      const timeDelta = chromeProfile.timeDeltas[i + 1];
      elapsed += timeDelta;
      lastNodeId = nodeId;
    }
  }

  let prevStack = [];

  for (let i = 0; i < samples.length; i++) {
    const value = sampleTimes[i];
    const nodeId = samples[i];
    let stackTop = nodeById.get(nodeId);
    if (!stackTop) continue; // Find lowest common ancestor of the current stack and the previous one

    let lca = null; // This is O(n^2), but n should be relatively small here (stack height),
    // so hopefully this isn't much of a problem

    for (lca = stackTop; lca && prevStack.indexOf(lca) === -1; lca = shouldPlaceOnTopOfPreviousStack(lca.callFrame.functionName) ? utils_1.lastOf(prevStack) : lca.parent || null) {} // Close frames that are no longer open


    while (prevStack.length > 0 && utils_1.lastOf(prevStack) != lca) {
      const closingNode = prevStack.pop();
      const frame = frameInfoForCallFrame(closingNode.callFrame);
      profile.leaveFrame(frame, value);
    } // Open frames that are now becoming open


    const toOpen = [];

    for (let node = stackTop; node && node != lca && !shouldIgnoreFunction(node.callFrame); // Place Chrome internal functions on top of the previous call stack
    node = shouldPlaceOnTopOfPreviousStack(node.callFrame.functionName) ? utils_1.lastOf(prevStack) : node.parent || null) {
      toOpen.push(node);
    }

    toOpen.reverse();

    for (let node of toOpen) {
      profile.enterFrame(frameInfoForCallFrame(node.callFrame), value);
    }

    prevStack = prevStack.concat(toOpen);
  } // Close frames that are open at the end of the trace


  for (let i = prevStack.length - 1; i >= 0; i--) {
    profile.leaveFrame(frameInfoForCallFrame(prevStack[i].callFrame), utils_1.lastOf(sampleTimes));
  }

  profile.setValueFormatter(new value_formatters_1.TimeFormatter('microseconds'));
  return profile.build();
}