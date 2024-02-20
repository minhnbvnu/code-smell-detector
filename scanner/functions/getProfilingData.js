function getProfilingData() {
    const dataForRoots = [];

    if (rootToCommitProfilingMetadataMap === null) {
      throw Error('getProfilingData() called before any profiling data was recorded');
    }

    rootToCommitProfilingMetadataMap.forEach((commitProfilingMetadata, rootID) => {
      const commitData = [];
      const initialTreeBaseDurations = [];
      const displayName = displayNamesByRootID !== null && displayNamesByRootID.get(rootID) || 'Unknown';

      if (initialTreeBaseDurationsMap != null) {
        initialTreeBaseDurationsMap.forEach((treeBaseDuration, id) => {
          if (initialIDToRootMap != null && initialIDToRootMap.get(id) === rootID) {
            // We don't need to convert milliseconds to microseconds in this case,
            // because the profiling summary is JSON serialized.
            initialTreeBaseDurations.push([id, treeBaseDuration]);
          }
        });
      }

      commitProfilingMetadata.forEach((commitProfilingData, commitIndex) => {
        const {
          changeDescriptions,
          durations,
          effectDuration,
          maxActualDuration,
          passiveEffectDuration,
          priorityLevel,
          commitTime,
          updaters
        } = commitProfilingData;
        const fiberActualDurations = [];
        const fiberSelfDurations = [];

        for (let i = 0; i < durations.length; i += 3) {
          const fiberID = durations[i];
          fiberActualDurations.push([fiberID, durations[i + 1]]);
          fiberSelfDurations.push([fiberID, durations[i + 2]]);
        }

        commitData.push({
          changeDescriptions: changeDescriptions !== null ? Array.from(changeDescriptions.entries()) : null,
          duration: maxActualDuration,
          effectDuration,
          fiberActualDurations,
          fiberSelfDurations,
          passiveEffectDuration,
          priorityLevel,
          timestamp: commitTime,
          updaters
        });
      });
      dataForRoots.push({
        commitData,
        displayName,
        initialTreeBaseDurations,
        rootID
      });
    });
    let timelineData = null;

    if (typeof getTimelineData === 'function') {
      const currentTimelineData = getTimelineData();

      if (currentTimelineData) {
        const {
          batchUIDToMeasuresMap,
          internalModuleSourceToRanges,
          laneToLabelMap,
          laneToReactMeasureMap,
          ...rest
        } = currentTimelineData;
        timelineData = { ...rest,
          // Most of the data is safe to parse as-is,
          // but we need to convert the nested Arrays back to Maps.
          // Most of the data is safe to serialize as-is,
          // but we need to convert the Maps to nested Arrays.
          batchUIDToMeasuresKeyValueArray: Array.from(batchUIDToMeasuresMap.entries()),
          internalModuleSourceToRanges: Array.from(internalModuleSourceToRanges.entries()),
          laneToLabelKeyValueArray: Array.from(laneToLabelMap.entries()),
          laneToReactMeasureKeyValueArray: Array.from(laneToReactMeasureMap.entries())
        };
      }
    }

    return {
      dataForRoots,
      rendererID,
      timelineData
    };
  }