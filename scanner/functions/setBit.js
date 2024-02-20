function setBit(value, position, enabled) {

      return enabled ? value | (1 << position) : value & (~(1 << position));

    }