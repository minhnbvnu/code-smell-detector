function appendToMemberExpression(member, append, computed = false) {
  member.object = (0, _generated.memberExpression)(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}