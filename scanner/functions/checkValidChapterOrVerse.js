function checkValidChapterOrVerse(nextState, replaceState) {
  const chapterId = parseInt(nextState.params.chapterId, 10);
  filterValidChapter(replaceState, chapterId);

  if (nextState.params.range) {
    if (nextState.params.range.includes('-')) {
      const [_from, _to] = nextState.params.range.split('-').map(num => num);
      const [from, to] = nextState.params.range
        .split('-')
        .map(num => parseInt(num, 10));

      if (from > to) {
        replaceState(`/${chapterId}/${to}-${from}${nextState.location.search}`);
      } else if (from === to) {
        replaceState(`/${chapterId}/${from}`);
      } else if (
        _from.length !== from.toString().length ||
        _to.length !== to.toString().length
      ) {
        replaceState(`/${chapterId}/${from}-${to}${nextState.location.search}`);
      }
      // TODO: Add check to make sure the range is within the ayah limit
    } else {
      const verseId = parseInt(nextState.params.range, 10);

      if (replaceChapterOrRange(nextState.params)) {
        let location = `${nextState.location.pathname}${nextState.location.search}`;
        location = location.replace(
          /\/([0-9]+)\/([0-9]+)/,
          `/${chapterId}/${verseId}`
        );
        replaceState(location);
      }
    }
  } else if (replaceChapterOrRange(nextState.params)) {
    let location = `${nextState.location.pathname}${nextState.location.search}`;
    location = location.replace(/\/([0-9]+)/, `/${chapterId}`);
    replaceState(location);
  }

  filterValidVerse(replaceState, chapterId, nextState.params.range);
}