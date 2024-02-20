function modifyResponse(origResponse) {
        var _origResponse$headers;
        var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          body: "{}"
        };
        var headers = {};
        origResponse === null || origResponse === void 0 ? void 0 : (_origResponse$headers = origResponse.headers) === null || _origResponse$headers === void 0 ? void 0 : _origResponse$headers.forEach(function (value, key) {
          headers[key] = value;
        });
        var modifiedResponse = new Response(replacement.body, {
          status: origResponse.status,
          statusText: origResponse.statusText,
          headers: headers
        });
        Object.defineProperties(modifiedResponse, {
          url: {
            value: origResponse.url
          },
          type: {
            value: replacement.type || origResponse.type
          }
        });
        return modifiedResponse;
      }