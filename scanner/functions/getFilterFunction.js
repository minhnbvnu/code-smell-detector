async function getFilterFunction(config) {
  const funcName = await config.get("activeMessageFunc")
  const funcSrc = (await config.get("savedMessageFunc"))[funcName] || "return data"
  if (!(funcSrc in func_cache)) {
    func_cache[funcSrc] = new Function("data", "origin", "destination", funcSrc)
  }
  return func_cache[funcSrc]
}