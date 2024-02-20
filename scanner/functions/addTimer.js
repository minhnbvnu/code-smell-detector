function addTimer(args, recurring) {
    if (args.length === 0) {
      throw new Error("Function requires at least 1 parameter");
    }

    var toId = id++;
    var delay = args[1] || 0;

    if (!this.timeouts) {
      this.timeouts = {};
    }

    this.timeouts[toId] = {
      id: toId,
      func: args[0],
      callAt: this.now + delay,
      invokeArgs: Array.prototype.slice.call(args, 2)
    };

    if (recurring === true) {
      this.timeouts[toId].interval = delay;
    }

    return toId;
  }