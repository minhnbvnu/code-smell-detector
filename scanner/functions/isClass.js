function isClass(func) {
      // IE 9-11 do not support classes and IE9 leaks with the code below.
      if (msie <= 11) {
        return false;
      }
      // Workaround for MS Edge.
      // Check https://connect.microsoft.com/IE/Feedback/Details/2211653
      return typeof func === 'function'
        && /^(?:class\s|constructor\()/.test(Function.prototype.toString.call(func));
    }