function FakeDate() {
      switch(arguments.length) {
        case 0:
          return new GlobalDate(currentTime);
        case 1:
          return new GlobalDate(arguments[0]);
        case 2:
          return new GlobalDate(arguments[0], arguments[1]);
        case 3:
          return new GlobalDate(arguments[0], arguments[1], arguments[2]);
        case 4:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3]);
        case 5:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4]);
        case 6:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4], arguments[5]);
        default:
          return new GlobalDate(arguments[0], arguments[1], arguments[2], arguments[3],
                                arguments[4], arguments[5], arguments[6]);
      }
    }