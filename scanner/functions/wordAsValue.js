function wordAsValue(word) {
      var wordLC = word.toLowerCase();
      var override = "variable-2";
      if (wordIsTag(word)) { override = "tag"; }
      else if (wordIsBlock(word)) { override = "block-keyword"; }
      else if (wordIsProperty(word)) { override = "property"; }
      else if (wordLC in valueKeywords || wordLC in commonAtoms) { override = "atom"; }
      else if (wordLC == "return" || wordLC in colorKeywords) { override = "keyword"; }

      // Font family
      else if (word.match(/^[A-Z]/)) { override = "string"; }
      return override;
    }