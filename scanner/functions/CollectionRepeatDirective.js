function CollectionRepeatDirective($ionicCollectionManager, $parse, $window, $$rAF, $rootScope, $timeout) {
  return {
    restrict: 'A',
    priority: 1000,
    transclude: 'element',
    $$tlb: true,
    require: '^^$ionicScroll',
    link: postLink
  };

  function postLink(scope, element, attr, scrollCtrl, transclude) {
    var scrollView = scrollCtrl.scrollView;
    var node = element[0];
    var containerNode = angular.element('<div class="collection-repeat-container">')[0];
    node.parentNode.replaceChild(containerNode, node);

    if (scrollView.options.scrollingX && scrollView.options.scrollingY) {
      throw new Error("collection-repeat expected a parent x or y scrollView, not " +
                      "an xy scrollView.");
    }

    var repeatExpr = attr.collectionRepeat;
    var match = repeatExpr.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
    if (!match) {
      throw new Error("collection-repeat expected expression in form of '_item_ in " +
                      "_collection_[ track by _id_]' but got '" + attr.collectionRepeat + "'.");
    }
    var keyExpr = match[1];
    var listExpr = match[2];
    var listGetter = $parse(listExpr);
    var heightData = {};
    var widthData = {};
    var computedStyleDimensions = {};
    var data = [];
    var repeatManager;

    // attr.collectionBufferSize is deprecated
    var renderBufferExpr = attr.itemRenderBuffer || attr.collectionBufferSize;
    var renderBuffer = angular.isDefined(renderBufferExpr) ?
      parseInt(renderBufferExpr) :
      DEFAULT_RENDER_BUFFER;

    // attr.collectionItemHeight is deprecated
    var heightExpr = attr.itemHeight || attr.collectionItemHeight;
    // attr.collectionItemWidth is deprecated
    var widthExpr = attr.itemWidth || attr.collectionItemWidth;

    var afterItemsContainer = initAfterItemsContainer();

    var changeValidator = makeChangeValidator();
    initDimensions();

    // Dimensions are refreshed on resize or data change.
    scrollCtrl.$element.on('scroll-resize', refreshDimensions);

    angular.element($window).on('resize', onResize);
    var unlistenToExposeAside = $rootScope.$on('$ionicExposeAside', ionic.animationFrameThrottle(function() {
      scrollCtrl.scrollView.resize();
      onResize();
    }));
    $timeout(refreshDimensions, 0, false);

    function onResize() {
      if (changeValidator.resizeRequiresRefresh(scrollView.__clientWidth, scrollView.__clientHeight)) {
        refreshDimensions();
      }
    }

    scope.$watchCollection(listGetter, function(newValue) {
      data = newValue || (newValue = []);
      if (!angular.isArray(newValue)) {
        throw new Error("collection-repeat expected an array for '" + listExpr + "', " +
          "but got a " + typeof value);
      }
      // Wait for this digest to end before refreshing everything.
      scope.$$postDigest(function() {
        getRepeatManager().setData(data);
        if (changeValidator.dataChangeRequiresRefresh(data)) refreshDimensions();
      });
    });

    scope.$on('$destroy', function() {
      angular.element($window).off('resize', onResize);
      unlistenToExposeAside();
      scrollCtrl.$element && scrollCtrl.$element.off('scroll-resize', refreshDimensions);

      computedStyleNode && computedStyleNode.parentNode &&
        computedStyleNode.parentNode.removeChild(computedStyleNode);
      computedStyleScope && computedStyleScope.$destroy();
      computedStyleScope = computedStyleNode = null;

      repeatManager && repeatManager.destroy();
      repeatManager = null;
    });

    function makeChangeValidator() {
      var self;
      return (self = {
        dataLength: 0,
        width: 0,
        height: 0,
        // A resize triggers a refresh only if we have data, the scrollView has size,
        // and the size has changed.
        resizeRequiresRefresh: function(newWidth, newHeight) {
          var requiresRefresh = self.dataLength && newWidth && newHeight &&
            (newWidth !== self.width || newHeight !== self.height);

          self.width = newWidth;
          self.height = newHeight;

          return !!requiresRefresh;
        },
        // A change in data only triggers a refresh if the data has length, or if the data's
        // length is less than before.
        dataChangeRequiresRefresh: function(newData) {
          var requiresRefresh = newData.length > 0 || newData.length < self.dataLength;

          self.dataLength = newData.length;

          return !!requiresRefresh;
        }
      });
    }

    function getRepeatManager() {
      return repeatManager || (repeatManager = new $ionicCollectionManager({
        afterItemsNode: afterItemsContainer[0],
        containerNode: containerNode,
        heightData: heightData,
        widthData: widthData,
        forceRefreshImages: !!(isDefined(attr.forceRefreshImages) && attr.forceRefreshImages !== 'false'),
        keyExpression: keyExpr,
        renderBuffer: renderBuffer,
        scope: scope,
        scrollView: scrollCtrl.scrollView,
        transclude: transclude
      }));
    }

    function initAfterItemsContainer() {
      var container = angular.element(
        scrollView.__content.querySelector('.collection-repeat-after-container')
      );
      // Put everything in the view after the repeater into a container.
      if (!container.length) {
        var elementIsAfterRepeater = false;
        var afterNodes = [].filter.call(scrollView.__content.childNodes, function(node) {
          if (ionic.DomUtil.contains(node, containerNode)) {
            elementIsAfterRepeater = true;
            return false;
          }
          return elementIsAfterRepeater;
        });
        container = angular.element('<span class="collection-repeat-after-container">');
        if (scrollView.options.scrollingX) {
          container.addClass('horizontal');
        }
        container.append(afterNodes);
        scrollView.__content.appendChild(container[0]);
      }
      return container;
    }

    function initDimensions() {
      //Height and width have four 'modes':
      //1) Computed Mode
      //  - Nothing is supplied, so we getComputedStyle() on one element in the list and use
      //    that width and height value for the width and height of every item. This is re-computed
      //    every resize.
      //2) Constant Mode, Static Integer
      //  - The user provides a constant number for width or height, in pixels. We parse it,
      //    store it on the `value` field, and it never changes
      //3) Constant Mode, Percent
      //  - The user provides a percent string for width or height. The getter for percent is
      //    stored on the `getValue()` field, and is re-evaluated once every resize. The result
      //    is stored on the `value` field.
      //4) Dynamic Mode
      //  - The user provides a dynamic expression for the width or height.  This is re-evaluated
      //    for every item, stored on the `.getValue()` field.
      if (heightExpr) {
        parseDimensionAttr(heightExpr, heightData);
      } else {
        heightData.computed = true;
      }
      if (widthExpr) {
        parseDimensionAttr(widthExpr, widthData);
      } else {
        widthData.computed = true;
      }
    }

    function refreshDimensions() {
      var hasData = data.length > 0;

      if (hasData && (heightData.computed || widthData.computed)) {
        computeStyleDimensions();
      }

      if (hasData && heightData.computed) {
        heightData.value = computedStyleDimensions.height;
        if (!heightData.value) {
          throw new Error('collection-repeat tried to compute the height of repeated elements "' +
            repeatExpr + '", but was unable to. Please provide the "item-height" attribute. ' +
            'http://ionicframework.com/docs/api/directive/collectionRepeat/');
        }
      } else if (!heightData.dynamic && heightData.getValue) {
        // If it's a constant with a getter (eg percent), we just refresh .value after resize
        heightData.value = heightData.getValue();
      }

      if (hasData && widthData.computed) {
        widthData.value = computedStyleDimensions.width;
        if (!widthData.value) {
          throw new Error('collection-repeat tried to compute the width of repeated elements "' +
            repeatExpr + '", but was unable to. Please provide the "item-width" attribute. ' +
            'http://ionicframework.com/docs/api/directive/collectionRepeat/');
        }
      } else if (!widthData.dynamic && widthData.getValue) {
        // If it's a constant with a getter (eg percent), we just refresh .value after resize
        widthData.value = widthData.getValue();
      }
      // Dynamic dimensions aren't updated on resize. Since they're already dynamic anyway,
      // .getValue() will be used.

      getRepeatManager().refreshLayout();
    }

    function parseDimensionAttr(attrValue, dimensionData) {
      if (!attrValue) return;

      var parsedValue;
      // Try to just parse the plain attr value
      try {
        parsedValue = $parse(attrValue);
      } catch (e) {
        // If the parse fails and the value has `px` or `%` in it, surround the attr in
        // quotes, to attempt to let the user provide a simple `attr="100%"` or `attr="100px"`
        if (attrValue.trim().match(/\d+(px|%)$/)) {
          attrValue = '"' + attrValue + '"';
        }
        parsedValue = $parse(attrValue);
      }

      var constantAttrValue = attrValue.replace(/(\'|\"|px|%)/g, '').trim();
      var isConstant = constantAttrValue.length && !/([a-zA-Z]|\$|:|\?)/.test(constantAttrValue);
      dimensionData.attrValue = attrValue;

      // If it's a constant, it's either a percent or just a constant pixel number.
      if (isConstant) {
        // For percents, store the percent getter on .getValue()
        if (attrValue.indexOf('%') > -1) {
          var decimalValue = parseFloat(parsedValue()) / 100;
          dimensionData.getValue = dimensionData === heightData ?
            function() { return Math.floor(decimalValue * scrollView.__clientHeight); } :
            function() { return Math.floor(decimalValue * scrollView.__clientWidth); };
        } else {
          // For static constants, just store the static constant.
          dimensionData.value = parseInt(parsedValue());
        }

      } else {
        dimensionData.dynamic = true;
        dimensionData.getValue = dimensionData === heightData ?
          function heightGetter(scope, locals) {
            var result = parsedValue(scope, locals);
            if (result.charAt && result.charAt(result.length - 1) === '%') {
              return Math.floor(parseFloat(result) / 100 * scrollView.__clientHeight);
            }
            return parseInt(result);
          } :
          function widthGetter(scope, locals) {
            var result = parsedValue(scope, locals);
            if (result.charAt && result.charAt(result.length - 1) === '%') {
              return Math.floor(parseFloat(result) / 100 * scrollView.__clientWidth);
            }
            return parseInt(result);
          };
      }
    }

    var computedStyleNode;
    var computedStyleScope;
    function computeStyleDimensions() {
      if (!computedStyleNode) {
        transclude(computedStyleScope = scope.$new(), function(clone) {
          clone[0].removeAttribute('collection-repeat'); // remove absolute position styling
          computedStyleNode = clone[0];
        });
      }

      computedStyleScope[keyExpr] = (listGetter(scope) || [])[0];
      if (!$rootScope.$$phase) computedStyleScope.$digest();
      containerNode.appendChild(computedStyleNode);

      var style = $window.getComputedStyle(computedStyleNode);
      computedStyleDimensions.width = parseInt(style.width);
      computedStyleDimensions.height = parseInt(style.height);

      containerNode.removeChild(computedStyleNode);
    }

  }

}