function transformInlineObject(obj) {
      var members = obj.split(",");
      for (var i = 0; i < members.length; ++i) {
        var label = members[i].indexOf(":");
        if (label < 0) members[i] = {
          value: transformExpression(members[i])
        };
        else members[i] = {
          label: trim(members[i].substring(0, label)),
          value: transformExpression(trim(members[i].substring(label + 1)))
        }
      }
      return new AstInlineObject(members)
    }