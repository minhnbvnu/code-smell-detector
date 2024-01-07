function TryEntry(firstLoc, catchEntry, finallyEntry) {
	  Entry.call(this);

	  t.assertLiteral(firstLoc);

	  if (catchEntry) {
	    _assert2.default.ok(catchEntry instanceof CatchEntry);
	  } else {
	    catchEntry = null;
	  }

	  if (finallyEntry) {
	    _assert2.default.ok(finallyEntry instanceof FinallyEntry);
	  } else {
	    finallyEntry = null;
	  }

	  // Have to have one or the other (or both).
	  _assert2.default.ok(catchEntry || finallyEntry);

	  this.firstLoc = firstLoc;
	  this.catchEntry = catchEntry;
	  this.finallyEntry = finallyEntry;
	}