function promise_to_sort_leaves(leaves) {
  return Promise.resolve( leaves.sort(
    (a,b) => a.date_start > b.date_start
      ? -1 : a.date_start < b.date_start
      ? 1 : 0
  ));
}