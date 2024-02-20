function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    const dep = ref2.dep;
    if (dep) {
      {
        triggerEffects(dep, {
          target: ref2,
          type: "set",
          key: "value",
          newValue: newVal
        });
      }
    }
  }