function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect2 of effects) {
      if (effect2.computed) {
        triggerEffect(effect2, debuggerEventExtraInfo);
      }
    }
    for (const effect2 of effects) {
      if (!effect2.computed) {
        triggerEffect(effect2, debuggerEventExtraInfo);
      }
    }
  }