function isEmitNotificationEnabled(node) {
                return (enabledSyntaxKindFeatures[node.kind] & 2 /* EmitNotifications */) !== 0 || (getEmitFlags(node) & 4 /* AdviseOnEmitNode */) !== 0;
            }