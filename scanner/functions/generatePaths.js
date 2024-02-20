function generatePaths(
  apiDoc,
  options,
  apiFunctionBody,
  requiredSecurityHandlers
) {
  var paths = apiDoc.paths;
  Object.keys(paths).forEach(function (path) {
    var methods = paths[path];
    path = path.replace(/\{([^}]+)\}/g, "' + params['$1'] + '");

    Object.keys(methods).forEach(function (method) {
      if (method === 'parameters' || method === '$ref') {
        return;
      }

      var methodDoc = methods[method];
      var security = methodDoc.security || apiDoc.security;

      addToRequiredSecurityHandlers(requiredSecurityHandlers, security);

      if (Array.isArray(methodDoc.parameters)) {
        var queryParams = methodDoc.parameters.filter(byQuery);
        var bodyParams = methodDoc.parameters.filter(byBodyParams);
        var headerParams = methodDoc.parameters.filter(byHeaders);
      }

      var body = new Program();
      var headers = new Program();
      var query = new Program();

      apiFunctionBody.push('    ' + methodDoc.operationId + '(parameters) {');
      apiFunctionBody.push(
        "      const params = typeof parameters === 'undefined' ? {} : parameters;"
      );
      apiFunctionBody.push('      let headers = {');
      apiFunctionBody.push(headers);
      apiFunctionBody.push('      };');
      if (security && security.length) {
        apiFunctionBody.push('      handleSecurity(', JSON.stringify(security));
        apiFunctionBody.push(
          "          , headers, params, '",
          methodDoc.operationId,
          "');"
        );
      }
      apiFunctionBody.push(
        "      return fetch(endpoint + basePath + '" + path + "'",
        query
      );

      if (queryParams && queryParams.length) {
        query.push(" + '?' + buildQuery({");
        queryParams.forEach(function (param) {
          query.push(
            "          '",
            param.name,
            "': params['",
            param.name,
            "'],"
          );
        });
        query.push('        })');
      }
      apiFunctionBody.push('        , {');
      apiFunctionBody.push("          method: '", method.toUpperCase(), "',");
      apiFunctionBody.push('          headers,');
      apiFunctionBody.push('          mode,');

      if (bodyParams && bodyParams.length) {
        if (bodyParams[0].in === 'formData') {
          headers.push(
            "        'content-type': 'application/x-www-form-urlencoded',"
          );
          body.push('          body: buildQuery({');
          bodyParams.filter(byFormData).forEach(function (param) {
            body.push(
              "            '",
              param.name,
              "': params['",
              param.name,
              "'],"
            );
          });
          body.push('          }),');
        } else {
          headers.push("        'content-type': 'application/json',");
          body.push(
            "          body: JSON.stringify(params['" +
              bodyParams[0].name +
              "']),"
          );
        }

        apiFunctionBody.push(body);
      }

      if (
        (headerParams && headerParams.length) ||
        (bodyParams && bodyParams.length)
      ) {
        headerParams.forEach(function (param) {
          headers.push(
            "        '",
            param.name,
            "': params['",
            param.name,
            "'],"
          );
        });
      }

      apiFunctionBody.push('        });');
      apiFunctionBody.push('    },');
    });
  });
}