function processTextByFunction(text, processingFunction) {
      var result;
      if (typeof text === "string") {
        result = processingFunction(text)[0];
      } else if (Array.isArray(text)) {
        //we don't want to destroy original text array, so cloning it
        var sa = text.concat();
        var da = [];
        var len = sa.length;
        var curDa;
        var tmpResult;
        //we do array.join('text that must not be PDFescaped")
        //thus, pdfEscape each component separately
        while (len--) {
          curDa = sa.shift();
          if (typeof curDa === "string") {
            da.push(processingFunction(curDa)[0]);
          } else if (Array.isArray(curDa) && typeof curDa[0] === "string") {
            tmpResult = processingFunction(curDa[0], curDa[1], curDa[2]);
            da.push([tmpResult[0], tmpResult[1], tmpResult[2]]);
          }
        }
        result = da;
      }
      return result;
    }