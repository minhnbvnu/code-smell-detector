function LeapManager(emitter) {
	  _assert2.default.ok(this instanceof LeapManager);

	  var Emitter = __webpack_require__(283).Emitter;
	  _assert2.default.ok(emitter instanceof Emitter);

	  this.emitter = emitter;
	  this.entryStack = [new FunctionEntry(emitter.finalLoc)];
	}