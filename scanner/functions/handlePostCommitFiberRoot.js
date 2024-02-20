function handlePostCommitFiberRoot(root) {
    if (isProfiling && rootSupportsProfiling(root)) {
      if (currentCommitProfilingMetadata !== null) {
        const {
          effectDuration,
          passiveEffectDuration
        } = Object(backend_utils["h" /* getEffectDurations */])(root); // $FlowFixMe[incompatible-use] found when upgrading Flow

        currentCommitProfilingMetadata.effectDuration = effectDuration; // $FlowFixMe[incompatible-use] found when upgrading Flow

        currentCommitProfilingMetadata.passiveEffectDuration = passiveEffectDuration;
      }
    }
  }