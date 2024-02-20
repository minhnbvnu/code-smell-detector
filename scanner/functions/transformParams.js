function transformParams(params) {
      var paramsWoPars = trim(params.substring(1, params.length - 1));
      var result = [];
      if (paramsWoPars !== "") {
        var paramList = paramsWoPars.split(",");
        for (var i = 0; i < paramList.length; ++i) {
          var param = /\b([A-Za-z_$][\w$]*\b)(\s*"[ABC][\d]*")*\s*$/.exec(paramList[i]);
          result.push(new AstParam(param[1]))
        }
      }
      return new AstParams(result)
    }