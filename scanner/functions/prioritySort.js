function prioritySort(a, b) {
  return b.priority - a.priority || b.id - a.id;
}