function updateQueryStringParameter(key, value, uri) {
    var escapedkey = String(key).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&"),
      re = new RegExp("([?&])" + escapedkey + "=.*?(&|$)", "i"),
      separator = uri.indexOf("?") !== -1 ? "&" : "?";

    if (uri.match(re)) {
      if (value) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
      } else {
        if (RegExp.$1 === "?" || RegExp.$1 === RegExp.$2) {
          return uri.replace(re, "$1");
        } else {
          return uri.replace(re, "");
        }
      }
    } else if (value) {
      return uri + separator + key + "=" + value;
    }
  }