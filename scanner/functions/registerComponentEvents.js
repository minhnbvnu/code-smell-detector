function registerComponentEvents(vm, el) {
      var attrs = el.attributes;
      var name, value, handler;
      for (var i = 0, l = attrs.length; i < l; i++) {
        name = attrs[i].name;
        if (eventRE.test(name)) {
          name = name.replace(eventRE, '');
          // force the expression into a statement so that
          // it always dynamically resolves the method to call (#2670)
          // kinda ugly hack, but does the job.
          value = attrs[i].value;
          if (isSimplePath(value)) {
            value += '.apply(this, $arguments)';
          }
          handler = (vm._scope || vm._context).$eval(value, true);
          handler._fromParent = true;
          vm.$on(name.replace(eventRE), handler);
        }
      }
    }