function EnumDefaultedMember(node) {
  const {
    id
  } = node;
  this.print(id, node);
  this.token(",");
}