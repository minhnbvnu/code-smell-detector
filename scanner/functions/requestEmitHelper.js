function requestEmitHelper(helper) {
                Debug.assert(state > 0 /* Uninitialized */, "Cannot modify the transformation context during initialization.");
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
                if (helper.dependencies) {
                    for (const h of helper.dependencies) {
                        requestEmitHelper(h);
                    }
                }
                emitHelpers = append(emitHelpers, helper);
            }