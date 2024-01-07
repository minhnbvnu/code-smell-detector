function Emitter(contextId) {
	  _assert2.default.ok(this instanceof Emitter);
	  t.assertIdentifier(contextId);

	  // Used to generate unique temporary names.
	  this.nextTempId = 0;

	  // In order to make sure the context object does not collide with
	  // anything in the local scope, we might have to rename it, so we
	  // refer to it symbolically instead of just assuming that it will be
	  // called "context".
	  this.contextId = contextId;

	  // An append-only list of Statements that grows each time this.emit is
	  // called.
	  this.listing = [];

	  // A sparse array whose keys correspond to locations in this.listing
	  // that have been marked as branch/jump targets.
	  this.marked = [true];

	  // The last location will be marked when this.getDispatchLoop is
	  // called.
	  this.finalLoc = loc();

	  // A list of all leap.TryEntry statements emitted.
	  this.tryEntries = [];

	  // Each time we evaluate the body of a loop, we tell this.leapManager
	  // to enter a nested loop context that determines the meaning of break
	  // and continue statements therein.
	  this.leapManager = new leap.LeapManager(this);
	}