function getStringID(string) {
    if (string === null) {
      return 0;
    }

    const existingEntry = pendingStringTable.get(string);

    if (existingEntry !== undefined) {
      return existingEntry.id;
    }

    const id = pendingStringTable.size + 1;
    const encodedString = Object(utils["z" /* utfEncodeString */])(string);
    pendingStringTable.set(string, {
      encodedString,
      id
    }); // The string table total length needs to account both for the string length,
    // and for the array item that contains the length itself.
    //
    // Don't use string length for this table.
    // It won't work for multibyte characters (like emoji).

    pendingStringTableLength += encodedString.length + 1;
    return id;
  }