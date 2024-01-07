function calcEndTime(emitter) {
    const interval = (Math.max(emitter.rate, emitter.rate2) * emitter.numParticles + emitter.lifetime);
    return Date.now() + interval * 1000;
}