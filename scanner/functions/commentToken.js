function commentToken(label, body, opt) {
      var special = ["jshint", "jslint", "members", "member", "globals", "global", "exported"];
      var isSpecial = false;
      var value = label + body;
      var commentType = "plain";
      opt = opt || {};

      if (opt.isMultiline) {
        value += "*/";
      }

      body = body.replace(/\n/g, " ");

      if (label === "/*" && reg.fallsThrough.test(body)) {
        isSpecial = true;
        commentType = "falls through";
      }

      special.forEach(function(str) {
        if (isSpecial) {
          return;
        }
        if (label === "//" && str !== "jshint") {
          return;
        }

        if (body.charAt(str.length) === " " && body.substr(0, str.length) === str) {
          isSpecial = true;
          label = label + str;
          body = body.substr(str.length);
        }

        if (!isSpecial && body.charAt(0) === " " && body.charAt(str.length + 1) === " " &&
          body.substr(1, str.length) === str) {
          isSpecial = true;
          label = label + " " + str;
          body = body.substr(str.length + 1);
        }

        if (!isSpecial) {
          return;
        }

        switch (str) {
        case "member":
          commentType = "members";
          break;
        case "global":
          commentType = "globals";
          break;
        default:
          var options = body.split(":").map(function(v) {
            return v.replace(/^\s+/, "").replace(/\s+$/, "");
          });

          if (options.length === 2) {
            switch (options[0]) {
            case "ignore":
              switch (options[1]) {
              case "start":
                self.ignoringLinterErrors = true;
                isSpecial = false;
                break;
              case "end":
                self.ignoringLinterErrors = false;
                isSpecial = false;
                break;
              }
            }
          }

          commentType = str;
        }
      });

      return {
        type: Token.Comment,
        commentType: commentType,
        value: value,
        body: body,
        isSpecial: isSpecial,
        isMultiline: opt.isMultiline || false,
        isMalformed: opt.isMalformed || false
      };
    }