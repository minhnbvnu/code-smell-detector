function isResourceUrlAllowedByPolicy(url) {
      var parsedUrl = urlResolve(url.toString());
      var i, n, allowed = false;
      // Ensure that at least one item from the whitelist allows this url.
      for (i = 0, n = resourceUrlWhitelist.length; i < n; i++) {
        if (matchUrl(resourceUrlWhitelist[i], parsedUrl)) {
          allowed = true;
          break;
        }
      }
      if (allowed) {
        // Ensure that no item from the blacklist blocked this url.
        for (i = 0, n = resourceUrlBlacklist.length; i < n; i++) {
          if (matchUrl(resourceUrlBlacklist[i], parsedUrl)) {
            allowed = false;
            break;
          }
        }
      }
      return allowed;
    }