function responseStatusCode(stream, state) {
    var code = stream.match(/^\d+/);
    if (!code) return failFirstLine(stream, state);

    state.cur = responseStatusText;
    var status = Number(code[0]);
    if (status >= 100 && status < 200) {
      return "positive informational";
    } else if (status >= 200 && status < 300) {
      return "positive success";
    } else if (status >= 300 && status < 400) {
      return "positive redirect";
    } else if (status >= 400 && status < 500) {
      return "negative client-error";
    } else if (status >= 500 && status < 600) {
      return "negative server-error";
    } else {
      return "error";
    }
  }