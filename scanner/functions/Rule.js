function Rule(data, states) {
    if (data.next || data.push) { ensureState(states, data.next || data.push); }
    this.regex = toRegex(data.regex);
    this.token = asToken(data.token);
    this.data = data;
  }