function EventGenerator(emitter) {
    this.emitter = emitter;

    // Increase limit on number of listeners to allow more rules to subscribe peacefully
    // This limit may further be increased in future
    this.emitter.setMaxListeners(35);
}