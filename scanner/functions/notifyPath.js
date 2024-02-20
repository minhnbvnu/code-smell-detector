function notifyPath(inst, path, props) {
    let rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      let eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }