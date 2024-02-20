function createDragHelper(handle) {
          var startRect;
          return new DragHelper(id, {
            document: containerElm.ownerDocument,
            handle: id + '-' + handle.name,
            start: function () {
              startRect = currentRect;
            },
            drag: function (e) {
              moveRect(handle, startRect, e.deltaX, e.deltaY);
            }
          });
        }