function markMetadata() {
    markAndClear(`--react-version-${reactVersion}`);
    markAndClear(`--profiler-version-${src_constants["b" /* SCHEDULING_PROFILER_VERSION */]}`);
    const ranges = getInternalModuleRanges();

    if (ranges) {
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];

        if (Object(shared_isArray["a" /* default */])(range) && range.length === 2) {
          const [startStackFrame, stopStackFrame] = ranges[i];
          markAndClear(`--react-internal-module-start-${startStackFrame}`);
          markAndClear(`--react-internal-module-stop-${stopStackFrame}`);
        }
      }
    }

    if (laneToLabelMap != null) {
      const labels = Array.from(laneToLabelMap.values()).join(',');
      markAndClear(`--react-lane-labels-${labels}`);
    }
  }