async function setObj(key, obj) {
  await set(key, JSON.stringify(obj));
}