function prepareProfilingDataFrontendFromExport(profilingDataExport) {
  const {
    version
  } = profilingDataExport;

  if (version !== constants["q" /* PROFILER_EXPORT_VERSION */]) {
    throw Error(`Unsupported profile export version "${version}". Supported version is "${constants["q" /* PROFILER_EXPORT_VERSION */]}".`);
  }

  const timelineData = profilingDataExport.timelineData ? profilingDataExport.timelineData.map(({
    batchUIDToMeasuresKeyValueArray,
    componentMeasures,
    duration,
    flamechart,
    internalModuleSourceToRanges,
    laneToLabelKeyValueArray,
    laneToReactMeasureKeyValueArray,
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
    // Most of the data is safe to parse as-is,
    // but we need to convert the nested Arrays back to Maps.
    batchUIDToMeasuresMap: new Map(batchUIDToMeasuresKeyValueArray),
    componentMeasures,
    duration,
    flamechart,
    internalModuleSourceToRanges: new Map(internalModuleSourceToRanges),
    laneToLabelMap: new Map(laneToLabelKeyValueArray),
    laneToReactMeasureMap: new Map(laneToReactMeasureKeyValueArray),
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
  })) : [];
  const dataForRoots = new Map();
  profilingDataExport.dataForRoots.forEach(({
    commitData,
    displayName,
    initialTreeBaseDurations,
    operations,
    rootID,
    snapshots
  }) => {
    dataForRoots.set(rootID, {
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
        changeDescriptions: changeDescriptions != null ? new Map(changeDescriptions) : null,
        duration,
        effectDuration,
        fiberActualDurations: new Map(fiberActualDurations),
        fiberSelfDurations: new Map(fiberSelfDurations),
        passiveEffectDuration,
        priorityLevel,
        timestamp,
        updaters
      })),
      displayName,
      initialTreeBaseDurations: new Map(initialTreeBaseDurations),
      operations,
      rootID,
      snapshots: new Map(snapshots)
    });
  });
  return {
    dataForRoots,
    imported: true,
    timelineData
  };
}