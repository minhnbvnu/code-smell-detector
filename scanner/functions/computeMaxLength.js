function computeMaxLength() {
      var maxLineLength = 0; 
      maxLine = ""; maxLineChanged = true;
      doc.iter(0, doc.size, function(line) {
        var l = line.text;
        if (!line.hidden && l.length > maxLineLength) {
          maxLineLength = l.length; maxLine = l;
        }
      });
      updateMaxLine = false;
    }