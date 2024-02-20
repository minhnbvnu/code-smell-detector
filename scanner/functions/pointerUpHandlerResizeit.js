function pointerUpHandlerResizeit(e) {
        jsPanel.pointermove.forEach(function (evt) {
          document.removeEventListener(evt, resizePanel, false);
        });

        if (e.target.classList && e.target.classList.contains('jsPanel-resizeit-handle')) {
          var isLeftChange,
              isTopChange,
              cl = e.target.className;

          if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)) {
            isLeftChange = true;
          }

          if (cl.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)) {
            isTopChange = true;
          } // snap panel to grid (doesn't work that well if inside function resizePanel)


          if (opts.grid && Array.isArray(opts.grid)) {
            if (opts.grid.length === 1) {
              opts.grid[1] = opts.grid[0];
            }

            var cw = parseFloat(self.style.width),
                ch = parseFloat(self.style.height),
                modW = cw % opts.grid[0],
                modH = ch % opts.grid[1],
                cx = parseFloat(self.style.left),
                cy = parseFloat(self.style.top),
                modX = cx % opts.grid[0],
                modY = cy % opts.grid[1];

            if (modW < opts.grid[0] / 2) {
              self.style.width = cw - modW + 'px';
            } else {
              self.style.width = cw + (opts.grid[0] - modW) + 'px';
            }

            if (modH < opts.grid[1] / 2) {
              self.style.height = ch - modH + 'px';
            } else {
              self.style.height = ch + (opts.grid[1] - modH) + 'px';
            }

            if (isLeftChange) {
              if (modX < opts.grid[0] / 2) {
                self.style.left = cx - modX + 'px';
              } else {
                self.style.left = cx + (opts.grid[0] - modX) + 'px';
              }
            }

            if (isTopChange) {
              if (modY < opts.grid[1] / 2) {
                self.style.top = cy - modY + 'px';
              } else {
                self.style.top = cy + (opts.grid[1] - modY) + 'px';
              }
            }
          }
        }

        if (resizestarted) {
          self.content.style.pointerEvents = 'inherit';
          resizestarted = undefined;
          self.saveCurrentDimensions();
          self.saveCurrentPosition();
          self.calcSizeFactors();
          var smallifyBtn = self.controlbar.querySelector('.jsPanel-btn-smallify');
          var elmtRect = self.getBoundingClientRect();

          if (smallifyBtn && elmtRect.height > startHeight + 5) {
            smallifyBtn.style.transform = 'rotate(0deg)';
          }

          document.dispatchEvent(jspanelresizestop);

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
        }

        self.content.style.pointerEvents = 'inherit'; // restore other panel's css pointer-events

        document.querySelectorAll('iframe').forEach(function (frame) {
          frame.style.pointerEvents = 'auto';
        }); // restore option aspectRatio to original configuration

        opts.aspectRatio = cachedOptionAspectRatio;
        document.removeEventListener(e, pointerUpHandlerResizeit);
      }