function filterValidChapter(replaceState, chapterId) {
  if (isNaN(chapterId) || chapterId > 114 || chapterId < 1) {
    replaceState('/error/invalid-surah');
  }
}