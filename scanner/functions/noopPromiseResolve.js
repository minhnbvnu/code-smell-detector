function noopPromiseResolve() {
        var responseBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "{}";
        var responseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        var responseType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "default";
        if (typeof Response === "undefined") {
          return;
        }
        var response = new Response(responseBody, {
          status: 200,
          statusText: "OK"
        });
        Object.defineProperties(response, {
          url: {
            value: responseUrl
          },
          type: {
            value: responseType
          }
        });
        if (responseType === "opaque") {
          Object.defineProperties(response, {
            body: {
              value: null
            },
            status: {
              value: 0
            },
            statusText: {
              value: ""
            }
          });
        }
        return Promise.resolve(response);
      }