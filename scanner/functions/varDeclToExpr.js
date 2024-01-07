function varDeclToExpr(vdec, includeIdentifiers) {
	    t.assertVariableDeclaration(vdec);
	    // TODO assert.equal(vdec.kind, "var");
	    var exprs = [];

	    vdec.declarations.forEach(function (dec) {
	      // Note: We duplicate 'dec.id' here to ensure that the variable declaration IDs don't
	      // have the same 'loc' value, since that can make sourcemaps and retainLines behave poorly.
	      vars[dec.id.name] = t.identifier(dec.id.name);

	      if (dec.init) {
	        exprs.push(t.assignmentExpression("=", dec.id, dec.init));
	      } else if (includeIdentifiers) {
	        exprs.push(dec.id);
	      }
	    });

	    if (exprs.length === 0) return null;

	    if (exprs.length === 1) return exprs[0];

	    return t.sequenceExpression(exprs);
	  }