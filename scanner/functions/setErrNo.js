function setErrNo(value) {
          HEAP32[___errno_location() >>> 2] = value;
          return value;
        }