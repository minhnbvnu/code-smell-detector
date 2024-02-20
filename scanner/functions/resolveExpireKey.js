function resolveExpireKey(namespace) {
  return namespace ? `${LOCAL_STORAGE.EXPIRE_KEY}/${namespace}` : LOCAL_STORAGE.EXPIRE_KEY
}