function ObjectTypeAnnotation(node) {
  if (node.exact) {
    this.token("{|");
  } else {
    this.token("{");
  }

  const props = node.properties.concat(node.callProperties || [], node.indexers || [], node.internalSlots || []);

  if (props.length) {
    this.space();
    this.printJoin(props, node, {
      addNewlines(leading) {
        if (leading && !props[0]) return 1;
      },

      indent: true,
      statement: true,
      iterator: () => {
        if (props.length !== 1 || node.inexact) {
          this.token(",");
          this.space();
        }
      }
    });
    this.space();
  }

  if (node.inexact) {
    this.indent();
    this.token("...");

    if (props.length) {
      this.newline();
    }

    this.dedent();
  }

  if (node.exact) {
    this.token("|}");
  } else {
    this.token("}");
  }
}