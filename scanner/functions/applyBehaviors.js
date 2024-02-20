function applyBehaviors(proto, behaviors, lifecycle) {
      for (let i=0; i<behaviors.length; i++) {
        applyInfo(proto, behaviors[i], lifecycle, excludeOnBehaviors);
      }
    }