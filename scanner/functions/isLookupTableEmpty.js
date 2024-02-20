function isLookupTableEmpty(table) {
      for (var i in table) if (table.hasOwnProperty(i)) return false;
      return true
    }