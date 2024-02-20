function findImageEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey != null && _draftJs.Entity.get(entityKey).getType() === _main.ENTITY_TYPE.IMAGE;
  }, callback);
}