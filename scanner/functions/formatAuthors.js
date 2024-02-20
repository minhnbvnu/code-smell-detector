function formatAuthors(authors) {
  const normalizedAuthors = normalizeAuthors(authors);

  if (0 === normalizedAuthors.length) {
    return UNKNOWN_AUTHORS;
  }

  const truncate = MAX_AUTHORS_IN_CITATIONS < normalizedAuthors.length;

  let authorsToDisplay = normalizedAuthors;
  if (truncate) {
    authorsToDisplay = normalizedAuthors.splice(0, MAX_AUTHORS_IN_CITATIONS);
  }

  // because we have to put `author, author, author & last author name`
  const lastAuthorToDisplay = authorsToDisplay.pop();

  let authorsString = lastAuthorToDisplay.fullname;

  if (0 < authorsToDisplay.length) {
    authorsString = authorsToDisplay
      .map(a => a.fullname)
      .join(', ')
      .concat(` & ${lastAuthorToDisplay.fullname}`);
  }

  if (truncate) {
    authorsString += ` ${ET_AL}`;
  }

  return replaceLaTeXChars(authorsString);
}