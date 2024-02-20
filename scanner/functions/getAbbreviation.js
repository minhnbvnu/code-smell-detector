function getAbbreviation(zone, rule) {
      var res;
      var base = zone[2];
      if (base.indexOf('%s') > -1) {
        var repl;
        if (rule) {
          repl = rule[7] === '-' ? '' : rule[7];
        }
        //FIXME: Right now just falling back to Standard --
        // apparently ought to use the last valid rule,
        // although in practice that always ought to be Standard
        else {
          repl = 'S';
        }
        res = base.replace('%s', repl);
      }
      else if (base.indexOf('/') > -1) {
        //Chose one of two alternative strings.
        res = base.split("/", 2)[rule[6] ? 1 : 0];
      } else {
        res = base;
      }
      return res;
    }