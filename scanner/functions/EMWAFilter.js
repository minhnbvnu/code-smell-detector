function EMWAFilter(hysteresis) {
    if (hysteresis === undefined) { hysteresis = 0.9};
    
    this._hysteresis = Math.min(1, Math.max(hysteresis, 0));
    this.reset();
}