function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }