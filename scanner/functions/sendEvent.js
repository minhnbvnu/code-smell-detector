function sendEvent(button, pos) {
            if (self.vt300Mouse) {
                button &= 3;
                pos.x -= 32;
                pos.y -= 32;
                var data_1 = EscapeSequences_1.C0.ESC + '[24';
                if (button === 0)
                    data_1 += '1';
                else if (button === 1)
                    data_1 += '3';
                else if (button === 2)
                    data_1 += '5';
                else if (button === 3)
                    return;
                else
                    data_1 += '0';
                data_1 += '~[' + pos.x + ',' + pos.y + ']\r';
                self.send(data_1);
                return;
            }
            if (self.decLocator) {
                button &= 3;
                pos.x -= 32;
                pos.y -= 32;
                if (button === 0)
                    button = 2;
                else if (button === 1)
                    button = 4;
                else if (button === 2)
                    button = 6;
                else if (button === 3)
                    button = 3;
                self.send(EscapeSequences_1.C0.ESC + '['
                    + button
                    + ';'
                    + (button === 3 ? 4 : 0)
                    + ';'
                    + pos.y
                    + ';'
                    + pos.x
                    + ';'
                    + pos.page || 0
                    + '&w');
                return;
            }
            if (self.urxvtMouse) {
                pos.x -= 32;
                pos.y -= 32;
                pos.x++;
                pos.y++;
                self.send(EscapeSequences_1.C0.ESC + '[' + button + ';' + pos.x + ';' + pos.y + 'M');
                return;
            }
            if (self.sgrMouse) {
                pos.x -= 32;
                pos.y -= 32;
                self.send(EscapeSequences_1.C0.ESC + '[<'
                    + (((button & 3) === 3 ? button & ~3 : button) - 32)
                    + ';'
                    + pos.x
                    + ';'
                    + pos.y
                    + ((button & 3) === 3 ? 'm' : 'M'));
                return;
            }
            var data = [];
            encode(data, button);
            encode(data, pos.x);
            encode(data, pos.y);
            self.send(EscapeSequences_1.C0.ESC + '[M' + String.fromCharCode.apply(String, data));
        }