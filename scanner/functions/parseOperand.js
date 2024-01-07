function parseOperand() {
        let value = dict[pos++];

        if (value === 30) {
          return parseFloatOperand();
        } else if (value === 28) {
          value = dict[pos++];
          value = (value << 24 | dict[pos++] << 16) >> 16;
          return value;
        } else if (value === 29) {
          value = dict[pos++];
          value = value << 8 | dict[pos++];
          value = value << 8 | dict[pos++];
          value = value << 8 | dict[pos++];
          return value;
        } else if (value >= 32 && value <= 246) {
          return value - 139;
        } else if (value >= 247 && value <= 250) {
          return (value - 247) * 256 + dict[pos++] + 108;
        } else if (value >= 251 && value <= 254) {
          return -((value - 251) * 256) - dict[pos++] - 108;
        }

        (0, _util.warn)('CFFParser_parseDict: "' + value + '" is a reserved command.');
        return NaN;
      }