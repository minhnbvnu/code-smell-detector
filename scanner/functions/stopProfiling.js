function stopProfiling() {
    isProfiling = false;
    recordChangeDescriptions = false;

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(false);
    }
  }