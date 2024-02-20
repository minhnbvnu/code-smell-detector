function getLatestMathJax(cdn,config,unpacked) {
     var request = getXMLHttpRequest();
     if (request) {
       request.onreadystatechange = function() {
         if (request.readyState === 4) {
           if (request.status === 200) {
             var json = JSON.parse(request.responseText);
             if (json instanceof Array) json = json[0];
             var version = json[cdn.version];
             if (version.substr(0,2) === '2.') {
               setVersion(version);
               loadMathJax(cdn.mathjax + json[cdn.version] + unpacked + '/MathJax.js' + config);
               return;
             }
           } else {
             Error("Problem acquiring MathJax version: status = " + request.status);
           }
           loadDefaultMathJax();
         }
       }
       request.open('GET', cdn.api, true); 
       request.send(null);
     } else {
       Error("Can't create XMLHttpRequest object");
       loadDefaultMathJax();
     }
   }