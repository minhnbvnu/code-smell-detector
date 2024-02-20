async function putObj(key, obj) {
  const cur = (await getObj(key)) ?? {};
  await setObj(key, { ...cur, ...obj });
}