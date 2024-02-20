function create_worker() {
    class FakeProcess extends lazy.EventEmitter {
      send(...args) {
        return this.emit('sending', ...args);
      }
    }
    let bus = new FakeProcess();
    let worker = new lazy.Worker(bus);
    workers.push(worker);
    return [bus, worker];
  }