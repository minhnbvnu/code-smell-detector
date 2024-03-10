    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;

      var keywords = []; // used later with beginWithKeyword but filled as a side-effect of keywords compilation
      if (mode.keywords) {
        var compiled_keywords = {};

        function flatten(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
            keywords.push(pair[0]);
          });
        }

        mode.lexemsRe = langRe(mode.lexems || '\\b' + hljs.IDENT_RE + '\\b(?!\\.)', true);
        if (typeof mode.keywords == 'string') { // string
          flatten('keyword', mode.keywords);
        } else {
          for (var className in mode.keywords) {
            if (!mode.keywords.hasOwnProperty(className))
              continue;
            flatten(className, mode.keywords[className]);
          }
        }
        mode.keywords = compiled_keywords;
      }
      if (parent) {
        if (mode.beginWithKeyword) {
          mode.begin = '\\b(' + keywords.join('|') + ')\\b(?!\\.)\\s*';
        }
        mode.beginRe = langRe(mode.begin ? mode.begin : '\\B|\\b');
        if (!mode.end && !mode.endsWithParent)
          mode.end = '\\B|\\b';
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance === undefined)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      for (var i = 0; i < mode.contains.length; i++) {
        if (mode.contains[i] == 'self') {
          mode.contains[i] = mode;
        }
        compileMode(mode.contains[i], mode);
      }
      if (mode.starts) {
        compileMode(mode.starts, parent);
      }

      var terminators = [];
      for (var i = 0; i < mode.contains.length; i++) {
        terminators.push(reStr(mode.contains[i].begin));
      }
      if (mode.terminator_end) {
        terminators.push(reStr(mode.terminator_end));
      }
      if (mode.illegal) {
        terminators.push(reStr(mode.illegal));
      }
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(s) {return null;}};
    }