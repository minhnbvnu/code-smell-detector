function enumBody(context, node) {
  const {
    members
  } = node;
  context.token("{");
  context.indent();
  context.newline();

  for (const member of members) {
    context.print(member, node);
    context.newline();
  }

  context.dedent();
  context.token("}");
}