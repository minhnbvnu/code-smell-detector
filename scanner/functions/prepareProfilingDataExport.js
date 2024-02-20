function prepareProfilingDataExport(profilingDataFrontend) {
  const timelineData = profilingDataFrontend.timelineData.map(({
    batchUIDToMeasuresMap,
    componentMeasures,
    duration,
    flamechart,
    internalModuleSourceToRanges,
    laneToLabelMap,
    laneToReactMeasureMap,
    nativeEvents,
    networkMeasures,
    otherUserTimingMarks,
    reactVersion,
    schedulingEvents,
    snapshots,
    snapshotHeight,
    startTime,
    suspenseEvents,
    thrownErrors
  }) => ({
    // Most of the data is safe to serialize as-is,
    // but we need to convert the Maps to nested Arrays.
    batchUIDToMeasuresKeyValueArray: Array.from(batchUIDToMeasuresMap.entries()),
    componentMeasures: componentMeasures,
    duration,
    flamechart,
    internalModuleSourceToRanges: Array.from(internalModuleSourceToRanges.entries()),
    laneToLabelKeyValueArray: Array.from(laneToLabelMap.entries()),
    laneToReactMeasureKeyValueArray: Array.from(laneToReactMeasureMap.entries()),
    nativeEvents,
    networkMeasures,
    otherUserTimingMarks,
    reactVersion,
    schedulingEvents,
    snapshots,
    snapshotHeight,
    startTime,
    suspenseEvents,
    thrownErrors
  }));
  const dataForRoots = [];
  profilingDataFrontend.dataForRoots.forEach(({
    commitData,
    displayName,
    initialTreeBaseDurations,
    operations,
    rootID,
    snapshots
  }) => {
    dataForRoots.push({
      commitData: commitData.map(({
        changeDescriptions,
        duration,
        effectDuration,
        fiberActualDurations,
        fiberSelfDurations,
        passiveEffectDuration,
        priorityLevel,
        timestamp,
        updaters
      }) => ({
        changeDescriptions: changeDescriptions != null ? Array.from(changeDescriptions.entries()) : null,
        duration,
        effectDuration,
        fiberActualDurations: Array.from(fiberActualDurations.entries()),
        fiberSelfDurations: Array.from(fiberSelfDurations.entries()),
        passiveEffectDuration,
        priorityLevel,
        timestamp,
        updaters
      })),
      displayName,
      initialTreeBaseDurations: Array.from(initialTreeBaseDurations.entries()),
      operations,
      rootID,
      snapshots: Array.from(snapshots.entries())
    });
  });
  return {
    version: constants["q" /* PROFILER_EXPORT_VERSION */],
    dataForRoots,
    timelineData
  };
}