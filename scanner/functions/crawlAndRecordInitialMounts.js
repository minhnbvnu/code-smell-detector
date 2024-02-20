function crawlAndRecordInitialMounts(id, parentID, rootID) {
    if (constants["s" /* __DEBUG__ */]) {
      console.group('crawlAndRecordInitialMounts() id:', id);
    }

    const internalInstance = idToInternalInstanceMap.get(id);

    if (internalInstance != null) {
      internalInstanceToRootIDMap.set(internalInstance, rootID);
      recordMount(internalInstance, id, parentID);
      getChildren(internalInstance).forEach(child => crawlAndRecordInitialMounts(getID(child), id, rootID));
    }

    if (constants["s" /* __DEBUG__ */]) {
      console.groupEnd();
    }
  }