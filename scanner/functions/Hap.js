function Hap(whole, part, value, context = {}, stateful = false) {
    _classCallCheck(this, Hap);

    this.whole = whole;
    this.part = part;
    this.value = value;
    this.context = context;
    this.stateful = stateful;

    if (stateful) {
      console.assert(typeof this.value === "function", "Stateful values must be functions");
    }
  }