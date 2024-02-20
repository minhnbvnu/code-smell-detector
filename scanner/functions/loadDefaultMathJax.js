function loadDefaultMathJax() {
     var script = getScript();
     if (script) {
       loadMathJax(script.src.replace(/\/latest\.js/, "/MathJax.js"));
     } else {
       Error("Can't determine the URL for loading MathJax");
     }
   }