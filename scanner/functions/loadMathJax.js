function loadMathJax(url) {
     var script = document.createElement('script');
     script.type = 'text/javascript';
     script.async = true;
     script.src = url;
     var head = document.head || document.getElementsByTagName('head')[0] || document.body;
     if (head) {
       head.appendChild(script);
     } else {
       Error("Can't find the document <head> element");
     }
   }