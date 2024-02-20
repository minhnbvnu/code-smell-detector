function evalParse( plural_forms ) {
        var pf_re = new RegExp('^(\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+)', 'm');
        if (pf_re.test(plural_forms)) {
          var pf = plural_forms;
          if (! /;\s*$/.test(pf)) pf = pf.concat(';');

          var code = 'var plural; var nplurals; '+pf+' return { "nplural" : nplurals, "plural" : (plural === true ? 1 : plural ? plural : 0) };';
          return (new Function("n", code));
        } else {
          throw new Error("Syntax error in language file. Plural-Forms header is invalid ["+plural_forms+"]");
        }
      }