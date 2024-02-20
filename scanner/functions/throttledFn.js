function throttledFn() {
        var context = this;
        var args = arguments;
        cancel();
        timeout = setTimeout(function() {
          timeout = null;
          fn.apply(context, args);
        }, threshhold);
      }