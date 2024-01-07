function shareCommentsWithSiblings() {
	  if (typeof this.key === "string") return;

	  var node = this.node;
	  if (!node) return;

	  var trailing = node.trailingComments;
	  var leading = node.leadingComments;
	  if (!trailing && !leading) return;

	  var prev = this.getSibling(this.key - 1);
	  var next = this.getSibling(this.key + 1);

	  if (!prev.node) prev = next;
	  if (!next.node) next = prev;

	  prev.addComments("trailing", leading);
	  next.addComments("leading", trailing);
	}