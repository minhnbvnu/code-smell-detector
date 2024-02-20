function ternError(msg) {
    var err = new Error(msg);
    err.name = "TernError";
    return err;
  }