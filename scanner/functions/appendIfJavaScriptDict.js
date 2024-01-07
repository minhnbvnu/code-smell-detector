function appendIfJavaScriptDict(name, jsDict) {
      const type = jsDict.get("S");

      if (!(0, _primitives.isName)(type, "JavaScript")) {
        return;
      }

      let js = jsDict.get("JS");

      if ((0, _primitives.isStream)(js)) {
        js = (0, _util.bytesToString)(js.getBytes());
      } else if (!(0, _util.isString)(js)) {
        return;
      }

      if (javaScript === null) {
        javaScript = Object.create(null);
      }

      javaScript[name] = (0, _util.stringToPDFString)(js);
    }