function isLoaded(globalState, chapterId, paging) {
  if (paging.offset) {
    return (
      globalState.verses.entities[chapterId] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${paging.offset ? paging.offset + 1 : 1}`
      ] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${paging.offset && paging.limit ? paging.offset + paging.limit : perPage}`
      ]
    );
  }

  return (
    globalState.verses.entities[chapterId] &&
    globalState.verses.entities[chapterId][`${chapterId}:1`]
  );
}