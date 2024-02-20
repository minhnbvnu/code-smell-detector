function createInputInstance(manager) {
            var Type;
            var inputClass = manager.options.inputClass;
            if (inputClass) {
                Type = inputClass;
            }
            else if (SUPPORT_POINTER_EVENTS) {
                Type = PointerEventInput;
            }
            else if (SUPPORT_ONLY_TOUCH) {
                Type = TouchInput;
            }
            else if (!SUPPORT_TOUCH) {
                Type = MouseInput;
            }
            else {
                Type = TouchMouseInput;
            }
            return new (Type)(manager, inputHandler);
        }