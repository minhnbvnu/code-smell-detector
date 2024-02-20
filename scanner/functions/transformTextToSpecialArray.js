function transformTextToSpecialArray(text) {
      //we don't want to destroy original text array, so cloning it
      var sa = text.concat();
      var da = [];
      var len = sa.length;
      var curDa;
      //we do array.join('text that must not be PDFescaped")
      //thus, pdfEscape each component separately
      while (len--) {
        curDa = sa.shift();
        if (typeof curDa === "string") {
          da.push(curDa);
        } else {
          if (
            Array.isArray(text) &&
            (curDa.length === 1 ||
              (curDa[1] === undefined && curDa[2] === undefined))
          ) {
            da.push(curDa[0]);
          } else {
            da.push([curDa[0], curDa[1], curDa[2]]);
          }
        }
      }
      return da;
    }