function FinallyEntry(firstLoc, afterLoc) {
	  Entry.call(this);
	  t.assertLiteral(firstLoc);
	  t.assertLiteral(afterLoc);
	  this.firstLoc = firstLoc;
	  this.afterLoc = afterLoc;
	}