function sortMenuItems(menuItems) {
  // Split the items into their implicit groups based upon separators.
  const groups = splitArray(menuItems, isSeparator);
  // Merge groups that contain before/after references to eachother.
  const mergedGroups = mergeGroups(groups);
  // Sort each individual group internally.
  const mergedGroupsWithSortedItems = mergedGroups.map(sortItemsInGroup);
  // Sort the groups based upon their beforeGroupContaining/afterGroupContaining
  // references.
  const sortedGroups = sortGroups(mergedGroupsWithSortedItems);
  // Join the groups back
  return joinArrays(sortedGroups, { type: 'separator' });
}