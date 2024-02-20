function wrongMode(localName, mode) {
      throw Error("Unsupported '" + mode + "' for '" + localName + "'.");
    }