function addAtom(text, type) {
      var lastIndex = atoms.length;
      atoms.push(text);
      return '"' + type + lastIndex + '"'
    }