function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    let {nodeList, nodeInfoList} = templateInfo;
    if (nodeInfoList.length) {
      for (let i=0; i < nodeInfoList.length; i++) {
        let info = nodeInfoList[i];
        let node = nodeList[i];
        let bindings = info.bindings;
        if (bindings) {
          for (let i=0; i<bindings.length; i++) {
            let binding = bindings[i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }