async function trySetObj(key, obj) {
  if (!(await get(key))) {
    await setObj(key, obj);
  }
}