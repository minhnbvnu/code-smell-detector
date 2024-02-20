function* updateTagsUsage(prev, next) {
  const prevTags = new Set((prev && prev.tags) || []);
  const nextTags = new Set((next && next.tags) || []);

  for (const newTag of difference(nextTags, prevTags)) {
    yield call(TagsStorage.updateUsage, next.kind, newTag, 1);
  }
  for (const oldTag of difference(prevTags, nextTags)) {
    yield call(TagsStorage.updateUsage, prev.kind, oldTag, -1);
  }
}