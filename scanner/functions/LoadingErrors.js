constructor(errors1) {
    var error;
    super();
    this.errors = errors1;
    this.message = "Some errors were encountered when loading:" + (function() {
      var k, len, ref, results;
      ref = this.errors;
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        error = ref[k];
        results.push("\n\t" + error.message);
      }
      return results;
    }).call(this);
  }