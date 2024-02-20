function getChangeFunc(typ, id, setter, comps, op = "") {
    return `${typ} changecomp_${id}(${typ} col, ${setter.typeString()} setter) {
  col.${comps} ${op}= setter;
  return col;
}`;
}