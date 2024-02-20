function onAdd() {
      var node = this, args = d3_array(arguments);
      onRemove.call(this);
      this.addEventListener(type, this[name] = wrapper, wrapper.$ = capture);
      wrapper._ = listener;
      function wrapper(e) {
        var o = d3.event;
        d3.event = e;
        args[0] = node.__data__;
        try {
          listener.apply(node, args);
        } finally {
          d3.event = o;
        }
      }
    }