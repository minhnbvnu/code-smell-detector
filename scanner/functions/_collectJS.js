function _collectJS(entry, xref, list, parents) {
  if (!entry) {
    return;
  }

  let parent = null;

  if ((0, _primitives.isRef)(entry)) {
    if (parents.has(entry)) {
      return;
    }

    parent = entry;
    parents.put(parent);
    entry = xref.fetch(entry);
  }

  if (Array.isArray(entry)) {
    for (const element of entry) {
      _collectJS(element, xref, list, parents);
    }
  } else if (entry instanceof _primitives.Dict) {
    if ((0, _primitives.isName)(entry.get("S"), "JavaScript") && entry.has("JS")) {
      const js = entry.get("JS");
      let code;

      if ((0, _primitives.isStream)(js)) {
        code = (0, _util.bytesToString)(js.getBytes());
      } else {
        code = js;
      }

      code = (0, _util.stringToPDFString)(code);

      if (code) {
        list.push(code);
      }
    }

    _collectJS(entry.getRaw("Next"), xref, list, parents);
  }

  if (parent) {
    parents.remove(parent);
  }
}