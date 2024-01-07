function parseTerm() {
	      // Term ::
	      //      Anchor
	      //      Atom
	      //      Atom Quantifier

	      if (pos >= str.length || current('|') || current(')')) {
	        return null; /* Means: The term is empty */
	      }

	      var anchor = parseAnchor();

	      if (anchor) {
	        return anchor;
	      }

	      var atom = parseAtom();
	      if (!atom) {
	        bail('Expected atom');
	      }
	      var quantifier = parseQuantifier() || false;
	      if (quantifier) {
	        quantifier.body = flattenBody(atom);
	        // The quantifier contains the atom. Therefore, the beginning of the
	        // quantifier range is given by the beginning of the atom.
	        updateRawStart(quantifier, atom.range[0]);
	        return quantifier;
	      }
	      return atom;
	    }