function sendMove(ev) {
            var button = pressed;
            var pos = self.mouseHelper.getRawByteCoords(ev, self.screenElement, self.charMeasure, self.options.lineHeight, self.cols, self.rows);
            if (!pos)
                return;
            button += 32;
            sendEvent(button, pos);
        }