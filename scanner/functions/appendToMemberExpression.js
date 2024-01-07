function appendToMemberExpression(member, append, computed) {
	  member.object = t.memberExpression(member.object, member.property, member.computed);
	  member.property = append;
	  member.computed = !!computed;
	  return member;
	}