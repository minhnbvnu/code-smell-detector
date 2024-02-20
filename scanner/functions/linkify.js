function linkify(string, title) {
  const str = title || string;
  if (isValidUrl(string)) {
    return `<a href="${string}" rel="noreferrer noopener">${str}</a>`;
  }

  return string;
}