function checkNames(fields) {
    const usedNames = {};
    for (const field of fields) {
      if (usedNames[field.name]) {
        console.warn("Schema: duplicated field name", field.name, field);
      }
      usedNames[field.name] = true;
    }
  }