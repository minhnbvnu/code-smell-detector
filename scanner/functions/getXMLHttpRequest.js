function getXMLHttpRequest() {
     if (window.XMLHttpRequest) return new XMLHttpRequest();
     if (window.ActiveXObject) {
       try {return new ActiveXObject("Msxml2.XMLHTTP")} catch (err) {}
       try {return new ActiveXObject("Microsoft.XMLHTTP")} catch (err) {}
     }
   }