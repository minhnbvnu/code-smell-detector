function prepareProfilingDataFrontendFromBackendAndStore(dataBackends, operationsByRootID, snapshotsByRootID) {
  const dataForRoots = new Map();
  const timelineDataArray = [];
  dataBackends.forEach(dataBackend => {
    const {
      timelineData
    } = dataBackend;

    if (timelineData != null) {
      const {
        batchUIDToMeasuresKeyValueArray,
        internalModuleSourceToRanges,
        laneToLabelKeyValueArray,
        laneToReactMeasureKeyValueArray,
        ...rest
      } = timelineData;
      timelineDataArray.push({ ...rest,
        // Most of the data is safe to parse as-is,
        // but we need to convert the nested Arrays back to Maps.
        batchUIDToMeasuresMap: new Map(batchUIDToMeasuresKeyValueArray),
        internalModuleSourceToRanges: new Map(internalModuleSourceToRanges),
        laneToLabelMap: new Map(laneToLabelKeyValueArray),
        laneToReactMeasureMap: new Map(laneToReactMeasureKeyValueArray)
      });
    }

    dataBackend.dataForRoots.forEach(({
      commitData,
      displayName,
      initialTreeBaseDurations,
      rootID
    }) => {
      const operations = operationsByRootID.get(rootID);

      if (operations == null) {
        throw Error(`Could not find profiling operations for root "${rootID}"`);
      }

      const snapshots = snapshotsByRootID.get(rootID);

      if (snapshots == null) {
        throw Error(`Could not find profiling snapshots for root "${rootID}"`);
      } // Do not filter empty commits from the profiler data!
      // Hiding "empty" commits might cause confusion too.
      // A commit *did happen* even if none of the components the Profiler is showing were involved.


      const convertedCommitData = commitData.map((commitDataBackend, commitIndex) => ({
        changeDescriptions: commitDataBackend.changeDescriptions != null ? new Map(commitDataBackend.changeDescriptions) : null,
        duration: commitDataBackend.duration,
        effectDuration: commitDataBackend.effectDuration,
        fiberActualDurations: new Map(commitDataBackend.fiberActualDurations),
        fiberSelfDurations: new Map(commitDataBackend.fiberSelfDurations),
        passiveEffectDuration: commitDataBackend.passiveEffectDuration,
        priorityLevel: commitDataBackend.priorityLevel,
        timestamp: commitDataBackend.timestamp,
        updaters: commitDataBackend.updaters !== null ? commitDataBackend.updaters.map(serializedElement => {
          const [serializedElementDisplayName, serializedElementHocDisplayNames] = Object(utils["u" /* separateDisplayNameAndHOCs */])(serializedElement.displayName, serializedElement.type);
          return { ...serializedElement,
            displayName: serializedElementDisplayName,
            hocDisplayNames: serializedElementHocDisplayNames
          };
        }) : null
      }));
      dataForRoots.set(rootID, {
        commitData: convertedCommitData,
        displayName,
        initialTreeBaseDurations: new Map(initialTreeBaseDurations),
        operations,
        rootID,
        snapshots
      });
    });
  });
  return {
    dataForRoots,
    imported: false,
    timelineData: timelineDataArray
  };
}