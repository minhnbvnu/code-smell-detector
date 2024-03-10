function pointerUpHandlerDragit(e) {
        jsPanel.pointermove.forEach(function (e) {
          document.removeEventListener(e, dragElmt);
        });
        jsPanel.removeSnapAreas();

        if (dragstarted) {
          self.style.opacity = 1;
          dragstarted = undefined;

          if (opts.snap) {
            switch (self.snappableTo) {
              case 'left-top':
                self.snap(opts.snap.snapLeftTop);
                break;

              case 'center-top':
                self.snap(opts.snap.snapCenterTop);
                break;

              case 'right-top':
                self.snap(opts.snap.snapRightTop);
                break;

              case 'right-center':
                self.snap(opts.snap.snapRightCenter);
                break;

              case 'right-bottom':
                self.snap(opts.snap.snapRightBottom);
                break;

              case 'center-bottom':
                self.snap(opts.snap.snapCenterBottom);
                break;

              case 'left-bottom':
                self.snap(opts.snap.snapLeftBottom);
                break;

              case 'left-center':
                self.snap(opts.snap.snapLeftCenter);
                break;
            }

            if (opts.snap.callback && self.snappableTo && typeof opts.snap.callback === 'function') {
              opts.snap.callback.call(self, self);

              if (opts.snap.repositionOnSnap && opts.snap[camelcase(self.snappableTo)] !== false) {
                self.repositionOnSnap(self.snappableTo);
              }
            }

            if (self.snappableTo && opts.snap.repositionOnSnap && opts.snap[camelcase(self.snappableTo)]) {
              self.repositionOnSnap(self.snappableTo);
            }
          } // opts.drop


          if (self.droppableTo && self.droppableTo) {
            var sourceContainer = self.parentElement;
            self.move(self.droppableTo);

            if (opts.drop.callback) {
              opts.drop.callback.call(self, self, self.droppableTo, sourceContainer);
            }
          }

          document.dispatchEvent(jspaneldragstop);

          if (opts.stop.length) {
            var stopStyles = window.getComputedStyle(self),
                paneldata = {
              left: parseFloat(stopStyles.left),
              top: parseFloat(stopStyles.top),
              width: parseFloat(stopStyles.width),
              height: parseFloat(stopStyles.height)
            };
            jsPanel.processCallbacks(self, opts.stop, false, paneldata, e);
          }

          self.saveCurrentPosition();
          self.calcSizeFactors(); // important for options onwindowresize/onparentresize
        }

        self.controlbar.style.pointerEvents = 'inherit';
        self.content.style.pointerEvents = 'inherit'; // restore other panel's css pointer-events

        document.querySelectorAll('iframe').forEach(function (frame) {
          frame.style.pointerEvents = 'auto';
        });
        document.removeEventListener(e, pointerUpHandlerDragit);
      }