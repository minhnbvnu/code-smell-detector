function fetchFunction(url, {body, method, mode, headers}) {
      passedUrl = url;
      passedBody = body;
      passedMethod = method;
      passedMode = mode;
      passedHeaders = headers;

      return Promise.resolve({json: () => {}}); // eslint-disable-line no-empty-function
    }