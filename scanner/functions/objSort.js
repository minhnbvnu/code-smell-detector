function objSort() {
    var args = arguments,
      array = args[0],
      case_sensitive, keys_length, key, desc, a, b, i;

    if (typeof arguments[arguments.length - 1] === 'boolean') {
      case_sensitive = arguments[arguments.length - 1];
      keys_length = arguments.length - 1;
    } else {
      case_sensitive = false;
      keys_length = arguments.length;
    }

    return array.sort(function (obj1, obj2) {
      for (i = 1; i < keys_length; i++) {
        key = args[i];
        if (typeof key !== 'string') {
          desc = key[1];
          key = key[0];
          // hack to extend it as I have nested fields
          a = obj1["Event"][args[i][0]];
          b = obj2["Event"][args[i][0]];
        } else {
          desc = false;
          a = obj1["Event"][args[i]];
          b = obj2["Event"][args[i]];
        }
        // console.log ("a="+a);
        //  console.log ("b="+b);

        if (case_sensitive === false && typeof a === 'string') {
          a = a.toLowerCase();
          b = b.toLowerCase();
        }

        if (!desc) {
          if (a < b) return -1;
          if (a > b) return 1;
        } else {
          if (a > b) return -1;
          if (a < b) return 1;
        }
      }
      return 0;
    });
  }