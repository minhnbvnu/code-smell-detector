function recordReactMeasureStarted(type, lanes) {
    // Decide what depth thi work should be rendered at, based on what's on the top of the stack.
    // It's okay to render over top of "idle" work but everything else should be on its own row.
    let depth = 0;

    if (currentReactMeasuresStack.length > 0) {
      const top = currentReactMeasuresStack[currentReactMeasuresStack.length - 1];
      depth = top.type === 'render-idle' ? top.depth : top.depth + 1;
    }

    const lanesArray = laneToLanesArray(lanes);
    const reactMeasure = {
      type,
      batchUID: currentBatchUID,
      depth,
      lanes: lanesArray,
      timestamp: getRelativeTime(),
      duration: 0
    };
    currentReactMeasuresStack.push(reactMeasure);

    if (currentTimelineData) {
      const {
        batchUIDToMeasuresMap,
        laneToReactMeasureMap
      } = currentTimelineData;
      let reactMeasures = batchUIDToMeasuresMap.get(currentBatchUID);

      if (reactMeasures != null) {
        reactMeasures.push(reactMeasure);
      } else {
        batchUIDToMeasuresMap.set(currentBatchUID, [reactMeasure]);
      }

      lanesArray.forEach(lane => {
        reactMeasures = laneToReactMeasureMap.get(lane);

        if (reactMeasures) {
          reactMeasures.push(reactMeasure);
        }
      });
    }
  }