function readEmitHelpers() {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the transformation context during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                const helpers = emitHelpers;
                emitHelpers = void 0;
                return helpers;
            }