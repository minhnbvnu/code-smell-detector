function getIDOfComposite(inst) {
  if (!compositeIDMap) {
    compositeIDMap = new WeakMap();
  }
  if (compositeIDMap.has(inst)) {
    return compositeIDMap.get(inst);
  } else {
    var id = compositeIDCounter++;
    compositeIDMap.set(inst, id);
    return id;
  }
}