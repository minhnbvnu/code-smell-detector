function createInViewport(container) {
  var watches = createWatches();

  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(watches.checkAll(watchInViewport), 15);

  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watches, container, debouncedCheck);
  }

  // failsafe check, every 200ms we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible
  setInterval(debouncedCheck, 150);

  function isInViewport(elt, offset, cb) {
    if (!cb) {
      return isVisible(elt, offset);
    }

    var remote = createRemote(elt, offset, cb);
    remote.watch();
    return remote;
  }

  function createRemote(elt, offset, cb) {
    function watch() {
      watches.add(elt, offset, cb);
    }

    function dispose() {
      watches.remove(elt);
    }

    return {
      watch: watch,
      dispose: dispose
    };
  }

  function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }

  function isVisible(elt, offset) {
    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    }

    // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js
    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var viewport = {};

    if (container === global.document.body) {
      viewport = {
        top: -offset,
        left: -offset,
        right: global.document.documentElement.clientWidth + offset,
        bottom: global.document.documentElement.clientHeight + offset
      };
    } else {
      var containerRect = container.getBoundingClientRect();
      viewport = {
        top: containerRect.top - offset,
        left: containerRect.left - offset,
        right: containerRect.right + offset,
        bottom: containerRect.bottom + offset
      };
    }

    // The element must overlap with the visible part of the viewport
    var visible =
      (
        eltRect.right >= viewport.left &&
        eltRect.left <= viewport.right &&
        eltRect.bottom >= viewport.top &&
        eltRect.top <= viewport.bottom
      );

    return visible;
  }

  return {
    container: container,
    isInViewport: isInViewport
  };
}