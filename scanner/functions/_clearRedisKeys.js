async function _clearRedisKeys(redis, pattern) {
  if (!redis) return;
  const keyPrefix = redis.options.keyPrefix;
  const keys = await redis.keys(pattern);
  const keysDel = [];
  for (const fullKey of keys) {
    const key = keyPrefix ? fullKey.substr(keyPrefix.length) : fullKey;
    keysDel.push(key);
  }
  if (keysDel.length > 0) {
    await redis.del(keysDel);
  }
}