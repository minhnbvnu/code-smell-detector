function installLibrary(client) {
  return findLibSuggester(client).then(el =>
    el.doubleClick('.Suggester-item--library')
  );
}