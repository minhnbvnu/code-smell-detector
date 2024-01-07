function prependToMemberExpression(member, prepend) {
	  member.object = t.memberExpression(prepend, member.object);
	  return member;
	}