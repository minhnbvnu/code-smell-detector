function markComponentRenderStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-render-stop');
    }
  }