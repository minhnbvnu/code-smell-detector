function TimeSpan(begin, end) {
    _classCallCheck(this, TimeSpan);

    this.begin = fraction(begin);
    this.end = fraction(end);
  }