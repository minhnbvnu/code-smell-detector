function LoopEntry(breakLoc, continueLoc, label) {
	  Entry.call(this);

	  t.assertLiteral(breakLoc);
	  t.assertLiteral(continueLoc);

	  if (label) {
	    t.assertIdentifier(label);
	  } else {
	    label = null;
	  }

	  this.breakLoc = breakLoc;
	  this.continueLoc = continueLoc;
	  this.label = label;
	}