function CellSelection (editor, lazyResize, selectionTargets) {
      var onSelection = function (cells, start, finish) {
        selectionTargets.targets().each(function (targets) {
          var tableOpt = table(start);
          tableOpt.each(function (table) {
            var cloneFormats = getCloneElements(editor);
            var generators = cellOperations(noop, Element.fromDom(editor.getDoc()), cloneFormats);
            var otherCells = getOtherCells(table, targets, generators);
            fireTableSelectionChange(editor, cells, start, finish, otherCells);
          });
        });
      };
      var onClear = function () {
        return fireTableSelectionClear(editor);
      };
      var annotations = SelectionAnnotation.byAttr(Ephemera, onSelection, onClear);
      editor.on('init', function (_e) {
        var win = editor.getWin();
        var body = getBody$1(editor);
        var isRoot = getIsRoot(editor);
        var syncSelection = function () {
          var sel = editor.selection;
          var start = Element.fromDom(sel.getStart());
          var end = Element.fromDom(sel.getEnd());
          var shared = sharedOne$1(table, [
            start,
            end
          ]);
          shared.fold(function () {
            return annotations.clear(body);
          }, noop);
        };
        var mouseHandlers = mouse(win, body, isRoot, annotations);
        var keyHandlers = keyboard(win, body, isRoot, annotations);
        var external$1 = external(win, body, isRoot, annotations);
        var hasShiftKey = function (event) {
          return event.raw().shiftKey === true;
        };
        editor.on('TableSelectorChange', function (e) {
          return external$1(e.start, e.finish);
        });
        var handleResponse = function (event, response) {
          if (!hasShiftKey(event)) {
            return;
          }
          if (response.kill()) {
            event.kill();
          }
          response.selection().each(function (ns) {
            var relative = Selection.relative(ns.start(), ns.finish());
            var rng = asLtrRange(win, relative);
            editor.selection.setRng(rng);
          });
        };
        var keyup = function (event) {
          var wrappedEvent = fromRawEvent$1(event);
          if (wrappedEvent.raw().shiftKey && isNavigation(wrappedEvent.raw().which)) {
            var rng = editor.selection.getRng();
            var start = Element.fromDom(rng.startContainer);
            var end = Element.fromDom(rng.endContainer);
            keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
              handleResponse(wrappedEvent, response);
            });
          }
        };
        var keydown = function (event) {
          var wrappedEvent = fromRawEvent$1(event);
          lazyResize().each(function (resize) {
            return resize.hideBars();
          });
          var rng = editor.selection.getRng();
          var startContainer = Element.fromDom(editor.selection.getStart());
          var start = Element.fromDom(rng.startContainer);
          var end = Element.fromDom(rng.endContainer);
          var direction = directionAt(startContainer).isRtl() ? rtl$3 : ltr$3;
          keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
          lazyResize().each(function (resize) {
            return resize.showBars();
          });
        };
        var isLeftMouse = function (raw) {
          return raw.button === 0;
        };
        var isLeftButtonPressed = function (raw) {
          if (raw.buttons === undefined) {
            return true;
          }
          if (global$2.browser.isEdge() && raw.buttons === 0) {
            return true;
          }
          return (raw.buttons & 1) !== 0;
        };
        var mouseDown = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mousedown(fromRawEvent$1(e));
          }
        };
        var mouseOver = function (e) {
          if (isLeftButtonPressed(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseover(fromRawEvent$1(e));
          }
        };
        var mouseUp = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseup(fromRawEvent$1(e));
          }
        };
        var getDoubleTap = function () {
          var lastTarget = Cell(Element.fromDom(body));
          var lastTimeStamp = Cell(0);
          var touchEnd = function (t) {
            var target = Element.fromDom(t.target);
            if (name(target) === 'td' || name(target) === 'th') {
              var lT = lastTarget.get();
              var lTS = lastTimeStamp.get();
              if (eq(lT, target) && t.timeStamp - lTS < 300) {
                t.preventDefault();
                external$1(target, target);
              }
            }
            lastTarget.set(target);
            lastTimeStamp.set(t.timeStamp);
          };
          return { touchEnd: touchEnd };
        };
        var doubleTap = getDoubleTap();
        editor.on('mousedown', mouseDown);
        editor.on('mouseover', mouseOver);
        editor.on('mouseup', mouseUp);
        editor.on('touchend', doubleTap.touchEnd);
        editor.on('keyup', keyup);
        editor.on('keydown', keydown);
        editor.on('NodeChange', syncSelection);
      });
      return { clear: annotations.clear };
    }