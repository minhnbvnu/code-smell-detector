function printDebugCurl(method, url, data, contentType){
          if (typeof data == 'object') {
            data = angular.toJson(data)
          }
          var curlCreateConsumer = 'curl -X '+ method +' -H "Content-Type: ' + contentType + ' ' + '--data ' + data + ' ' + url;
          $log.debug("HttpFactory:  " + curlCreateConsumer);
      }