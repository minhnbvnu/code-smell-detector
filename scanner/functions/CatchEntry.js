function CatchEntry(firstLoc, paramId) {
	  Entry.call(this);

	  t.assertLiteral(firstLoc);
	  t.assertIdentifier(paramId);

	  this.firstLoc = firstLoc;
	  this.paramId = paramId;
	}