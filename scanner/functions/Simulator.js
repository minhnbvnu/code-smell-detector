function Simulator(options) {
  if (!(this instanceof Simulator)) return new Simulator(options);

  Emitter.call(this);

  options = options || {};
  this._step = this._step.bind(this);
  this._stepInterval = 1000 / 60;     // TODO: option
  this._running = false;
  this._accumulator = undefined;
  this._particles = [];
  this._bodies = [];
  this._forces = [];
  this._constraints = [];
  this._priorities = options.solve || [];
  this._iterations = 10;             // TODO: option
}