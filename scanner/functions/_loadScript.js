function _loadScript(url, successHandler, failureHandler, failureDelay) {

      var scriptLoadCompleted = false;

      var scriptElement = document.createElement("script")
      scriptElement.type = "text/javascript";
      scriptElement.src = url;
    

      var successWrapperHandler = function() {
        scriptLoadCompleted = true;
        successHandler();
      }
    
      var IEWrapperHandler = function() {
        if (scriptElement.readyState == "loaded" || scriptElement.readyState == "complete") {
          scriptElement.onreadystatechange = null;
          successWrapperHandler();
        }
      }
    
      if (scriptElement.readyState)
        scriptElement.onreadystatechange = IEWrapperHandler;
      else
        scriptElement.onload = successWrapperHandler;

      var failureWrapperHandler = function() {
        if (!scriptLoadCompleted)
          failureHandler();
      }
    
      document.getElementsByTagName("head")[0].appendChild(scriptElement);

      //default to 10 seconds for failure delay
      setTimeout(failureWrapperHandler, failureDelay || 10000);
    }