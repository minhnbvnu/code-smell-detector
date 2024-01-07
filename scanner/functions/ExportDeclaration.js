function ExportDeclaration(node) {
	  if (node.declaration) {
	    var declar = node.declaration;
	    this.print(declar, node);
	    if (!t.isStatement(declar)) this.semicolon();
	  } else {
	    if (node.exportKind === "type") {
	      this.word("type");
	      this.space();
	    }

	    var specifiers = node.specifiers.slice(0);

	    var hasSpecial = false;
	    while (true) {
	      var first = specifiers[0];
	      if (t.isExportDefaultSpecifier(first) || t.isExportNamespaceSpecifier(first)) {
	        hasSpecial = true;
	        this.print(specifiers.shift(), node);
	        if (specifiers.length) {
	          this.token(",");
	          this.space();
	        }
	      } else {
	        break;
	      }
	    }

	    if (specifiers.length || !specifiers.length && !hasSpecial) {
	      this.token("{");
	      if (specifiers.length) {
	        this.space();
	        this.printList(specifiers, node);
	        this.space();
	      }
	      this.token("}");
	    }

	    if (node.source) {
	      this.space();
	      this.word("from");
	      this.space();
	      this.print(node.source, node);
	    }

	    this.semicolon();
	  }
	}