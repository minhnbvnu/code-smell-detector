function getChangedHooksIndices(prev, next) {
    if (DevToolsFeatureFlags_extension_oss["d" /* enableProfilerChangedHookIndices */]) {
      if (prev == null || next == null) {
        return null;
      }

      const indices = [];
      let index = 0;

      if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
        while (next !== null) {
          if (didStatefulHookChange(prev, next)) {
            indices.push(index);
          }

          next = next.next;
          prev = prev.next;
          index++;
        }
      }

      return indices;
    }

    return null;
  }