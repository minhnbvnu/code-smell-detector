function getTrusted(type, maybeTrusted) {
      if (maybeTrusted === null || isUndefined(maybeTrusted) || maybeTrusted === '') {
        return maybeTrusted;
      }
      var constructor = (byType.hasOwnProperty(type) ? byType[type] : null);
      if (constructor && maybeTrusted instanceof constructor) {
        return maybeTrusted.$$unwrapTrustedValue();
      }
      // If we get here, then we may only take one of two actions.
      // 1. sanitize the value for the requested type, or
      // 2. throw an exception.
      if (type === SCE_CONTEXTS.RESOURCE_URL) {
        if (isResourceUrlAllowedByPolicy(maybeTrusted)) {
          return maybeTrusted;
        } else {
          throw $sceMinErr('insecurl',
              'Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}',
              maybeTrusted.toString());
        }
      } else if (type === SCE_CONTEXTS.HTML) {
        return htmlSanitizer(maybeTrusted);
      }
      throw $sceMinErr('unsafe', 'Attempting to use an unsafe value in a safe context.');
    }