async function metadata () {
  const entries = await load()

  return entries.map(({ data }) => data)
}