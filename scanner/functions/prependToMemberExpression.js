function prependToMemberExpression(member, prepend) {
  member.object = (0, _generated.memberExpression)(prepend, member.object);
  return member;
}