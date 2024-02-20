function toISO6391(language) {
  if (!language) return null;
  language = language.toLowerCase();

  return searchForISO6391(language, ['ISO 639-1']) ||
    searchForISO6391(language, ['ISO 639-2/B']) ||
    searchForISO6391(language, ['ISO 639-2/T', 'Endonym', 'Name']);
}