function aliasId(primitive) {
  if (primitive && primitive.base && primitive.base.object_id) {
    primitive.id = primitive.base.object_id;
  }
}