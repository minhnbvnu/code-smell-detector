async function dropTestCollections(mongodb) {
  const collections = Object.values(COLLECTIONS)
  const { client, db } = await common.connect(mongodb)

  const dropCollectionPromises = collections.map(async (collection) => {
    try {
      await db.dropCollection(collection)
    } catch (err) {
      if (err && err.errmsg !== 'ns not found') {
        throw err
      }
    }
  })

  try {
    await Promise.all(dropCollectionPromises)
  } finally {
    await common.close(client, db)
  }
}