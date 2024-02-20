function getButton(ev) {
            var button;
            var shift;
            var meta;
            var ctrl;
            var mod;
            switch (ev.overrideType || ev.type) {
                case 'mousedown':
                    button = ev.button != null
                        ? +ev.button
                        : ev.which != null
                            ? ev.which - 1
                            : null;
                    if (Browser.isMSIE) {
                        button = button === 1 ? 0 : button === 4 ? 1 : button;
                    }
                    break;
                case 'mouseup':
                    button = 3;
                    break;
                case 'DOMMouseScroll':
                    button = ev.detail < 0
                        ? 64
                        : 65;
                    break;
                case 'wheel':
                    button = ev.wheelDeltaY > 0
                        ? 64
                        : 65;
                    break;
            }
            shift = ev.shiftKey ? 4 : 0;
            meta = ev.metaKey ? 8 : 0;
            ctrl = ev.ctrlKey ? 16 : 0;
            mod = shift | meta | ctrl;
            if (self.vt200Mouse) {
                mod &= ctrl;
            }
            else if (!self.normalMouse) {
                mod = 0;
            }
            button = (32 + (mod << 2)) + button;
            return button;
        }