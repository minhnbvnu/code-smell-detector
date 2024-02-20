function priorityThenAlphaSort(a, b) {
  if (priorities[a] || priorities[b]) {
    return (priorities[a] || 100) > (priorities[b] || 100) ? 1 : -1;
  } else {
    return (0, (_misc || _load_misc()).sortAlpha)(a, b);
  }
}