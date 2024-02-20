function runJQuery() {
  (function() {
    var src = "var windowmock = {'document':new MockElement(),\
                                 'location':{'href':''},\
                                 'navigator':{'userAgent':''}};" +
              "var jQuerySalt=" + salt + ";" + JQUERY_JS +
              "(function(){return windowmock.jQuery.grep([jQuerySalt],\
              function(a,b){return true;})[0];})();";
    src = cacheBust(src, "jQuery");
    var result = indirectEval(src);
    if (result != salt) throw(new Error("Incorrect result: " + result));
  })();
}