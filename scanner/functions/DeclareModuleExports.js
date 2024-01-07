function DeclareModuleExports(node) {
	  this.word("declare");
	  this.space();
	  this.word("module");
	  this.token(".");
	  this.word("exports");
	  this.print(node.typeAnnotation, node);
	}