function getFetchData(args, nativeRequestClone) {
        var fetchPropsObj = {};
        var resource = args[0];
        var fetchUrl;
        var fetchInit;
        if (resource instanceof Request) {
          var realData = nativeRequestClone.call(resource);
          var requestData = getRequestData(realData);
          fetchUrl = requestData.url;
          fetchInit = requestData;
        } else {
          fetchUrl = resource;
          fetchInit = args[1];
        }
        fetchPropsObj.url = fetchUrl;
        if (fetchInit instanceof Object) {
          var props = Object.keys(fetchInit);
          props.forEach(function (prop) {
            fetchPropsObj[prop] = fetchInit[prop];
          });
        }
        return fetchPropsObj;
      }