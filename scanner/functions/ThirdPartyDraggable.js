function ThirdPartyDraggable(containerOrSettings, settings) {
            var containerEl = document;
            if (
            // wish we could just test instanceof EventTarget, but doesn't work in IE11
            containerOrSettings === document ||
                containerOrSettings instanceof Element) {
                containerEl = containerOrSettings;
                settings = settings || {};
            }
            else {
                settings = (containerOrSettings || {});
            }
            var dragging = this.dragging = new InferredElementDragging(containerEl);
            if (typeof settings.itemSelector === 'string') {
                dragging.pointer.selector = settings.itemSelector;
            }
            else if (containerEl === document) {
                dragging.pointer.selector = '[data-event]';
            }
            if (typeof settings.mirrorSelector === 'string') {
                dragging.mirrorSelector = settings.mirrorSelector;
            }
            new ExternalElementDragging(dragging, settings.eventData);
        }