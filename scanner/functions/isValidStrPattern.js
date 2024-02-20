function isValidStrPattern(input) {
        var FORWARD_SLASH = "/";
        var str = escapeRegExp(input);
        if (input[0] === FORWARD_SLASH && input[input.length - 1] === FORWARD_SLASH) {
          str = input.slice(1, -1);
        }
        var isValid;
        try {
          isValid = new RegExp(str);
          isValid = true;
        } catch (e) {
          isValid = false;
        }
        return isValid;
      }