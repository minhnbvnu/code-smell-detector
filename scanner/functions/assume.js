function assume() {
    processenforceall();
    if (!state.option.esversion && !state.option.moz) {
      if (state.option.es3) {
        state.option.esversion = 3;
      } else if (state.option.esnext) {
        state.option.esversion = 6;
      } else {
        state.option.esversion = 5;
      }
    }

    if (state.inES5()) {
      combine(predefined, vars.ecmaIdentifiers[5]);
    }

    if (state.inES6()) {
      combine(predefined, vars.ecmaIdentifiers[6]);
    }

    if (state.option.module) {
      if (state.option.strict === true) {
        state.option.strict = "global";
      }
      if (!state.inES6()) {
        warning("W134", state.tokens.next, "module", 6);
      }
    }

    if (state.option.couch) {
      combine(predefined, vars.couch);
    }

    if (state.option.qunit) {
      combine(predefined, vars.qunit);
    }

    if (state.option.rhino) {
      combine(predefined, vars.rhino);
    }

    if (state.option.shelljs) {
      combine(predefined, vars.shelljs);
      combine(predefined, vars.node);
    }
    if (state.option.typed) {
      combine(predefined, vars.typed);
    }

    if (state.option.phantom) {
      combine(predefined, vars.phantom);
      if (state.option.strict === true) {
        state.option.strict = "global";
      }
    }

    if (state.option.prototypejs) {
      combine(predefined, vars.prototypejs);
    }

    if (state.option.node) {
      combine(predefined, vars.node);
      combine(predefined, vars.typed);
      if (state.option.strict === true) {
        state.option.strict = "global";
      }
    }

    if (state.option.devel) {
      combine(predefined, vars.devel);
    }

    if (state.option.dojo) {
      combine(predefined, vars.dojo);
    }

    if (state.option.browser) {
      combine(predefined, vars.browser);
      combine(predefined, vars.typed);
    }

    if (state.option.browserify) {
      combine(predefined, vars.browser);
      combine(predefined, vars.typed);
      combine(predefined, vars.browserify);
      if (state.option.strict === true) {
        state.option.strict = "global";
      }
    }

    if (state.option.nonstandard) {
      combine(predefined, vars.nonstandard);
    }

    if (state.option.jasmine) {
      combine(predefined, vars.jasmine);
    }

    if (state.option.jquery) {
      combine(predefined, vars.jquery);
    }

    if (state.option.mootools) {
      combine(predefined, vars.mootools);
    }

    if (state.option.worker) {
      combine(predefined, vars.worker);
    }

    if (state.option.wsh) {
      combine(predefined, vars.wsh);
    }

    if (state.option.globalstrict && state.option.strict !== false) {
      state.option.strict = "global";
    }

    if (state.option.yui) {
      combine(predefined, vars.yui);
    }

    if (state.option.mocha) {
      combine(predefined, vars.mocha);
    }
  }