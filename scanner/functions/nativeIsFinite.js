function nativeIsFinite(num) {
        var native = Number.isFinite || window.isFinite;
        return native(num);
      }