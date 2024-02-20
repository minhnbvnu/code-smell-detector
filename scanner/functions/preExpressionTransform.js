function preExpressionTransform(expr) {
      var s = expr;
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"C\d+")+\s*("A\d+")/g, function(all, type, init) {
        return init
      });
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"B\d+")\s*("A\d+")/g, function(all, type, init) {
        return addAtom(all, "F")
      });
      s = s.replace(functionsRegex, function(all) {
        return addAtom(all, "H")
      });
      s = s.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*("C\d+"(?:\s*"C\d+")*)/g, function(all, type, index) {
        var args = index.replace(/"C(\d+)"/g, function(all, j) {
          return atoms[j]
        }).replace(/\[\s*\]/g, "[null]").replace(/\s*\]\s*\[\s*/g, ", ");
        var arrayInitializer = "{" + args.substring(1, args.length - 1) + "}";
        var createArrayArgs = "('" + type + "', " + addAtom(arrayInitializer, "A") + ")";
        return "$p.createJavaArray" + addAtom(createArrayArgs, "B")
      });
      s = s.replace(/(\.\s*length)\s*"B\d+"/g, "$1");
      s = s.replace(/#([0-9A-Fa-f]{6})\b/g, function(all, digits) {
        return "0xFF" + digits
      });
      s = s.replace(/"B(\d+)"(\s*(?:[\w$']|"B))/g, function(all, index, next) {
        var atom = atoms[index];
        if (!/^\(\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\s*(?:"C\d+"\s*)*\)$/.test(atom)) return all;
        if (/^\(\s*int\s*\)$/.test(atom)) return "(int)" + next;
        var indexParts = atom.split(/"C(\d+)"/g);
        if (indexParts.length > 1) if (!/^\[\s*\]$/.test(atoms[indexParts[1]])) return all;
        return "" + next
      });
      s = s.replace(/\(int\)([^,\]\)\}\?\:\*\+\-\/\^\|\%\&\~<\>\=]+)/g, function(all, arg) {
        var trimmed = trimSpaces(arg);
        return trimmed.untrim("__int_cast(" + trimmed.middle + ")")
      });
      s = s.replace(/\bsuper(\s*"B\d+")/g, "$$superCstr$1").replace(/\bsuper(\s*\.)/g, "$$super$1");
      s = s.replace(/\b0+((\d*)(?:\.[\d*])?(?:[eE][\-\+]?\d+)?[fF]?)\b/, function(all, numberWo0, intPart) {
        if (numberWo0 === intPart) return all;
        return intPart === "" ? "0" + numberWo0 : numberWo0
      });
      s = s.replace(/\b(\.?\d+\.?)[fF]\b/g, "$1");
      s = s.replace(/([^\s])%([^=\s])/g, "$1 % $2");
      s = s.replace(/\b(frameRate|keyPressed|mousePressed)\b(?!\s*"B)/g, "__$1");
      s = s.replace(/\b(boolean|byte|char|float|int)\s*"B/g, function(all, name) {
        return "parse" + name.substring(0, 1).toUpperCase() + name.substring(1) + '"B'
      });
      s = s.replace(/\bpixels\b\s*(("C(\d+)")|\.length)?(\s*=(?!=)([^,\]\)\}]+))?/g, function(all, indexOrLength, index, atomIndex, equalsPart, rightSide) {
        if (index) {
          var atom = atoms[atomIndex];
          if (equalsPart) return "pixels.setPixel" + addAtom("(" + atom.substring(1, atom.length - 1) + "," + rightSide + ")", "B");
          return "pixels.getPixel" + addAtom("(" + atom.substring(1, atom.length - 1) + ")", "B")
        }
        if (indexOrLength) return "pixels.getLength" + addAtom("()", "B");
        if (equalsPart) return "pixels.set" + addAtom("(" + rightSide + ")", "B");
        return "pixels.toArray" + addAtom("()", "B")
      });
      var repeatJavaReplacement;

      function replacePrototypeMethods(all, subject, method, atomIndex) {
        var atom = atoms[atomIndex];
        repeatJavaReplacement = true;
        var trimmed = trimSpaces(atom.substring(1, atom.length - 1));
        return "__" + method + (trimmed.middle === "" ? addAtom("(" + subject.replace(/\.\s*$/, "") + ")", "B") : addAtom("(" + subject.replace(/\.\s*$/, "") + "," + trimmed.middle + ")", "B"))
      }
      do {
        repeatJavaReplacement = false;
        s = s.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*\.\s*(?:[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*\.\s*)*)(replace|replaceAll|replaceFirst|contains|equals|equalsIgnoreCase|hashCode|toCharArray|printStackTrace|split|startsWith|endsWith|codePointAt)\s*"B(\d+)"/g, replacePrototypeMethods)
      } while (repeatJavaReplacement);

      function replaceInstanceof(all, subject, type) {
        repeatJavaReplacement = true;
        return "__instanceof" + addAtom("(" + subject + ", " + type + ")", "B")
      }
      do {
        repeatJavaReplacement = false;
        s = s.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*(?:\.\s*[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*)*)instanceof\s+([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)/g, replaceInstanceof)
      } while (repeatJavaReplacement);
      s = s.replace(/\bthis(\s*"B\d+")/g, "$$constr$1");
      return s
    }