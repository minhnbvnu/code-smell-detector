function setNonIDBGlobals (prefix = '') {
                shim(prefix + 'DOMException', ShimDOMException);
                shim(prefix + 'DOMStringList', DOMStringList, {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: DOMStringList
                });
                shim(prefix + 'Event', ShimEvent, {
                    configurable: true,
                    writable: true,
                    value: ShimEvent,
                    enumerable: false
                });
                shim(prefix + 'CustomEvent', ShimCustomEvent, {
                    configurable: true,
                    writable: true,
                    value: ShimCustomEvent,
                    enumerable: false
                });
                shim(prefix + 'EventTarget', ShimEventTarget, {
                    configurable: true,
                    writable: true,
                    value: ShimEventTarget,
                    enumerable: false
                });
            }