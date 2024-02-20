function enableEmitNotification(kind) {
                Debug.assert(state < 2 /* Completed */, "Cannot modify the transformation context after transformation has completed.");
                enabledSyntaxKindFeatures[kind] |= 2 /* EmitNotifications */;
            }