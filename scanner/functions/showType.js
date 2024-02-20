function showType(ts, cm, pos, c) {
    ts.request(cm, "type", function(error, data) {
      if (error) return showError(ts, cm, error);
      if (ts.options.typeTip) {
        var tip = ts.options.typeTip(data);
      } else {
        var tip = elt("span", null, elt("strong", null, data.type || "not found"));
        if (data.doc)
          tip.appendChild(document.createTextNode(" — " + data.doc));
        if (data.url) {
          tip.appendChild(document.createTextNode(" "));
          tip.appendChild(elt("a", null, "[docs]")).href = data.url;
        }
      }
      tempTooltip(cm, tip);
      if (c) c();
    }, pos);
  }