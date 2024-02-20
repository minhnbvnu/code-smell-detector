async function deleteFavorite ({ table, id }) {
  await db[table].where(`${table}Mid`).equals(id).delete()
}