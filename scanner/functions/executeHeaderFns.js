function executeHeaderFns(headers, config) {
        var headerContent, processedHeaders = {};

        forEach(headers, function(headerFn, header) {
          if (isFunction(headerFn)) {
            headerContent = headerFn(config);
            if (headerContent != null) {
              processedHeaders[header] = headerContent;
            }
          } else {
            processedHeaders[header] = headerFn;
          }
        });

        return processedHeaders;
      }