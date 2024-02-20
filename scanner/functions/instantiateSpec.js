function instantiateSpec(spec, place, opts) {
    var names = {}, pos = 0, l = spec.length, editors = [];
    while (spec) {
      var m = spec.match(/^(\w+)(\*?)(?:='([^\']*)'|<(~?)(\w+)(?:\/(\d+)-(\d+))?)\s*/);
      var name = m[1], isDoc = m[2], cur;
      if (m[3]) {
        cur = isDoc ? CodeMirror.Doc(m[3]) : CodeMirror(place, clone(opts, {value: m[3]}));
      } else {
        var other = m[5];
        if (!names.hasOwnProperty(other)) {
          names[other] = editors.length;
          editors.push(CodeMirror(place, opts));
        }
        var doc = editors[names[other]].linkedDoc({
          sharedHist: !m[4],
          from: m[6] ? Number(m[6]) : null,
          to: m[7] ? Number(m[7]) : null
        });
        cur = isDoc ? doc : CodeMirror(place, clone(opts, {value: doc}));
      }
      names[name] = editors.length;
      editors.push(cur);
      spec = spec.slice(m[0].length);
    }
    return editors;
  }