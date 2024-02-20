function MockEventSourceObject() {
  this.eventListeners = {
    load: [],
    message: []
  };

  this.emitEvent = function(eventType, eventObject) {
    expect(!!this.eventListeners[eventType]).to.be(true);

    for (var a in this.eventListeners[eventType]) {
      this.eventListeners[eventType][a](eventObject);
    }
  };

  this.addEventListener = function(eventType, callback) {
    expect(!!this.eventListeners[eventType]).to.be(true);

    this.eventListeners[eventType].push(callback);
  };

  this.removeEventListener = function(eventType, callback) {
    expect(!!this.eventListeners[eventType]).to.be(true);

    var index = this.eventListeners[eventType].indexOf(callback);
    if (index > -1) {
      this.eventListeners[eventType].splice(index, 1);
    }
  };

  this.assimilate = function(object) {
    var keys = Object.keys(object);
    for (var a in keys) {
      this[keys[a]] = object[keys[a]];
    }
  };
}