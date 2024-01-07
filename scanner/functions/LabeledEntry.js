function LabeledEntry(breakLoc, label) {
	  Entry.call(this);

	  t.assertLiteral(breakLoc);
	  t.assertIdentifier(label);

	  this.breakLoc = breakLoc;
	  this.label = label;
	}