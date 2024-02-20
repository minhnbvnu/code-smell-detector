function sendButton(ev) {
            var button;
            var pos;
            button = getButton(ev);
            pos = self.mouseHelper.getRawByteCoords(ev, self.screenElement, self.charMeasure, self.options.lineHeight, self.cols, self.rows);
            if (!pos)
                return;
            sendEvent(button, pos);
            switch (ev.overrideType || ev.type) {
                case 'mousedown':
                    pressed = button;
                    break;
                case 'mouseup':
                    pressed = 32;
                    break;
                case 'wheel':
                    break;
            }
        }