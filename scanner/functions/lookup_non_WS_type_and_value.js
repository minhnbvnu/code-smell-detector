function lookup_non_WS_type_and_value(offset2, type, referenceStr) {
    let current_type;
    do {
      current_type = this.lookupType(offset2++);
      if (current_type !== WhiteSpace) {
        break;
      }
    } while (current_type !== 0);
    return current_type === type ? this.lookupValue(offset2 - 1, referenceStr) : false;
  }