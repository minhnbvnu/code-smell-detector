function getWakeableID(wakeable) {
    if (!wakeableIDs.has(wakeable)) {
      wakeableIDs.set(wakeable, wakeableID++);
    }

    return wakeableIDs.get(wakeable);
  }