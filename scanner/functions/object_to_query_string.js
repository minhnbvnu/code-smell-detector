function object_to_query_string(obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + "=" +
            encodeURIComponent(obj[p]));
        var params = str.join("&");
        return params;
      }