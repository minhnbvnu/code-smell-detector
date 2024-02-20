function getHookNameForLocation(location, hookMap) {
  const {
    names,
    mappings
  } = hookMap; // The HookMap mappings are grouped by lines, so first we look up
  // which line of mappings covers the target location.
  // Note that we expect to find a line since all the locations in the
  // source code are guaranteed to map to a name, including a '<no-hook>'
  // name.

  const foundLine = binSearch(location, mappings, compareLinePositions);

  if (foundLine == null) {
    throw new Error(`Expected to find a line in the HookMap that covers the target location at line: ${location.line}, column: ${location.column}`);
  }

  let foundEntry;
  const foundLineNumber = getLineNumberFromLine(foundLine); // The line found in the mappings will never be larger than the target
  // line, and vice-versa, so if the target line doesn't match the found
  // line, we immediately know that it must correspond to the last mapping
  // entry for that line.

  if (foundLineNumber !== location.line) {
    foundEntry = foundLine[foundLine.length - 1];
  } else {
    foundEntry = binSearch(location, foundLine, compareColumnPositions);
  }

  if (foundEntry == null) {
    throw new Error(`Expected to find a mapping in the HookMap that covers the target location at line: ${location.line}, column: ${location.column}`);
  }

  const foundNameIndex = getHookNameIndexFromEntry(foundEntry);

  if (foundNameIndex == null) {
    throw new Error(`Expected to find a name index in the HookMap that covers the target location at line: ${location.line}, column: ${location.column}`);
  }

  const foundName = names[foundNameIndex];

  if (foundName == null) {
    throw new Error(`Expected to find a name in the HookMap that covers the target location at line: ${location.line}, column: ${location.column}`);
  }

  if (foundName === NO_HOOK_NAME) {
    return null;
  }

  return foundName;
}