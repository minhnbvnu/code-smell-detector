function replaceChapterOrRange(params) {
  const chapterId = params.chapterId;
  const verseId = params.range;

  return (
    chapterId.length !== parseInt(chapterId, 10).toString().length ||
    (verseId && verseId.length !== parseInt(verseId, 10).toString().length)
  );
}