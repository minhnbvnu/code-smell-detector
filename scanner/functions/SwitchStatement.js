function SwitchStatement(node) {
	  this.word("switch");
	  this.space();
	  this.token("(");
	  this.print(node.discriminant, node);
	  this.token(")");
	  this.space();
	  this.token("{");

	  this.printSequence(node.cases, node, {
	    indent: true,
	    addNewlines: function addNewlines(leading, cas) {
	      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
	    }
	  });

	  this.token("}");
	}