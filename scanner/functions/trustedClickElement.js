function trustedClickElement(source, selectors) {
        var extraMatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
        var delay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NaN;
        if (!selectors) {
          return;
        }
        var OBSERVER_TIMEOUT_MS = 1e4;
        var THROTTLE_DELAY_MS = 20;
        var STATIC_CLICK_DELAY_MS = 150;
        var COOKIE_MATCH_MARKER = "cookie:";
        var LOCAL_STORAGE_MATCH_MARKER = "localStorage:";
        var SELECTORS_DELIMITER = ",";
        var COOKIE_STRING_DELIMITER = ";";
        var EXTRA_MATCH_DELIMITER = /(,\s*){1}(?=!?cookie:|!?localStorage:)/;
        var sleep = function sleep(delayMs) {
          return new Promise(function (resolve) {
            return setTimeout(resolve, delayMs);
          });
        };
        var parsedDelay;
        if (delay) {
          parsedDelay = parseInt(delay, 10);
          var isValidDelay = !Number.isNaN(parsedDelay) || parsedDelay < OBSERVER_TIMEOUT_MS;
          if (!isValidDelay) {
            var message = "Passed delay '".concat(delay, "' is invalid or bigger than ").concat(OBSERVER_TIMEOUT_MS, " ms");
            logMessage(source, message);
            return;
          }
        }
        var canClick = !parsedDelay;
        var cookieMatches = [];
        var localStorageMatches = [];
        var isInvertedMatchCookie = false;
        var isInvertedMatchLocalStorage = false;
        if (extraMatch) {
          var parsedExtraMatch = extraMatch.split(EXTRA_MATCH_DELIMITER).map(function (matchStr) {
            return matchStr.trim();
          });
          parsedExtraMatch.forEach(function (matchStr) {
            if (matchStr.includes(COOKIE_MATCH_MARKER)) {
              var _parseMatchArg = parseMatchArg(matchStr),
                isInvertedMatch = _parseMatchArg.isInvertedMatch,
                matchValue = _parseMatchArg.matchValue;
              isInvertedMatchCookie = isInvertedMatch;
              var cookieMatch = matchValue.replace(COOKIE_MATCH_MARKER, "");
              cookieMatches.push(cookieMatch);
            }
            if (matchStr.includes(LOCAL_STORAGE_MATCH_MARKER)) {
              var _parseMatchArg2 = parseMatchArg(matchStr),
                _isInvertedMatch = _parseMatchArg2.isInvertedMatch,
                _matchValue = _parseMatchArg2.matchValue;
              isInvertedMatchLocalStorage = _isInvertedMatch;
              var localStorageMatch = _matchValue.replace(LOCAL_STORAGE_MATCH_MARKER, "");
              localStorageMatches.push(localStorageMatch);
            }
          });
        }
        if (cookieMatches.length > 0) {
          var parsedCookieMatches = parseCookieString(cookieMatches.join(COOKIE_STRING_DELIMITER));
          var parsedCookies = parseCookieString(document.cookie);
          var cookieKeys = Object.keys(parsedCookies);
          if (cookieKeys.length === 0) {
            return;
          }
          var cookiesMatched = Object.keys(parsedCookieMatches).every(function (key) {
            var valueMatch = parsedCookieMatches[key] ? toRegExp(parsedCookieMatches[key]) : null;
            var keyMatch = toRegExp(key);
            return cookieKeys.some(function (key) {
              var keysMatched = keyMatch.test(key);
              if (!keysMatched) {
                return false;
              }
              if (!valueMatch) {
                return true;
              }
              return valueMatch.test(parsedCookies[key]);
            });
          });
          var shouldRun = cookiesMatched !== isInvertedMatchCookie;
          if (!shouldRun) {
            return;
          }
        }
        if (localStorageMatches.length > 0) {
          var localStorageMatched = localStorageMatches.every(function (str) {
            var itemValue = window.localStorage.getItem(str);
            return itemValue || itemValue === "";
          });
          var _shouldRun = localStorageMatched !== isInvertedMatchLocalStorage;
          if (!_shouldRun) {
            return;
          }
        }
        var selectorsSequence = selectors.split(SELECTORS_DELIMITER).map(function (selector) {
          return selector.trim();
        });
        var createElementObj = function createElementObj(element) {
          return {
            element: element || null,
            clicked: false
          };
        };
        var elementsSequence = Array(selectorsSequence.length).fill(createElementObj());
        var clickElementsBySequence = async function clickElementsBySequence() {
          for (var i = 0; i < elementsSequence.length; i += 1) {
            var elementObj = elementsSequence[i];
            if (i >= 1) {
              await sleep(STATIC_CLICK_DELAY_MS);
            }
            if (!elementObj.element) {
              break;
            }
            if (!elementObj.clicked) {
              elementObj.element.click();
              elementObj.clicked = true;
            }
          }
          var allElementsClicked = elementsSequence.every(function (elementObj) {
            return elementObj.clicked === true;
          });
          if (allElementsClicked) {
            hit(source);
          }
        };
        var handleElement = function handleElement(element, i) {
          var elementObj = createElementObj(element);
          elementsSequence[i] = elementObj;
          if (canClick) {
            clickElementsBySequence();
          }
        };
        var findElements = function findElements(mutations, observer) {
          var fulfilledSelectors = [];
          selectorsSequence.forEach(function (selector, i) {
            if (!selector) {
              return;
            }
            var element = document.querySelector(selector);
            if (!element) {
              return;
            }
            handleElement(element, i);
            fulfilledSelectors.push(selector);
          });
          selectorsSequence = selectorsSequence.map(function (selector) {
            return fulfilledSelectors.includes(selector) ? null : selector;
          });
          var allSelectorsFulfilled = selectorsSequence.every(function (selector) {
            return selector === null;
          });
          if (allSelectorsFulfilled) {
            observer.disconnect();
          }
        };
        var observer = new MutationObserver(throttle(findElements, THROTTLE_DELAY_MS));
        observer.observe(document.documentElement, {
          attributes: true,
          childList: true,
          subtree: true
        });
        if (parsedDelay) {
          setTimeout(function () {
            clickElementsBySequence();
            canClick = true;
          }, parsedDelay);
        }
        setTimeout(function () {
          return observer.disconnect();
        }, OBSERVER_TIMEOUT_MS);
      }