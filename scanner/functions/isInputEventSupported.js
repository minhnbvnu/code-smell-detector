function isInputEventSupported(eventName) {
                var el = document.createElement('input'),
                eventName = 'on' + eventName,
                isSupported = (eventName in el);
                if (!isSupported) {
                    el.setAttribute(eventName, 'return;');
                    isSupported = typeof el[eventName] == 'function';
                }
                el = null;
                return isSupported;
            }