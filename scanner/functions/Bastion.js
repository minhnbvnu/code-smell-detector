function Bastion(dao, noConsume, cb) {
  var self = this;

  this.consumerTags = {};

  events.EventEmitter.call(this);

  if (!cb && !noConsume) {
    cb = this.consumeLoop()
  }

  this._dao = dao;

  var eventWrapper = function(readyQueue) {
    self.emit('readyQueue', readyQueue);
  };

  this._queue = new Rabbit(CFG.rabbit, noConsume ? eventWrapper : cb);

  if (noConsume) {
    app.logmessage('BASTION:NOCONSUME MODE');
  }

  return this;
}