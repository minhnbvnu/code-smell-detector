async function addFavorite ({ table, data }) {
  await db[table].put(data)
}