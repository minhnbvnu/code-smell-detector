function isArrayIndex(value) {
  switch (typeof value) {
    case "number":
      return value >= 0 && (value | 0) === value;

    case "string":
      {
        const result = isNumericLookup[value];

        if (result !== void 0) {
          return result;
        }

        const length = value.length;

        if (length === 0) {
          return isNumericLookup[value] = false;
        }

        let ch = 0;

        for (let i = 0; i < length; ++i) {
          ch = value.charCodeAt(i);

          if (i === 0 && ch === 0x30 && length > 1
          /* must not start with 0 */
          || ch < 0x30
          /* 0 */
          || ch > 0x39
          /* 9 */
          ) {
            return isNumericLookup[value] = false;
          }
        }

        return isNumericLookup[value] = true;
      }

    default:
      return false;
  }
}