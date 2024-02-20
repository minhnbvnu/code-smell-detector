function DragHelper (id, settings) {
      var $eventOverlay;
      var doc = settings.document || domGlobals.document;
      var downButton;
      var startX, startY;
      settings = settings || {};
      var handleElement = doc.getElementById(settings.handle || id);
      var start = function (e) {
        var docSize = getDocumentSize(doc);
        var cursor;
        updateWithTouchData(e);
        e.preventDefault();
        downButton = e.button;
        var handleElm = handleElement;
        startX = e.screenX;
        startY = e.screenY;
        if (domGlobals.window.getComputedStyle) {
          cursor = domGlobals.window.getComputedStyle(handleElm, null).getPropertyValue('cursor');
        } else {
          cursor = handleElm.runtimeStyle.cursor;
        }
        $eventOverlay = global$b('<div></div>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: docSize.width,
          height: docSize.height,
          zIndex: 2147483647,
          opacity: 0.0001,
          cursor: cursor
        }).appendTo(doc.body);
        global$b(doc).on('mousemove touchmove', drag).on('mouseup touchend', stop);
        settings.start(e);
      };
      var drag = function (e) {
        updateWithTouchData(e);
        if (e.button !== downButton) {
          return stop(e);
        }
        e.deltaX = e.screenX - startX;
        e.deltaY = e.screenY - startY;
        e.preventDefault();
        settings.drag(e);
      };
      var stop = function (e) {
        updateWithTouchData(e);
        global$b(doc).off('mousemove touchmove', drag).off('mouseup touchend', stop);
        $eventOverlay.remove();
        if (settings.stop) {
          settings.stop(e);
        }
      };
      this.destroy = function () {
        global$b(handleElement).off();
      };
      global$b(handleElement).on('mousedown touchstart', start);
    }