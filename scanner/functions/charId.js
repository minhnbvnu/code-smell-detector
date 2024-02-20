function charId(charOrId) {
  return _.has(charOrId, 'id') ? charOrId.id : charOrId
}