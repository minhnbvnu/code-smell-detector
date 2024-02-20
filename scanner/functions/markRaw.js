function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
  }