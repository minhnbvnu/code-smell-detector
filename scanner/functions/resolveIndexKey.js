function resolveIndexKey(namespace) {
  return namespace ? `${LOCAL_STORAGE.INDEX_KEY}/${namespace}` : LOCAL_STORAGE.INDEX_KEY
}