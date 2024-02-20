function getHookNameIndexFromEntry(entry) {
  const hookNameIndex = entry[2];

  if (hookNameIndex == null) {
    throw new Error('Unexpected hook name index missing in entry in HookMap');
  }

  return hookNameIndex;
}