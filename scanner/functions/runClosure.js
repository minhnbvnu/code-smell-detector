function runClosure() {
  (function() {
    var src = "var googsalt=" + salt + ";" + BASE_JS +
              "(function(){return goog.cloneObject(googsalt);})();";
    src = cacheBust(src, "goog");
    var result = indirectEval(src);
    if (result != salt) throw(new Error("Incorrect result: " + result));
  })();
}