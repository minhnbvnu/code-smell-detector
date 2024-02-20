function ComputeHash(args, raw) {
  let argsString = JSON.stringify(args);
  argsString = argsString.replace(/(\"ptr\"\:(-?[0-9]*?)\,)/g, '');
  argsString = argsString.replace(/(\"ptr\"\:(-?[0-9]*))/g, '');
  if (argsString.includes("ptr")) { console.error("YOU DONE MESSED UP YOUR REGEX."); }
  let hashString = args.callee.name + argsString;// + GUIState["MeshRes"];
  if (raw) { return hashString; }
  return stringToHash(hashString);
}