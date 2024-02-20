function $SceProvider() {
  var enabled = true;

  /**
   * @ngdoc method
   * @name $sceProvider#enabled
   * @kind function
   *
   * @param {boolean=} value If provided, then enables/disables SCE.
   * @return {boolean} true if SCE is enabled, false otherwise.
   *
   * @description
   * Enables/disables SCE and returns the current value.
   */
  this.enabled = function(value) {
    if (arguments.length) {
      enabled = !!value;
    }
    return enabled;
  };


  /* Design notes on the default implementation for SCE.
   *
   * The API contract for the SCE delegate
   * -------------------------------------
   * The SCE delegate object must provide the following 3 methods:
   *
   * - trustAs(contextEnum, value)
   *     This method is used to tell the SCE service that the provided value is OK to use in the
   *     contexts specified by contextEnum.  It must return an object that will be accepted by
   *     getTrusted() for a compatible contextEnum and return this value.
   *
   * - valueOf(value)
   *     For values that were not produced by trustAs(), return them as is.  For values that were
   *     produced by trustAs(), return the corresponding input value to trustAs.  Basically, if
   *     trustAs is wrapping the given values into some type, this operation unwraps it when given
   *     such a value.
   *
   * - getTrusted(contextEnum, value)
   *     This function should return the a value that is safe to use in the context specified by
   *     contextEnum or throw and exception otherwise.
   *
   * NOTE: This contract deliberately does NOT state that values returned by trustAs() must be
   * opaque or wrapped in some holder object.  That happens to be an implementation detail.  For
   * instance, an implementation could maintain a registry of all trusted objects by context.  In
   * such a case, trustAs() would return the same object that was passed in.  getTrusted() would
   * return the same object passed in if it was found in the registry under a compatible context or
   * throw an exception otherwise.  An implementation might only wrap values some of the time based
   * on some criteria.  getTrusted() might return a value and not throw an exception for special
   * constants or objects even if not wrapped.  All such implementations fulfill this contract.
   *
   *
   * A note on the inheritance model for SCE contexts
   * ------------------------------------------------
   * I've used inheritance and made RESOURCE_URL wrapped types a subtype of URL wrapped types.  This
   * is purely an implementation details.
   *
   * The contract is simply this:
   *
   *     getTrusted($sce.RESOURCE_URL, value) succeeding implies that getTrusted($sce.URL, value)
   *     will also succeed.
   *
   * Inheritance happens to capture this in a natural way.  In some future, we
   * may not use inheritance anymore.  That is OK because no code outside of
   * sce.js and sceSpecs.js would need to be aware of this detail.
   */

  this.$get = ['$parse', '$sceDelegate', function(
                $parse,   $sceDelegate) {
    // Prereq: Ensure that we're not running in IE<11 quirks mode.  In that mode, IE < 11 allow
    // the "expression(javascript expression)" syntax which is insecure.
    if (enabled && msie < 8) {
      throw $sceMinErr('iequirks',
        'Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks ' +
        'mode.  You can fix this by adding the text <!doctype html> to the top of your HTML ' +
        'document.  See http://docs.angularjs.org/api/ng.$sce for more information.');
    }

    var sce = shallowCopy(SCE_CONTEXTS);

    /**
     * @ngdoc method
     * @name $sce#isEnabled
     * @kind function
     *
     * @return {Boolean} true if SCE is enabled, false otherwise.  If you want to set the value, you
     * have to do it at module config time on {@link ng.$sceProvider $sceProvider}.
     *
     * @description
     * Returns a boolean indicating if SCE is enabled.
     */
    sce.isEnabled = function() {
      return enabled;
    };
    sce.trustAs = $sceDelegate.trustAs;
    sce.getTrusted = $sceDelegate.getTrusted;
    sce.valueOf = $sceDelegate.valueOf;

    if (!enabled) {
      sce.trustAs = sce.getTrusted = function(type, value) { return value; };
      sce.valueOf = identity;
    }

    /**
     * @ngdoc method
     * @name $sce#parseAs
     *
     * @description
     * Converts Angular {@link guide/expression expression} into a function.  This is like {@link
     * ng.$parse $parse} and is identical when the expression is a literal constant.  Otherwise, it
     * wraps the expression in a call to {@link ng.$sce#getTrusted $sce.getTrusted(*type*,
     * *result*)}
     *
     * @param {string} type The kind of SCE context in which this result will be used.
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */
    sce.parseAs = function sceParseAs(type, expr) {
      var parsed = $parse(expr);
      if (parsed.literal && parsed.constant) {
        return parsed;
      } else {
        return $parse(expr, function(value) {
          return sce.getTrusted(type, value);
        });
      }
    };

    /**
     * @ngdoc method
     * @name $sce#trustAs
     *
     * @description
     * Delegates to {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs`}.  As such,
     * returns an object that is trusted by angular for use in specified strict contextual
     * escaping contexts (such as ng-bind-html, ng-include, any src attribute
     * interpolation, any dom event binding attribute interpolation such as for onclick,  etc.)
     * that uses the provided value.  See * {@link ng.$sce $sce} for enabling strict contextual
     * escaping.
     *
     * @param {string} type The kind of context in which this value is safe for use.  e.g. url,
     *   resourceUrl, html, js and css.
     * @param {*} value The value that that should be considered trusted/safe.
     * @returns {*} A value that can be used to stand in for the provided `value` in places
     * where Angular expects a $sce.trustAs() return value.
     */

    /**
     * @ngdoc method
     * @name $sce#trustAsHtml
     *
     * @description
     * Shorthand method.  `$sce.trustAsHtml(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.HTML, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedHtml
     *     $sce.getTrustedHtml(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */

    /**
     * @ngdoc method
     * @name $sce#trustAsUrl
     *
     * @description
     * Shorthand method.  `$sce.trustAsUrl(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.URL, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedUrl
     *     $sce.getTrustedUrl(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */

    /**
     * @ngdoc method
     * @name $sce#trustAsResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.trustAsResourceUrl(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.RESOURCE_URL, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedResourceUrl
     *     $sce.getTrustedResourceUrl(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the return
     *     value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */

    /**
     * @ngdoc method
     * @name $sce#trustAsJs
     *
     * @description
     * Shorthand method.  `$sce.trustAsJs(value)` →
     *     {@link ng.$sceDelegate#trustAs `$sceDelegate.trustAs($sce.JS, value)`}
     *
     * @param {*} value The value to trustAs.
     * @returns {*} An object that can be passed to {@link ng.$sce#getTrustedJs
     *     $sce.getTrustedJs(value)} to obtain the original value.  (privileged directives
     *     only accept expressions that are either literal constants or are the
     *     return value of {@link ng.$sce#trustAs $sce.trustAs}.)
     */

    /**
     * @ngdoc method
     * @name $sce#getTrusted
     *
     * @description
     * Delegates to {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted`}.  As such,
     * takes the result of a {@link ng.$sce#trustAs `$sce.trustAs`}() call and returns the
     * originally supplied value if the queried context type is a supertype of the created type.
     * If this condition isn't satisfied, throws an exception.
     *
     * @param {string} type The kind of context in which this value is to be used.
     * @param {*} maybeTrusted The result of a prior {@link ng.$sce#trustAs `$sce.trustAs`}
     *                         call.
     * @returns {*} The value the was originally provided to
     *              {@link ng.$sce#trustAs `$sce.trustAs`} if valid in this context.
     *              Otherwise, throws an exception.
     */

    /**
     * @ngdoc method
     * @name $sce#getTrustedHtml
     *
     * @description
     * Shorthand method.  `$sce.getTrustedHtml(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.HTML, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.HTML, value)`
     */

    /**
     * @ngdoc method
     * @name $sce#getTrustedCss
     *
     * @description
     * Shorthand method.  `$sce.getTrustedCss(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.CSS, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.CSS, value)`
     */

    /**
     * @ngdoc method
     * @name $sce#getTrustedUrl
     *
     * @description
     * Shorthand method.  `$sce.getTrustedUrl(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.URL, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.URL, value)`
     */

    /**
     * @ngdoc method
     * @name $sce#getTrustedResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.getTrustedResourceUrl(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.RESOURCE_URL, value)`}
     *
     * @param {*} value The value to pass to `$sceDelegate.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.RESOURCE_URL, value)`
     */

    /**
     * @ngdoc method
     * @name $sce#getTrustedJs
     *
     * @description
     * Shorthand method.  `$sce.getTrustedJs(value)` →
     *     {@link ng.$sceDelegate#getTrusted `$sceDelegate.getTrusted($sce.JS, value)`}
     *
     * @param {*} value The value to pass to `$sce.getTrusted`.
     * @returns {*} The return value of `$sce.getTrusted($sce.JS, value)`
     */

    /**
     * @ngdoc method
     * @name $sce#parseAsHtml
     *
     * @description
     * Shorthand method.  `$sce.parseAsHtml(expression string)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.HTML, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */

    /**
     * @ngdoc method
     * @name $sce#parseAsCss
     *
     * @description
     * Shorthand method.  `$sce.parseAsCss(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.CSS, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */

    /**
     * @ngdoc method
     * @name $sce#parseAsUrl
     *
     * @description
     * Shorthand method.  `$sce.parseAsUrl(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.URL, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */

    /**
     * @ngdoc method
     * @name $sce#parseAsResourceUrl
     *
     * @description
     * Shorthand method.  `$sce.parseAsResourceUrl(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.RESOURCE_URL, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */

    /**
     * @ngdoc method
     * @name $sce#parseAsJs
     *
     * @description
     * Shorthand method.  `$sce.parseAsJs(value)` →
     *     {@link ng.$sce#parseAs `$sce.parseAs($sce.JS, value)`}
     *
     * @param {string} expression String expression to compile.
     * @returns {function(context, locals)} a function which represents the compiled expression:
     *
     *    * `context` – `{object}` – an object against which any expressions embedded in the strings
     *      are evaluated against (typically a scope object).
     *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
     *      `context`.
     */

    // Shorthand delegations.
    var parse = sce.parseAs,
        getTrusted = sce.getTrusted,
        trustAs = sce.trustAs;

    forEach(SCE_CONTEXTS, function(enumValue, name) {
      var lName = lowercase(name);
      sce[camelCase("parse_as_" + lName)] = function(expr) {
        return parse(enumValue, expr);
      };
      sce[camelCase("get_trusted_" + lName)] = function(value) {
        return getTrusted(enumValue, value);
      };
      sce[camelCase("trust_as_" + lName)] = function(value) {
        return trustAs(enumValue, value);
      };
    });

    return sce;
  }];
}