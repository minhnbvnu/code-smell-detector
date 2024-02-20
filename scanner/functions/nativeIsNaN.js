function nativeIsNaN(num) {
        var native = Number.isNaN || window.isNaN;
        return native(num);
      }