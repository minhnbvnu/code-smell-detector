function _encStr(s, toUnicode) {
   var json = JSON.stringify(s);
   return toUnicode ? json : json.replace(/[\u007f-\uffff]/g,
      function(c) {
        return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
      }
   );
}