function sortCitations(e1, e2) {
  if (!e1.authors[0] || !e1.authors[0].lastname) {
    return 1;
  }

  if (!e2.authors[0] || !e2.authors[0].lastname) {
    return -1;
  }

  let r = e1.authors[0].lastname.localeCompare(e2.authors[0].lastname);

  if (0 === r) {
    if (!e1.year) {
      return 1;
    }

    if (!e2.year) {
      return -1;
    }

    r = e1.year < e2.year ? -1 : 1;
  }

  return r;
}