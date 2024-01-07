function ClassDeclaration(node) {
	  this.printJoin(node.decorators, node);
	  this.word("class");

	  if (node.id) {
	    this.space();
	    this.print(node.id, node);
	  }

	  this.print(node.typeParameters, node);

	  if (node.superClass) {
	    this.space();
	    this.word("extends");
	    this.space();
	    this.print(node.superClass, node);
	    this.print(node.superTypeParameters, node);
	  }

	  if (node.implements) {
	    this.space();
	    this.word("implements");
	    this.space();
	    this.printList(node.implements, node);
	  }

	  this.space();
	  this.print(node.body, node);
	}