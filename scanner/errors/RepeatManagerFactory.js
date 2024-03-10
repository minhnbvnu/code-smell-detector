    this.refreshLayout = function() {
      if (data.length) {
        estimatedHeight = heightGetter(0, data[0]);
        estimatedWidth = widthGetter(0, data[0]);
      } else {
        // If we don't have any data in our array, just guess.
        estimatedHeight = 100;
        estimatedWidth = 100;
      }

      // Get the size of every element AFTER the repeater. We have to get the margin before and
      // after the first/last element to fix a browser bug with getComputedStyle() not counting
      // the first/last child's margins into height.
      var style = getComputedStyle(afterItemsNode) || {};
      var firstStyle = afterItemsNode.firstElementChild && getComputedStyle(afterItemsNode.firstElementChild) || {};
      var lastStyle = afterItemsNode.lastElementChild && getComputedStyle(afterItemsNode.lastElementChild) || {};
      repeaterAfterSize = (parseInt(style[isVertical ? 'height' : 'width']) || 0) +
        (firstStyle && parseInt(firstStyle[isVertical ? 'marginTop' : 'marginLeft']) || 0) +
        (lastStyle && parseInt(lastStyle[isVertical ? 'marginBottom' : 'marginRight']) || 0);

      // Get the offsetTop of the repeater.
      repeaterBeforeSize = 0;
      var current = containerNode;
      do {
        repeaterBeforeSize += current[isVertical ? 'offsetTop' : 'offsetLeft'];
      } while ( ionic.DomUtil.contains(scrollView.__content, current = current.offsetParent) );

      var containerPrevNode = containerNode.previousElementSibling;
      var beforeStyle = containerPrevNode ? $window.getComputedStyle(containerPrevNode) : {};
      var beforeMargin = parseInt(beforeStyle[isVertical ? 'marginBottom' : 'marginRight'] || 0);

      // Because we position the collection container with position: relative, it doesn't take
      // into account where to position itself relative to the previous element's marginBottom.
      // To compensate, we translate the container up by the previous element's margin.
      containerNode.style[ionic.CSS.TRANSFORM] = TRANSLATE_TEMPLATE_STR
        .replace(PRIMARY, -beforeMargin)
        .replace(SECONDARY, 0);
      repeaterBeforeSize -= beforeMargin;

      if (!scrollView.__clientHeight || !scrollView.__clientWidth) {
        scrollView.__clientWidth = scrollView.__container.clientWidth;
        scrollView.__clientHeight = scrollView.__container.clientHeight;
      }

      (view.onRefreshLayout || angular.noop)();
      view.refreshDirection();
      scrollViewSetDimensions();

      // Create the pool of items for reuse, setting the size to (estimatedItemsOnScreen) * 2,
      // plus the size of the renderBuffer.
      if (!isLayoutReady) {
        var poolSize = Math.max(20, renderBuffer * 3);
        for (var i = 0; i < poolSize; i++) {
          itemsPool.push(new RepeatItem());
        }
      }

      isLayoutReady = true;
      if (isLayoutReady && isDataReady) {
        // If the resize or latest data change caused the scrollValue to
        // now be out of bounds, resize the scrollView.
        if (scrollView.__scrollLeft > scrollView.__maxScrollLeft ||
            scrollView.__scrollTop > scrollView.__maxScrollTop) {
          scrollView.resize();
        }
        forceRerender(true);
      }
    };
    function render(forceRerender) {
      if (render.destroyed) return;
      var i;
      var ii;
      var item;
      var dim;
      var scope;
      var scrollValue = view.getScrollValue();
      var scrollValueEnd = scrollValue + view.scrollPrimarySize;

      view.updateRenderRange(scrollValue, scrollValueEnd);

      renderStartIndex = Math.max(0, renderStartIndex - renderBuffer);
      renderEndIndex = Math.min(data.length - 1, renderEndIndex + renderBuffer);

      for (i in itemsShownMap) {
        if (i < renderStartIndex || i > renderEndIndex) {
          item = itemsShownMap[i];
          delete itemsShownMap[i];
          itemsLeaving.push(item);
          item.isShown = false;
        }
      }

      // Render indicies that aren't shown yet
      //
      // NOTE(ajoslin): this may sound crazy, but calling any other functions during this render
      // loop will often push the render time over the edge from less than one frame to over
      // one frame, causing visible jank.
      // DON'T call any other functions inside this loop unless it's vital.
      for (i = renderStartIndex; i <= renderEndIndex; i++) {
        // We only go forward with render if the index is in data, the item isn't already shown,
        // or forceRerender is on.
        if (i >= data.length || (itemsShownMap[i] && !forceRerender)) continue;

        item = itemsShownMap[i] || (itemsShownMap[i] = itemsLeaving.length ? itemsLeaving.pop() :
                                    itemsPool.length ? itemsPool.shift() :
                                    new RepeatItem());
        itemsEntering.push(item);
        item.isShown = true;

        scope = item.scope;
        scope.$index = i;
        scope[keyExpression] = data[i];
        scope.$first = (i === 0);
        scope.$last = (i === (data.length - 1));
        scope.$middle = !(scope.$first || scope.$last);
        scope.$odd = !(scope.$even = (i & 1) === 0);

        if (scope.$$disconnected) ionic.Utils.reconnectScope(item.scope);

        dim = view.getDimensions(i);
        if (item.secondaryPos !== dim.secondaryPos || item.primaryPos !== dim.primaryPos) {
          item.node.style[ionic.CSS.TRANSFORM] = TRANSLATE_TEMPLATE_STR
            .replace(PRIMARY, (item.primaryPos = dim.primaryPos))
            .replace(SECONDARY, (item.secondaryPos = dim.secondaryPos));
        }
        if (item.secondarySize !== dim.secondarySize || item.primarySize !== dim.primarySize) {
          item.node.style.cssText = item.node.style.cssText
            .replace(WIDTH_HEIGHT_REGEX, WIDTH_HEIGHT_TEMPLATE_STR
              //TODO fix item.primarySize + 1 hack
              .replace(PRIMARY, (item.primarySize = dim.primarySize) + 1)
              .replace(SECONDARY, (item.secondarySize = dim.secondarySize))
            );
        }

      }

      // If we reach the end of the list, render the afterItemsNode - this contains all the
      // elements the developer placed after the collection-repeat
      if (renderEndIndex === data.length - 1) {
        dim = view.getDimensions(data.length - 1) || EMPTY_DIMENSION;
        afterItemsNode.style[ionic.CSS.TRANSFORM] = TRANSLATE_TEMPLATE_STR
          .replace(PRIMARY, dim.primaryPos + dim.primarySize)
          .replace(SECONDARY, 0);
      }

      while (itemsLeaving.length) {
        item = itemsLeaving.pop();
        item.scope.$broadcast('$collectionRepeatLeave');
        ionic.Utils.disconnectScope(item.scope);
        itemsPool.push(item);
        item.node.style[ionic.CSS.TRANSFORM] = 'translate3d(-9999px,-9999px,0)';
        item.primaryPos = item.secondaryPos = null;
      }

      if (forceRefreshImages) {
        for (i = 0, ii = itemsEntering.length; i < ii && (item = itemsEntering[i]); i++) {
          if (!item.images) continue;
          for (var j = 0, jj = item.images.length, img; j < jj && (img = item.images[j]); j++) {
            var src = img.src;
            img.src = ONE_PX_TRANSPARENT_IMG_SRC;
            img.src = src;
          }
        }
      }
      if (forceRerender) {
        var rootScopePhase = $rootScope.$$phase;
        while (itemsEntering.length) {
          item = itemsEntering.pop();
          if (!rootScopePhase) item.scope.$digest();
        }
      } else {
        digestEnteringItems();
      }
    }