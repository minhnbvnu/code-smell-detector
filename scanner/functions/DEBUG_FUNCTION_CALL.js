function DEBUG_FUNCTION_CALL(hash, ctx, object, call, args) {
  let ctor = object.constructor.prototype;
  let callee = getCallee(object, call);
  let previous = this.$$frameHash;
  let value = null;
  let root = null;
  let name = null;
  let proto = null;

  // create function
  if (call !== null) {
    root = object[call];
    proto = object;
  } else {
    root = object;
    proto = null;
  };
  name = root.name;

  let node = this.nodes[hash].node;
  // external functions are traced as sloppy
  let isSloppy = this.symbols[name] === void 0;

  node.isSloppy = isSloppy;

  // API
  let before = this.createEvent(INSTR.FUNCTION_CALL);
  before.hash = hash;
  before.context = ctx;
  before.object = proto;
  before.callee = call;
  before.name = callee;
  before.call = root;
  before.arguments = args;
  before.external = isSloppy;
  before.indent = this.indent;
  before.trigger("before");
  // API END

  // FRAME
  let frame = this.pushFrame(INSTR.FUNCTION_CALL, hash);
  frame.values = [hash, ctx, before.object, before.callee, before.arguments];
  this.$$frameHash = Math.abs(hash);
  // FRAME END

  this.indent += INDENT_FACTOR; 
  // evaluate function bully protected
  try {
    value = before.call.apply(before.object, before.arguments);
  } catch (e) {
    let tryFrame = this.resolveTryFrame(this.frame, true);
    // error isn't try-catch wrapped
    if (tryFrame === null) {
      this.reset();
      throw e;
    // error is try-catch wrapped
    } else {
      let catchFrame = this.resolveCatchClauseFrame(this.frame, true);
      let finalFrame = this.resolveFinalClauseFrame(this.frame, true);
      // something failed inside the catch frame
      if (catchFrame !== null || finalFrame !== null) {
        this.reset();
        throw e;
      }
    }
  }
  this.indent -= INDENT_FACTOR;

  // API
  let after = this.createEvent(INSTR.FUNCTION_CALL_END);
  after.hash = hash;
  after.context = before.context;
  after.object = before.object;
  after.callee = before.callee;
  after.name = callee;
  after.call = root;
  after.arguments = before.arguments;
  after.return = value;
  after.external = isSloppy;
  after.indent = this.indent;
  after.trigger("after");
  // API END

  // FRAME
  this.popFrame();
  this.$$frameHash = previous;
  // FRAME END

  return after.return;
}