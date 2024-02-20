function diffSortedLists(a, b) {
  var i_a = 0;
  var i_b = 0;

  if (!a) a = [];
  if (!b) b = [];

  var a_only = [];
  var b_only = [];

  checkSorted(a);
  checkSorted(b);

  while (i_a < a.length && i_b < b.length) {
    if (a[i_a] === b[i_b]) {
      i_a++;
      i_b++;
    } else if (a[i_a] < b[i_b]) {
      a_only.push(a[i_a++]);
    } else {
      b_only.push(b[i_b++]);
    }
  }

  if (i_a < a.length) a_only = a_only.concat(a.slice(i_a));
  if (i_b < b.length) b_only = b_only.concat(b.slice(i_b));
  return {
    removed: a_only,
    added: b_only
  };
}