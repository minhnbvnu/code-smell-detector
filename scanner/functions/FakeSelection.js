function FakeSelection (win, frame) {
      var doc = win.document;
      var container = Element.fromTag('div');
      add$2(container, resolve('unfocused-selections'));
      append(Element.fromDom(doc.documentElement), container);
      var onTouch = bind$3(container, 'touchstart', function (event) {
        event.prevent();
        resume$1(win, frame);
        clear();
      });
      var make = function (rectangle) {
        var span = Element.fromTag('span');
        add$3(span, [
          resolve('layer-editor'),
          resolve('unfocused-selection')
        ]);
        setAll$1(span, {
          left: rectangle.left() + 'px',
          top: rectangle.top() + 'px',
          width: rectangle.width() + 'px',
          height: rectangle.height() + 'px'
        });
        return span;
      };
      var update = function () {
        clear();
        var rectangles = getRectangles(win);
        var spans = map$1(rectangles, make);
        append$1(container, spans);
      };
      var clear = function () {
        empty(container);
      };
      var destroy = function () {
        onTouch.unbind();
        remove(container);
      };
      var isActive = function () {
        return children(container).length > 0;
      };
      return {
        update: update,
        isActive: isActive,
        destroy: destroy,
        clear: clear
      };
    }