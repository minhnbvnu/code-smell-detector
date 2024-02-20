function sortedGroupByValue(list, grouper, groupName) {
  return sortByKey(groupByValue(list, grouper, groupName), grouper)
}