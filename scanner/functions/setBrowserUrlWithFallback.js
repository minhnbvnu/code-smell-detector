function setBrowserUrlWithFallback(url, replace, state) {
      var oldUrl = $location.url();
      var oldState = $location.$$state;
      try {
        $browser.url(url, replace, state);

        // Make sure $location.state() returns referentially identical (not just deeply equal)
        // state object; this makes possible quick checking if the state changed in the digest
        // loop. Checking deep equality would be too expensive.
        $location.$$state = $browser.state();
      } catch (e) {
        // Restore old values if pushState fails
        $location.url(oldUrl);
        $location.$$state = oldState;

        throw e;
      }
    }