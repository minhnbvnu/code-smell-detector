function attemptToMergeAGroup(groups) {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    for (const item of group) {
      const toCommands = [...(item.before || []), ...(item.after || [])];
      for (const command of toCommands) {
        const index = indexOfGroupContainingCommand(groups, command, group);
        if (index === -1) {
          // No valid edge for this command
          continue;
        }
        const mergeTarget = groups[index];
        // Merge with group containing `command`
        mergeTarget.push(...group);
        groups.splice(i, 1);
        return true;
      }
    }
  }
  return false;
}