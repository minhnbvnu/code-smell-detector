function socat(port) {
    return "socat TCP4-LISTEN:" + port + ",fork EXEC:`pwd`/src/bashttpd";
  }