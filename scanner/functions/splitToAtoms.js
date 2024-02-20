function splitToAtoms(code) {
      var atoms = [];
      var items = code.split(/([\{\[\(\)\]\}])/);
      var result = items[0];
      var stack = [];
      for (var i = 1; i < items.length; i += 2) {
        var item = items[i];
        if (item === "[" || item === "{" || item === "(") {
          stack.push(result);
          result = item
        } else if (item === "]" || item === "}" || item === ")") {
          var kind = item === "}" ? "A" : item === ")" ? "B" : "C";
          var index = atoms.length;
          atoms.push(result + item);
          result = stack.pop() + '"' + kind + (index + 1) + '"'
        }
        result += items[i + 1]
      }
      atoms.unshift(result);
      return atoms
    }