function preventElementSrcLoading(source, tagName, match) {
        if (typeof Proxy === "undefined" || typeof Reflect === "undefined") {
          return;
        }
        var srcMockData = {
          script: "data:text/javascript;base64,KCk9Pnt9",
          img: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
          iframe: "data:text/html;base64, PGRpdj48L2Rpdj4=",
          link: "data:text/plain;base64,"
        };
        var instance;
        if (tagName === "script") {
          instance = HTMLScriptElement;
        } else if (tagName === "img") {
          instance = HTMLImageElement;
        } else if (tagName === "iframe") {
          instance = HTMLIFrameElement;
        } else if (tagName === "link") {
          instance = HTMLLinkElement;
        } else {
          return;
        }
        var hasTrustedTypes = window.trustedTypes && typeof window.trustedTypes.createPolicy === "function";
        var policy;
        if (hasTrustedTypes) {
          policy = window.trustedTypes.createPolicy("AGPolicy", {
            createScriptURL: function createScriptURL(arg) {
              return arg;
            }
          });
        }
        var SOURCE_PROPERTY_NAME = tagName === "link" ? "href" : "src";
        var ONERROR_PROPERTY_NAME = "onerror";
        var searchRegexp = toRegExp(match);
        var setMatchedAttribute = function setMatchedAttribute(elem) {
          return elem.setAttribute(source.name, "matched");
        };
        var setAttributeWrapper = function setAttributeWrapper(target, thisArg, args) {
          if (!args[0] || !args[1]) {
            return Reflect.apply(target, thisArg, args);
          }
          var nodeName = thisArg.nodeName.toLowerCase();
          var attrName = args[0].toLowerCase();
          var attrValue = args[1];
          var isMatched = attrName === SOURCE_PROPERTY_NAME && tagName.toLowerCase() === nodeName && srcMockData[nodeName] && searchRegexp.test(attrValue);
          if (!isMatched) {
            return Reflect.apply(target, thisArg, args);
          }
          hit(source);
          setMatchedAttribute(thisArg);
          return Reflect.apply(target, thisArg, [attrName, srcMockData[nodeName]]);
        };
        var setAttributeHandler = {
          apply: setAttributeWrapper
        };
        instance.prototype.setAttribute = new Proxy(Element.prototype.setAttribute, setAttributeHandler);
        var origSrcDescriptor = safeGetDescriptor(instance.prototype, SOURCE_PROPERTY_NAME);
        if (!origSrcDescriptor) {
          return;
        }
        Object.defineProperty(instance.prototype, SOURCE_PROPERTY_NAME, {
          enumerable: true,
          configurable: true,
          get() {
            return origSrcDescriptor.get.call(this);
          },
          set(urlValue) {
            var nodeName = this.nodeName.toLowerCase();
            var isMatched = tagName.toLowerCase() === nodeName && srcMockData[nodeName] && searchRegexp.test(urlValue);
            if (!isMatched) {
              origSrcDescriptor.set.call(this, urlValue);
              return true;
            }
            if (policy && urlValue instanceof TrustedScriptURL) {
              var trustedSrc = policy.createScriptURL(urlValue);
              origSrcDescriptor.set.call(this, trustedSrc);
              hit(source);
              return;
            }
            setMatchedAttribute(this);
            origSrcDescriptor.set.call(this, srcMockData[nodeName]);
            hit(source);
          }
        });
        var origOnerrorDescriptor = safeGetDescriptor(HTMLElement.prototype, ONERROR_PROPERTY_NAME);
        if (!origOnerrorDescriptor) {
          return;
        }
        Object.defineProperty(HTMLElement.prototype, ONERROR_PROPERTY_NAME, {
          enumerable: true,
          configurable: true,
          get() {
            return origOnerrorDescriptor.get.call(this);
          },
          set(cb) {
            var isMatched = this.getAttribute(source.name) === "matched";
            if (!isMatched) {
              origOnerrorDescriptor.set.call(this, cb);
              return true;
            }
            origOnerrorDescriptor.set.call(this, noopFunc);
            return true;
          }
        });
        var addEventListenerWrapper = function addEventListenerWrapper(target, thisArg, args) {
          if (!args[0] || !args[1] || !thisArg) {
            return Reflect.apply(target, thisArg, args);
          }
          var eventName = args[0];
          var isMatched = typeof thisArg.getAttribute === "function" && thisArg.getAttribute(source.name) === "matched" && eventName === "error";
          if (isMatched) {
            return Reflect.apply(target, thisArg, [eventName, noopFunc]);
          }
          return Reflect.apply(target, thisArg, args);
        };
        var addEventListenerHandler = {
          apply: addEventListenerWrapper
        };
        EventTarget.prototype.addEventListener = new Proxy(EventTarget.prototype.addEventListener, addEventListenerHandler);
        var preventInlineOnerror = function preventInlineOnerror(tagName, src) {
          window.addEventListener("error", function (event) {
            if (!event.target || !event.target.nodeName || event.target.nodeName.toLowerCase() !== tagName || !event.target.src || !src.test(event.target.src)) {
              return;
            }
            hit(source);
            if (typeof event.target.onload === "function") {
              event.target.onerror = event.target.onload;
              return;
            }
            event.target.onerror = noopFunc;
          }, true);
        };
        preventInlineOnerror(tagName, searchRegexp);
      }