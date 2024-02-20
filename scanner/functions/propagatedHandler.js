function propagatedHandler(event) {
        // let only a single hammer instance handle this event
        if (event.type !== 'hammer.input') {
          // it is possible that the same srcEvent is used with multiple hammer events,
          // we keep track on which events are handled in an object _handled
          if (!event.srcEvent._handled) {
            event.srcEvent._handled = {};
          }

          if (event.srcEvent._handled[event.type]) {
            return;
          }
          else {
            event.srcEvent._handled[event.type] = true;
          }
        }

        // attach a stopPropagation function to the event
        var stopped = false;
        event.stopPropagation = function () {
          stopped = true;
        };

        // attach firstTarget property to the event
        event.firstTarget = _firstTarget;

        // propagate over all elements (until stopped)
        var elem = _firstTarget;
        while (elem && !stopped) {
          var _handlers = elem.hammer && elem.hammer._handlers[event.type];
          if (_handlers) {
            for (var i = 0; i < _handlers.length && !stopped; i++) {
              _handlers[i](event);
            }
          }

          elem = elem.parentNode;
        }
      }