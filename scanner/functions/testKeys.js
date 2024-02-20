function testKeys(pk, sk) {
      if (!pk.startsWith("$electrotest_1#prop1_")) {
        throw new Error("Invalid PK");
      }
      if (!sk.startsWith("$collectiona#entityone#prop2")) {
        throw new Error("Invalid SK");
      }
    }