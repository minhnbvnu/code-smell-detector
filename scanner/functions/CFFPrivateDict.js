constructor(strings) {
      if (tables === null) {
        tables = CFFDict.createTables(layout);
      }

      super(tables, strings);
      this.subrsIndex = null;
    }