function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  }