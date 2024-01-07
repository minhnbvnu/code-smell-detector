function ImportDeclaration(node) {
	  this.word("import");
	  this.space();

	  if (node.importKind === "type" || node.importKind === "typeof") {
	    this.word(node.importKind);
	    this.space();
	  }

	  var specifiers = node.specifiers.slice(0);
	  if (specifiers && specifiers.length) {
	    while (true) {
	      var first = specifiers[0];
	      if (t.isImportDefaultSpecifier(first) || t.isImportNamespaceSpecifier(first)) {
	        this.print(specifiers.shift(), node);
	        if (specifiers.length) {
	          this.token(",");
	          this.space();
	        }
	      } else {
	        break;
	      }
	    }

	    if (specifiers.length) {
	      this.token("{");
	      this.space();
	      this.printList(specifiers, node);
	      this.space();
	      this.token("}");
	    }

	    this.space();
	    this.word("from");
	    this.space();
	  }

	  this.print(node.source, node);
	  this.semicolon();
	}