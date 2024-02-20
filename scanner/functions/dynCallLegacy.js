function dynCallLegacy(sig, ptr, args) {
          var f = Module["dynCall_" + sig];
          return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
        }