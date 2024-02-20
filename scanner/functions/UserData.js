function UserData(data) {
    _classCallCheck(this, UserData);

    this.data = {};
    if (typeof data === 'object') {
      this.data = data;
      this.deserializerDataTypes();
    }
  }