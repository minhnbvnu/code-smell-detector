function buildApiService(apiDoc, options) {
  var apiFunctionDeclaration = new Program();
  var apiFunctionBody = new Program();
  var securityDefinitions = apiDoc.securityDefinitions;
  var requiredSecurityHandlers = [];
  var hasSecurity =
    apiDoc.security ||
    (function () {
      var paths = apiDoc.paths;
      var pathUris = paths ? Object.keys(paths) : [];
      for (var i = 0, ilen = pathUris.length; i < ilen; i++) {
        var pathUri = pathUris[i];
        var path = paths[pathUri];
        var operations = path ? Object.keys(path) : [];
        for (var j = 0, jlen = operations.length; j < jlen; j++) {
          var operation = path[operations[i]];
          if (operation && Array.isArray(operation.security)) {
            return true;
          }
        }
      }
      return false;
    })();
  if (apiDoc.security) {
    addToRequiredSecurityHandlers(requiredSecurityHandlers, apiDoc.security);
  }
  options = options || { preset: 'node' };

  if (options.preset === 'node') {
    apiFunctionDeclaration.push("'use strict';");
    apiFunctionDeclaration.push('module.exports = createApi;');
  } else if (options.preset === 'es6') {
    apiFunctionDeclaration.push('export default createApi;');
  } else {
    throw new Error(logPrefix + 'Unknown preset "' + options.preset + '"');
  }

  apiFunctionDeclaration.push('function createApi(options) {');
  apiFunctionDeclaration.push("  const basePath = '" + apiDoc.basePath + "';");
  apiFunctionDeclaration.push(
    "  const endpoint = options.endpoint || '" + getEndpoint(apiDoc) + "';"
  );
  apiFunctionDeclaration.push('  const cors = !!options.cors;');
  apiFunctionDeclaration.push("  const mode = cors ? 'cors' : 'basic';");
  if (hasSecurity) {
    apiFunctionDeclaration.push(
      '  const securityHandlers = options.securityHandlers || {};'
    );

    apiFunctionDeclaration.push(
      '  const handleSecurity = (security, headers, params, operationId) => {'
    );
    apiFunctionDeclaration.push(
      '    for (let i = 0, ilen = security.length; i < ilen; i++) {'
    );
    apiFunctionDeclaration.push('      let scheme = security[i];');
    apiFunctionDeclaration.push('      let schemeParts = Object.keys(scheme);');
    apiFunctionDeclaration.push(
      '      for (let j = 0, jlen = schemeParts.length; j < jlen; j++) {'
    );
    apiFunctionDeclaration.push('        let schemePart = schemeParts[j];');
    apiFunctionDeclaration.push(
      '        let fulfilsSecurityRequirements = securityHandlers[schemePart]('
    );
    apiFunctionDeclaration.push('            headers, params, schemePart);');
    apiFunctionDeclaration.push('        if (fulfilsSecurityRequirements) {');
    apiFunctionDeclaration.push('          return;');
    apiFunctionDeclaration.push('        }');
    apiFunctionDeclaration.push('');
    apiFunctionDeclaration.push('      }');
    apiFunctionDeclaration.push('    }');
    apiFunctionDeclaration.push(
      "    throw new Error('No security scheme was fulfilled by the provided securityHandlers for operation ' + operationId);"
    );
    apiFunctionDeclaration.push('  };');

    apiFunctionDeclaration.push(
      '  const ensureRequiredSecurityHandlersExist = () => {'
    );
    apiFunctionDeclaration.push(
      '    let requiredSecurityHandlers = [',
      requiredSecurityHandlers,
      '];'
    );
    apiFunctionDeclaration.push(
      '    for (let i = 0, ilen = requiredSecurityHandlers.length; i < ilen; i++) {'
    );
    apiFunctionDeclaration.push(
      '      let requiredSecurityHandler = requiredSecurityHandlers[i];'
    );
    apiFunctionDeclaration.push(
      "      if (typeof securityHandlers[requiredSecurityHandler] !== 'function') {"
    );
    apiFunctionDeclaration.push(
      "        throw new Error('Expected to see a security handler for scheme \"' +"
    );
    apiFunctionDeclaration.push(
      "            requiredSecurityHandler + '\" in options.securityHandlers');"
    );
    apiFunctionDeclaration.push('      }');
    apiFunctionDeclaration.push('    }');
    apiFunctionDeclaration.push('  };');
    apiFunctionDeclaration.push('  ensureRequiredSecurityHandlersExist();');
  }
  apiFunctionDeclaration.push('  const buildQuery = (obj) => {');
  apiFunctionDeclaration.push('    return Object.keys(obj)');
  apiFunctionDeclaration.push(
    "      .filter(key => typeof obj[key] !== 'undefined')"
  );
  apiFunctionDeclaration.push('      .map((key) => {');
  apiFunctionDeclaration.push('        const value = obj[key];');
  apiFunctionDeclaration.push('        if (value === undefined) {');
  apiFunctionDeclaration.push("          return '';");
  apiFunctionDeclaration.push('        }');
  apiFunctionDeclaration.push('        if (value === null) {');
  apiFunctionDeclaration.push('          return key;');
  apiFunctionDeclaration.push('        }');
  apiFunctionDeclaration.push('        if (Array.isArray(value)) {');
  apiFunctionDeclaration.push('          if (value.length) {');
  apiFunctionDeclaration.push(
    "            return key + '=' + value.map(encodeURIComponent).join('&' + key + '=');"
  );
  apiFunctionDeclaration.push('          } else {');
  apiFunctionDeclaration.push("            return '';");
  apiFunctionDeclaration.push('          }');
  apiFunctionDeclaration.push('        } else {');
  apiFunctionDeclaration.push(
    "          return key + '=' + encodeURIComponent(value);"
  );
  apiFunctionDeclaration.push('        }');
  apiFunctionDeclaration.push("      }).join('&');");
  apiFunctionDeclaration.push('    };');
  apiFunctionDeclaration.push('  return {');
  apiFunctionDeclaration.push(apiFunctionBody);
  apiFunctionDeclaration.push('  };');
  apiFunctionDeclaration.push('}');

  generatePaths(apiDoc, options, apiFunctionBody, requiredSecurityHandlers);

  return apiFunctionDeclaration.toString();
}