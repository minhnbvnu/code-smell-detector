function notifySplices(inst, array, path, splices) {
    let splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = {indexSplices: null};
  }