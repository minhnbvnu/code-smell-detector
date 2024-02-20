function entityRenderer ($$, entityId, entityDb, options = {}) {
  let entity = entityDb.get(entityId)
  return entity.render(options)
}