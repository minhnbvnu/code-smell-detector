function $LocationProvider() {
  var hashPrefix = '',
      html5Mode = {
        enabled: false,
        requireBase: true,
        rewriteLinks: true
      };

  /**
   * @ngdoc method
   * @name $locationProvider#hashPrefix
   * @description
   * @param {string=} prefix Prefix for hash part (containing path and search)
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   */
  this.hashPrefix = function(prefix) {
    if (isDefined(prefix)) {
      hashPrefix = prefix;
      return this;
    } else {
      return hashPrefix;
    }
  };

  /**
   * @ngdoc method
   * @name $locationProvider#html5Mode
   * @description
   * @param {(boolean|Object)=} mode If boolean, sets `html5Mode.enabled` to value.
   *   If object, sets `enabled`, `requireBase` and `rewriteLinks` to respective values. Supported
   *   properties:
   *   - **enabled** – `{boolean}` – (default: false) If true, will rely on `history.pushState` to
   *     change urls where supported. Will fall back to hash-prefixed paths in browsers that do not
   *     support `pushState`.
   *   - **requireBase** - `{boolean}` - (default: `true`) When html5Mode is enabled, specifies
   *     whether or not a <base> tag is required to be present. If `enabled` and `requireBase` are
   *     true, and a base tag is not present, an error will be thrown when `$location` is injected.
   *     See the {@link guide/$location $location guide for more information}
   *   - **rewriteLinks** - `{boolean}` - (default: `true`) When html5Mode is enabled,
   *     enables/disables url rewriting for relative links.
   *
   * @returns {Object} html5Mode object if used as getter or itself (chaining) if used as setter
   */
  this.html5Mode = function(mode) {
    if (isBoolean(mode)) {
      html5Mode.enabled = mode;
      return this;
    } else if (isObject(mode)) {

      if (isBoolean(mode.enabled)) {
        html5Mode.enabled = mode.enabled;
      }

      if (isBoolean(mode.requireBase)) {
        html5Mode.requireBase = mode.requireBase;
      }

      if (isBoolean(mode.rewriteLinks)) {
        html5Mode.rewriteLinks = mode.rewriteLinks;
      }

      return this;
    } else {
      return html5Mode;
    }
  };

  /**
   * @ngdoc event
   * @name $location#$locationChangeStart
   * @eventType broadcast on root scope
   * @description
   * Broadcasted before a URL will change.
   *
   * This change can be prevented by calling
   * `preventDefault` method of the event. See {@link ng.$rootScope.Scope#$on} for more
   * details about event object. Upon successful change
   * {@link ng.$location#$locationChangeSuccess $locationChangeSuccess} is fired.
   *
   * The `newState` and `oldState` parameters may be defined only in HTML5 mode and when
   * the browser supports the HTML5 History API.
   *
   * @param {Object} angularEvent Synthetic event object.
   * @param {string} newUrl New URL
   * @param {string=} oldUrl URL that was before it was changed.
   * @param {string=} newState New history state object
   * @param {string=} oldState History state object that was before it was changed.
   */

  /**
   * @ngdoc event
   * @name $location#$locationChangeSuccess
   * @eventType broadcast on root scope
   * @description
   * Broadcasted after a URL was changed.
   *
   * The `newState` and `oldState` parameters may be defined only in HTML5 mode and when
   * the browser supports the HTML5 History API.
   *
   * @param {Object} angularEvent Synthetic event object.
   * @param {string} newUrl New URL
   * @param {string=} oldUrl URL that was before it was changed.
   * @param {string=} newState New history state object
   * @param {string=} oldState History state object that was before it was changed.
   */

  this.$get = ['$rootScope', '$browser', '$sniffer', '$rootElement', '$window',
      function($rootScope, $browser, $sniffer, $rootElement, $window) {
    var $location,
        LocationMode,
        baseHref = $browser.baseHref(), // if base[href] is undefined, it defaults to ''
        initialUrl = $browser.url(),
        appBase;

    if (html5Mode.enabled) {
      if (!baseHref && html5Mode.requireBase) {
        throw $locationMinErr('nobase',
          "$location in HTML5 mode requires a <base> tag to be present!");
      }
      appBase = serverBase(initialUrl) + (baseHref || '/');
      LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
    } else {
      appBase = stripHash(initialUrl);
      LocationMode = LocationHashbangUrl;
    }
    var appBaseNoFile = stripFile(appBase);

    $location = new LocationMode(appBase, appBaseNoFile, '#' + hashPrefix);
    $location.$$parseLinkUrl(initialUrl, initialUrl);

    $location.$$state = $browser.state();

    var IGNORE_URI_REGEXP = /^\s*(javascript|mailto):/i;

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

    $rootElement.on('click', function(event) {
      // TODO(vojta): rewrite link when opening in new tab/window (in legacy browser)
      // currently we open nice url link and redirect then

      if (!html5Mode.rewriteLinks || event.ctrlKey || event.metaKey || event.shiftKey || event.which == 2 || event.button == 2) return;

      var elm = jqLite(event.target);

      // traverse the DOM up to find first A tag
      while (nodeName_(elm[0]) !== 'a') {
        // ignore rewriting if no A tag (reached root element, or no parent - removed from document)
        if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0]) return;
      }

      var absHref = elm.prop('href');
      // get the actual href attribute - see
      // http://msdn.microsoft.com/en-us/library/ie/dd347148(v=vs.85).aspx
      var relHref = elm.attr('href') || elm.attr('xlink:href');

      if (isObject(absHref) && absHref.toString() === '[object SVGAnimatedString]') {
        // SVGAnimatedString.animVal should be identical to SVGAnimatedString.baseVal, unless during
        // an animation.
        absHref = urlResolve(absHref.animVal).href;
      }

      // Ignore when url is started with javascript: or mailto:
      if (IGNORE_URI_REGEXP.test(absHref)) return;

      if (absHref && !elm.attr('target') && !event.isDefaultPrevented()) {
        if ($location.$$parseLinkUrl(absHref, relHref)) {
          // We do a preventDefault for all urls that are part of the angular application,
          // in html5mode and also without, so that we are able to abort navigation without
          // getting double entries in the location history.
          event.preventDefault();
          // update location manually
          if ($location.absUrl() != $browser.url()) {
            $rootScope.$apply();
            // hack to work around FF6 bug 684208 when scenario runner clicks on links
            $window.angular['ff-684208-preventDefault'] = true;
          }
        }
      }
    });


    // rewrite hashbang url <> html5 url
    if (trimEmptyHash($location.absUrl()) != trimEmptyHash(initialUrl)) {
      $browser.url($location.absUrl(), true);
    }

    var initializing = true;

    // update $location when $browser url changes
    $browser.onUrlChange(function(newUrl, newState) {

      if (isUndefined(beginsWith(appBaseNoFile, newUrl))) {
        // If we are navigating outside of the app then force a reload
        $window.location.href = newUrl;
        return;
      }

      $rootScope.$evalAsync(function() {
        var oldUrl = $location.absUrl();
        var oldState = $location.$$state;
        var defaultPrevented;
        newUrl = trimEmptyHash(newUrl);
        $location.$$parse(newUrl);
        $location.$$state = newState;

        defaultPrevented = $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl,
            newState, oldState).defaultPrevented;

        // if the location was changed by a `$locationChangeStart` handler then stop
        // processing this location change
        if ($location.absUrl() !== newUrl) return;

        if (defaultPrevented) {
          $location.$$parse(oldUrl);
          $location.$$state = oldState;
          setBrowserUrlWithFallback(oldUrl, false, oldState);
        } else {
          initializing = false;
          afterLocationChange(oldUrl, oldState);
        }
      });
      if (!$rootScope.$$phase) $rootScope.$digest();
    });

    // update browser
    $rootScope.$watch(function $locationWatch() {
      var oldUrl = trimEmptyHash($browser.url());
      var newUrl = trimEmptyHash($location.absUrl());
      var oldState = $browser.state();
      var currentReplace = $location.$$replace;
      var urlOrStateChanged = oldUrl !== newUrl ||
        ($location.$$html5 && $sniffer.history && oldState !== $location.$$state);

      if (initializing || urlOrStateChanged) {
        initializing = false;

        $rootScope.$evalAsync(function() {
          var newUrl = $location.absUrl();
          var defaultPrevented = $rootScope.$broadcast('$locationChangeStart', newUrl, oldUrl,
              $location.$$state, oldState).defaultPrevented;

          // if the location was changed by a `$locationChangeStart` handler then stop
          // processing this location change
          if ($location.absUrl() !== newUrl) return;

          if (defaultPrevented) {
            $location.$$parse(oldUrl);
            $location.$$state = oldState;
          } else {
            if (urlOrStateChanged) {
              setBrowserUrlWithFallback(newUrl, currentReplace,
                                        oldState === $location.$$state ? null : $location.$$state);
            }
            afterLocationChange(oldUrl, oldState);
          }
        });
      }

      $location.$$replace = false;

      // we don't need to return anything because $evalAsync will make the digest loop dirty when
      // there is a change
    });

    return $location;

    function afterLocationChange(oldUrl, oldState) {
      $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl,
        $location.$$state, oldState);
    }
}];
}