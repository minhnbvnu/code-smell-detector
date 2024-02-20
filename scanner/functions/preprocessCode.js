function preprocessCode(aCode, sketch) {
    var dm = (new RegExp(/\/\*\s*@pjs\s+((?:[^\*]|\*+[^\*\/])*)\*\//g)).exec(aCode);
    if (dm && dm.length === 2) {
      var jsonItems = [],
        directives = dm.splice(1, 2)[0].replace(/\{([\s\S]*?)\}/g, function() {
        return function(all, item) {
          jsonItems.push(item);
          return "{" + (jsonItems.length - 1) + "}"
        }
      }()).replace("\n", "").replace("\r", "").split(";");
      var clean = function(s) {
        return s.replace(/^\s*["']?/, "").replace(/["']?\s*$/, "")
      };
      for (var i = 0, dl = directives.length; i < dl; i++) {
        var pair = directives[i].split("=");
        if (pair && pair.length === 2) {
          var key = clean(pair[0]),
            value = clean(pair[1]),
            list = [];
          if (key === "preload") {
            list = value.split(",");
            for (var j = 0, jl = list.length; j < jl; j++) {
              var imageName = clean(list[j]);
              sketch.imageCache.add(imageName)
            }
          } else if (key === "font") {
            list = value.split(",");
            for (var x = 0, xl = list.length; x < xl; x++) {
              var fontName = clean(list[x]),
                index = /^\{(\d*?)\}$/.exec(fontName);
              PFont.preloading.add(index ? JSON.parse("{" + jsonItems[index[1]] + "}") : fontName)
            }
          } else if (key === "pauseOnBlur") sketch.options.pauseOnBlur = value === "true";
          else if (key === "globalKeyEvents") sketch.options.globalKeyEvents = value === "true";
          else if (key.substring(0, 6) === "param-") sketch.params[key.substring(6)] = value;
          else sketch.options[key] = value
        }
      }
    }
    return aCode
  }