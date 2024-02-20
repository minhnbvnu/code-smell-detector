function swapdom(parent, a, b, end = null) {
  let i = 0,
    cur,
    next,
    bi,
    n = b.length,
    m = a.length;

  // skip head/tail
  while (i < n && i < m && a[i] == b[i]) i++;
  while (i < n && i < m && b[n - 1] == a[m - 1]) end = b[(--m, --n)];

  // append/prepend/trim shortcuts
  if (i == m) while (i < n) parent.insertBefore(b[i++], end);
  if (i == n) while (i < m) parent.removeChild(a[i++]);
  else {
    cur = a[i];

    while (i < n) {
      (bi = b[i++]), (next = cur ? cur.nextSibling : end);

      // skip
      if (cur == bi) cur = next;
      // swap / replace
      else if (i < n && b[i] == next)
        parent.replaceChild(bi, cur), (cur = next);
      // insert
      else parent.insertBefore(bi, cur);
    }

    // remove tail
    while (cur != end)
      (next = cur.nextSibling), parent.removeChild(cur), (cur = next);
  }

  return b;
}