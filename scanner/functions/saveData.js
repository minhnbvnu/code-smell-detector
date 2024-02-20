function saveData(maxAge, expireKey, indexKey) {
  localStorage.setItem(expireKey, Date.now() + maxAge)
  localStorage.setItem(indexKey, JSON.stringify(INDEXS))
}