async function getObj(key) {
  const val = await get(key);
  return val && JSON.parse(val);
}