function CacheOp(args, cacheMiss) {
  //toReturn = cacheMiss();
  currentOp = args.callee.name;
  currentLineNumber = getCallingLocation()[0];
  postMessage({ "type": "Progress", "payload": { "opNumber": opNumber++, "opType": args.callee.name } }); // Poor Man's Progress Indicator
  let toReturn = null;
  let curHash = ComputeHash(args); usedHashes[curHash] = curHash;
  let check = CheckCache(curHash);
  if (check && GUIState["Cache?"]) {
    //console.log("HIT    "+ ComputeHash(args) +  ", " +ComputeHash(args, true));
    toReturn = new oc.TopoDS_Shape(check);
    toReturn.hash = check.hash;
  } else {
    //console.log("MISSED " + ComputeHash(args) + ", " + ComputeHash(args, true));
    toReturn = cacheMiss();
    toReturn.hash = curHash;
    if (GUIState["Cache?"]) { AddToCache(curHash, toReturn); }
  }
  postMessage({ "type": "Progress", "payload": { "opNumber": opNumber, "opType": null } }); // Poor Man's Progress Indicator
  return toReturn;
}