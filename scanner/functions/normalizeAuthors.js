function normalizeAuthors(authors) {
  const parts = authors ? authors.split(/\sand\s/) : [];

  return parts
    .filter(fullname => '' !== fullname)
    .map((fullname) => {
      let lastname;
      let otherNames;
      if (/,/.test(fullname)) {
        const subparts = fullname.split(/,/);
        lastname = subparts[0].trim();
        otherNames = subparts[1];
      } else {
        const subparts = fullname.split(/\s/);
        lastname = subparts[subparts.length - 1].trim();
        otherNames = subparts.slice(0, subparts.length - 1).join(' ');
      }

      otherNames = otherNames
        .trim()
        .split(/\s/)
        .filter(p => '' !== p)
        .map(p =>
          `${p.charAt(0).toUpperCase()}.`,
        )
        .join(' ');

      return {
        fullname: '' !== otherNames ? `${lastname}, ${otherNames}` : lastname,
        lastname,
      };
    });
}