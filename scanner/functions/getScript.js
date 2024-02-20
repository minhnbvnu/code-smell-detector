function getScript() {
     if (document.currentScript) return document.currentScript;
     var scripts = document.getElementsByTagName("script");
     for (var i = 0, m = scripts.length; i < m; i++) {
       var script = scripts[i];
       for (var cdn in CDN) {if (CDN.hasOwnProperty(cdn)) {
         var url = CDN[cdn].mathjax;
         if (script.src && script.src.substr(0,url.length) === url) return script;
       }}
     }
   }